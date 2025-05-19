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

/**
 * Internal interface for representing words when splitting text by characters.
 * Used to maintain proper word spacing and line breaks while allowing
 * character-by-character animation. This prevents words from breaking
 * across lines during animation.
 */
interface WordObject {
  /**
   * Array of individual characters in the word.
   * Uses Intl.Segmenter when available for proper Unicode handling.
   */
  characters: string[]

  /**
   * Whether this word needs a space after it.
   * True for all words except the last one in a sequence.
   */
  needsSpace: boolean
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

  // Splitting the text into animation segments
  const characters = useMemo(() => {
    const t = text.split(" ")
    const result = t.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== t.length - 1,
    }))
    return result
  }, [text])

  // Helper function to calculate stagger delay for each text segment
  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      const total = totalChars
      if (staggerFrom === "first") return index * staggerDuration
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2)
        return Math.abs(center - index) * staggerDuration
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total)
        return Math.abs(randomIndex - index) * staggerDuration
      }
      return Math.abs(staggerFrom - index) * staggerDuration
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



  return (
    <>
      {/* Visible component */}
      <div
        className={cn("inline-flex relative cursor-pointer whitespace-pre-wrap", mainClassName)}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        {...props}
      >
        <span className="sr-only">{text}</span>

        {characters.map((wordObj, wordIndex, array) => {
          const previousCharsCount = array
            .slice(0, wordIndex)
            .reduce((sum, word) => sum + word.characters.length, 0)

          return (
            <span key={wordIndex} className="inline-flex">
              {wordObj.characters.map((char, charIndex) => {
                const totalIndex = previousCharsCount + charIndex
                const control = controlsMapRef.current.get(totalIndex)
                if (!control) return null
                
                return (
                  <CharBox
                    key={totalIndex}
                    char={char}
                    control={control}
                    frontFaceClassName={frontFaceClassName}
                    secondFaceClassName={secondFaceClassName}
                    rotateDirection={rotateDirection}
                  />
                )
              })}
              {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
            </span>
          )
        })}
      </div>
    </>
  )
}

interface CharBoxProps {
  char: string
  control: ReturnType<typeof useAnimationControls>
  frontFaceClassName?: string
  secondFaceClassName?: string
  rotateDirection: "top" | "right" | "bottom" | "left"
}

const CharBox = ({
  char,
  control,
  frontFaceClassName,
  secondFaceClassName,
  rotateDirection,
}: CharBoxProps) => {
  // Get the transform for the second face based on rotation direction
  const getSecondFaceTransform = () => {
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
  }

  const secondFaceTransform = getSecondFaceTransform()

  return (
    <motion.span
      className="inline-box [transform-style:preserve-3d]"
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
}


Letter3DSwap.displayName = "Letter3DSwap"

export default Letter3DSwap
