"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, Transition, useAnimationControls } from "motion/react"

import { cn } from "@/lib/utils"

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
}

const Letter3DSwap = ({
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
  ...props
}: Letter3DSwapProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Store animation controls in a ref so they persist across renders
  const controlsMapRef = useRef<
    Map<number, ReturnType<typeof useAnimationControls>>
  >(new Map())

  // Pre-create a set of animation controls for maximum expected characters
  const MAX_CHARS = 100 // Maximum number of possible characters
  const controlsArray = Array(MAX_CHARS)
    .fill(0)
    .map(() => useAnimationControls())

  // Initialize the controlsMapRef with the pre-created controls
  useEffect(() => {
    for (let i = 0; i < MAX_CHARS; i++) {
      controlsMapRef.current.set(i, controlsArray[i])
    }
  }, [controlsArray])

  // Split text into characters
  const characters = useMemo(() => {
    return splitIntoCharacters(text)
  }, [text])

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

  // Helper function to calculate stagger delay
  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      if (staggerFrom === "first") return index * staggerDuration
      if (staggerFrom === "last")
        return (totalChars - 1 - index) * staggerDuration
      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2)
        return Math.abs(center - index) * staggerDuration
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * totalChars)
        return Math.abs(randomIndex - index) * staggerDuration
      }
      return Math.abs((staggerFrom as number) - index) * staggerDuration
    },
    [staggerFrom, staggerDuration]
  )

  // Handle hover start - trigger the rotation
  const handleHoverStart = useCallback(async () => {
    if (isAnimating || isHovering) return

    setIsHovering(true)
    setIsAnimating(true)

    const totalChars = characters.length
    const promises: Promise<any>[] = []

    // Animate rotation of each character box with staggered delay
    for (let i = 0; i < totalChars; i++) {
      const control = controlsMapRef.current.get(i)
      if (control) {
        const animationPromise = control.start({
          transform: rotationTransform,
          transition: {
            ...transition,
            delay: getStaggerDelay(i, totalChars),
          },
        })
        promises.push(animationPromise)
      }
    }

    // Wait for all animations to complete
    await Promise.all(promises)

    // Reset all boxes
    for (let i = 0; i < totalChars; i++) {
      const control = controlsMapRef.current.get(i)
      if (control) {
        control.set({ transform: "rotateX(0deg) rotateY(0deg)" })
      }
    }

    setIsAnimating(false)
  }, [
    isAnimating,
    isHovering,
    characters,
    transition,
    getStaggerDelay,
    rotationTransform,
  ])

  // Handle hover end
  const handleHoverEnd = useCallback(() => {
    setIsHovering(false)
  }, [])

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

  // Render character box
  const renderCharBox = useCallback(
    (char: string, index: number) => {
      const control = controlsMapRef.current.get(index)

      // We need to explicitly handle spaces because the 3D transform effects
      // can sometimes collapse whitespace, even with whitespace-pre.
      // Using &nbsp; ensures the space is always rendered as a visible character
      if (char === " ") {
        return <span>&nbsp;</span>
      }

      //if (!control) return null

      // Get the transform for the second face
      const secondFaceTransform = getSecondFaceTransform()

      return (
        <motion.span
          className="inline-flex [transform-style:preserve-3d] whitespace-pre"
          animate={control}
          initial={{ transform: "rotateX(0deg) rotateY(0deg)" }}
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
    },
    [
      frontFaceClassName,
      secondFaceClassName,
      getSecondFaceTransform,
      rotateDirection,
    ]
  )

  return (
    <>
      {/* Visible component */}
      <div
        className={cn(
          "inline-flex relative cursor-pointer",
          mainClassName
        )}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        {...props}
      >
        <span className="sr-only">{text}</span>

        {characters.map((char, index) => (
          <span key={index} className="whitespace-pre">{renderCharBox(char, index)}</span>
        ))}
      </div>
    </>
  )
}

Letter3DSwap.displayName = "Letter3DSwap"

export default Letter3DSwap
