"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, Transition, useAnimationControls, useMotionValue, useAnimationFrame, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

// handy function to split text into characters with support for unicode and emojis
const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
    return Array.from(segmenter.segment(text), ({ segment }) => segment)
  }
  // Fallback for browsers that don't support Intl.Segmenter
  return Array.from(text)
}

interface Letter3DSwapProps {
  /**
   * Text to display and animate
   */
  text: string

  /**
   * Class name for the main container element.
   */
  mainClassName?: string

  /**
   * Class name for the front face element.
   */
  frontFaceClassName?: string

  /**
   * Class name for the secondary face element.
   */
  secondFaceClassName?: string

  /**
   * Duration of stagger delay between elements in seconds.
   * @default 0.05
   */
  staggerDuration?: number

  /**
   * Direction to stagger animations from.
   * @default "first"
   */
  staggerFrom?: "first" | "last" | "center" | number | "random"

  /**
   * Animation transition configuration.
   * @default { type: "spring", damping: 25, stiffness: 300 }
   */
  transition?: Transition

  /**
   * Fixed width for each character box (optional)
   */
  charWidth?: number

  /**
   * Fixed height for each character box (optional)
   */
  charHeight?: number

  /**
   * Direction of rotation
   * @default "right"
   */
  rotateDirection?: "top" | "right" | "bottom" | "left"

  /**
   * Container ref for mouse position calculations
   */
  containerRef: React.RefObject<HTMLDivElement>
}

interface CharBoxProps {
  char: string
  frontFaceClassName?: string
  secondFaceClassName?: string
  rotateDirection: "top" | "right" | "bottom" | "left"
  transition: Transition
  containerRef: React.RefObject<HTMLDivElement>
}

const CharBox = ({
  char,
  frontFaceClassName,
  secondFaceClassName,
  rotateDirection,
  transition,
  containerRef,
}: CharBoxProps) => {
  const control = useAnimationControls()
  const boxRef = useRef<HTMLSpanElement>(null)
  const mousePosition = useMousePositionRef(containerRef)
  const lastAnimationTime = useRef(0)
  const proximity = useMotionValue(0)

  // Calculate proximity effect
  useAnimationFrame(() => {
    if (!boxRef.current || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const rect = boxRef.current.getBoundingClientRect()
    const letterCenterX = rect.left + rect.width / 2 - containerRect.left
    const letterCenterY = rect.top + rect.height / 2 - containerRect.top

    const distance = Math.sqrt(
      Math.pow(mousePosition.current.x - letterCenterX, 2) +
      Math.pow(mousePosition.current.y - letterCenterY, 2)
    )

    const radius = 100 // Maximum distance for the effect
    const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1)
    proximity.set(normalizedDistance)

    // Trigger animation when proximity is high enough
    const now = Date.now()
    const timeSinceLastAnimation = now - lastAnimationTime.current
    const minTimeBetweenAnimations = 1000 // 1 second minimum between animations

    if (normalizedDistance > 0.3 && timeSinceLastAnimation > minTimeBetweenAnimations) {
      lastAnimationTime.current = now
      control.start({
        transform: rotationTransform,
        transition: {
          ...transition,
        },
      }).then(() => {
        control.set({ transform: "rotateX(0deg) rotateY(0deg)" })
      })
    }
  })

  // Determine rotation transform based on direction
  const rotationTransform = useMemo(() => {
    switch (rotateDirection) {
      case "top":
        return "rotateX(90deg)"
      case "right":
        return "rotateY(90deg)"
      case "bottom":
        return "rotateX(-90deg)"
      case "left":
        return "rotateY(90deg)"
      default:
        return "rotateY(-90deg)"
    }
  }, [rotateDirection])

  // Get the transform for the second face based on rotation direction
  const getSecondFaceTransform = useCallback(() => {
    switch (rotateDirection) {
      case "top":
        return `rotateX(-90deg) translateZ(0.5lh)`
      case "right":
        return `rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)`
      case "bottom":
        return `rotateX(90deg) translateZ(0.5lh)`
      case "left":
        return `rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)`
      default:
        return `rotateY(90deg) translateZ(1ch)`
    }
  }, [rotateDirection])

  // We need to explicitly handle spaces because the 3D transform effects
  // can sometimes collapse whitespace, even with whitespace-pre.
  // Using &nbsp; ensures the space is always rendered as a visible character
  if (char === " ") {
    return <span>&nbsp;</span>
  }

  const secondFaceTransform = getSecondFaceTransform()

  return (
    <motion.span
      ref={boxRef}
      className="inline-flex [transform-style:preserve-3d] whitespace-pre cursor-pointer"
      animate={control}
      initial={{ transform: "rotateX(0deg) rotateY(0deg)" }}
      style={{
        scale: useTransform(proximity, [0, 1], [1, 1.1]),
        rotateZ: useTransform(proximity, [0, 1], [0, 15]),
      }}
    >
      {/* Front face */}
      <div
        className={cn(
          "relative flex items-center justify-center backface-hidden h-[1lh]",
          frontFaceClassName
        )}
        style={{
          transform: `${rotateDirection === "top" || rotateDirection === "bottom" ? "translateZ(0.5lh)" : rotateDirection === "left" ? "rotateY(90deg) translateX(50%) rotateY(-90deg)" : "rotateY(-90deg) translateX(50%) rotateY(90deg)"}`,
        }}
      >
        {char}
      </div>

      {/* Second face - positioned based on rotation direction */}
      <div
        className={cn(
          "absolute flex items-center justify-center backface-hidden h-[1lh] w-full top-0 left-0",
          secondFaceClassName
        )}
        style={{
          transform: secondFaceTransform,
        }}
      >
        {char}
      </div>
    </motion.span>
  )
}

const Letter3DSwapLocal = ({
  text,
  mainClassName,
  frontFaceClassName,
  secondFaceClassName,
  staggerDuration = 0.05,
  staggerFrom = "first",
  transition = { type: "spring", damping: 30, stiffness: 300 },
  charWidth,
  charHeight,
  rotateDirection = "right",
  containerRef,
  ...props
}: Letter3DSwapProps) => {
  // Split text into characters
  const characters = useMemo(() => {
    return splitIntoCharacters(text)
  }, [text])

  return (
    <>
      {/* Visible component */}
      <div
        className={cn(
          "flex flex-wrap relative",
          mainClassName
        )}
        {...props}
      >
        <span className="sr-only">{text}</span>

        {characters.map((char, index) => (
          <span key={index} className="whitespace-pre">
            <CharBox
              char={char}
              frontFaceClassName={frontFaceClassName}
              secondFaceClassName={secondFaceClassName}
              rotateDirection={rotateDirection}
              transition={transition}
              containerRef={containerRef}
            />
          </span>
        ))}
      </div>
    </>
  )
}

Letter3DSwapLocal.displayName = "Letter3DSwapLocal"

export default Letter3DSwapLocal
