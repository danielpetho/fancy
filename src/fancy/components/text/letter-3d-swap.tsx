"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
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
   * X Padding to add around the text content for the box (in pixels)
   * @default 10
   */
  paddingX?: number

  /**
   * Y Padding to add around the text content for the box (in pixels)
   * @default 10
   */
  paddingY?: number

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
  paddingX = 0,
  paddingY = 10,
  staggerDuration = 0.05,
  staggerFrom = "first",
  transition = { type: "spring", damping: 30, stiffness: 300 },
  charWidth,
  charHeight,
  rotateDirection = "right",
  ...props
}: Letter3DSwapProps) => {
  const [charDimensions, setCharDimensions] = useState<{[key: string]: {width: number, height: number}}>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [originalTextDisplay, setOriginalTextDisplay] = useState<{ width: number, letterPositions: { left: number, width: number }[] }>({ width: 0, letterPositions: [] })
  const measureRef = useRef<HTMLDivElement>(null)
  const textDisplayRef = useRef<HTMLDivElement>(null)
  const charRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  
  // Store animation controls in a ref so they persist across renders
  const controlsMapRef = useRef<Map<number, ReturnType<typeof useAnimationControls>>>(new Map())
  
  // Pre-create a set of animation controls for maximum expected characters
  const MAX_CHARS = 100 // Maximum number of possible characters
  const controlsArray = Array(MAX_CHARS).fill(0).map(() => useAnimationControls())
  
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
        return "rotateX(90deg)";
      case "right":
        return "rotateY(-90deg)";
      case "bottom":
        return "rotateX(-90deg)";
      case "left":
        return "rotateY(90deg)";
      default:
        return "rotateY(-90deg)";
    }
  }, [rotateDirection]);

  // Measure original text display to maintain natural letter spacing
  useEffect(() => {
    if (!textDisplayRef.current) return
    
    const textElement = textDisplayRef.current
    const textRect = textElement.getBoundingClientRect()
    const letterElements = textElement.querySelectorAll('.measure-letter')
    
    const positions: { left: number, width: number }[] = []
    
    letterElements.forEach((letter) => {
      const letterRect = letter.getBoundingClientRect()
      positions.push({
        left: letterRect.left - textRect.left,
        width: letterRect.width
      })
    })
    
    setOriginalTextDisplay({
      width: textRect.width,
      letterPositions: positions
    })
  }, [text])

  // Measure character dimensions
  useEffect(() => {
    if (!measureRef.current) return

    // Get all unique characters from text
    const allChars = new Set<string>(splitIntoCharacters(text))

    // Measure each character
    const measurements: {[key: string]: {width: number, height: number}} = {}
    
    allChars.forEach(char => {
      const charRef = charRefs.current.get(char)
      if (charRef) {
        const rect = charRef.getBoundingClientRect()
        measurements[char] = {
          width: charWidth || Math.max(rect.width, 0),
          height: charHeight || Math.max(rect.height, 80)
        }
      } else {
        // Default fallback if measurement fails
        measurements[char] = {
          width: charWidth || 0,
          height: charHeight || 0
        }
      }
    })

    setCharDimensions(measurements)
  }, [text, paddingX, paddingY, charWidth, charHeight])

  // Helper function to calculate stagger delay
  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      if (staggerFrom === "first") return index * staggerDuration
      if (staggerFrom === "last") return (totalChars - 1 - index) * staggerDuration
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
            delay: getStaggerDelay(i, totalChars)
          }
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
  }, [isAnimating, isHovering, characters, transition, getStaggerDelay, rotationTransform])

  // Handle hover end
  const handleHoverEnd = useCallback(() => {
    setIsHovering(false)
  }, [])

  // Get the transform for the second face based on rotation direction
  const getSecondFaceTransform = useCallback((boxWidth: number, boxHeight: number) => {
    switch (rotateDirection) {
      case "top":
        return `rotateX(-90deg) translateZ(${boxHeight / 2}px)`;
      case "right":
        return `rotateY(90deg) translateZ(${boxWidth / 2}px)`;
      case "bottom":
        return `rotateX(90deg) translateZ(${boxHeight / 2}px)`;
      case "left":
        return `rotateY(-90deg) translateZ(${boxWidth / 2}px)`;
      default:
        return `rotateY(90deg) translateZ(${boxWidth / 2}px)`;
    }
  }, [rotateDirection]);

  // Render character box
  const renderCharBox = useCallback((char: string, index: number) => {
    const control = controlsMapRef.current.get(index)
    
    if (!control) return null
    
    // Get position information for natural spacing
    const letterPosition = originalTextDisplay.letterPositions[index]
    if (!letterPosition) return null
    
    // Use the letter position width directly from our text measurement
    // This ensures each box has the exact natural width
    const boxWidth = letterPosition.width
    
    // Get actual character dimensions for the 3D face
    const charDimension = charDimensions[char] || { width: 0, height: 0 }
    
    // Calculate face dimensions with padding
    const faceWidth = Math.max(boxWidth, charDimension.width) + paddingX * 2
    const faceHeight = charDimension.height
    
    // Get the transform for the second face
    const secondFaceTransform = getSecondFaceTransform(boxWidth, faceHeight);
    
    return (
      <motion.span
        className="inline-block relative [perspective:1000px]"
        style={{ 
          position: 'absolute',
          left: letterPosition.left,
          width: boxWidth,
          //height: faceHeight,
        }}
      >
        <motion.div
          className="w-full h-full [transform-style:preserve-3d]"
          animate={control}
          initial={{ transform: "rotateX(0deg) rotateY(0deg)" }}
        >
          {/* Front face */}
          <div
            className={cn(
              "absolute flex items-center justify-center backface-hidden",
              frontFaceClassName
            )}
            style={{
              transform: `translateZ(${rotateDirection === "top" || rotateDirection === "bottom" ? faceHeight / 2 : boxWidth / 2}px)`,
              width: faceWidth,
              height: faceHeight,
              // Center the face on the rotation axis
              left: `calc(50% - ${faceWidth / 2}px)`,
              top: `calc(50% - ${faceHeight / 2}px)`,
            }}
          >
            {char}
          </div>
          
          {/* Second face - positioned based on rotation direction */}
          <div
            className={cn(
              "absolute flex items-center justify-center backface-hidden",
              secondFaceClassName
            )}
            style={{
              transform: secondFaceTransform,
              width: faceWidth,
              height: faceHeight,
              // Center the face on the rotation axis
              left: `calc(50% - ${faceWidth / 2}px)`,
              top: `calc(50% - ${faceHeight / 2}px)`,
            }}
          >
            {char}
          </div>
        </motion.div>
      </motion.span>
    )
  }, [charDimensions, frontFaceClassName, secondFaceClassName, paddingX, paddingY, originalTextDisplay, getSecondFaceTransform, rotateDirection])

  return (
    <>
      {/* Hidden div for measuring natural letter positions */}
      <div 
        ref={textDisplayRef} 
        className={cn("absolute whitespace-pre opacity-0 pointer-events-none", mainClassName)}
        aria-hidden="true"
      >
        {characters.map((char, i) => (
          <span key={i} className="measure-letter inline-block">{char}</span>
        ))}
      </div>
      
      {/* Hidden div for character measurements */}
      <div className="absolute opacity-0 pointer-events-none" ref={measureRef} aria-hidden="true">
        {Array.from(new Set(characters)).map((char) => (
          <span 
            key={char}
            ref={el => {
              if (el) charRefs.current.set(char, el as HTMLDivElement)
            }}
          >
            {char}
          </span>
        ))}
      </div>
      
      {/* Visible component */}
      <div 
        className={cn(
          "inline-flex flex-wrap relative", 
          mainClassName
        )} 
        style={{ 
          width: originalTextDisplay.width, 
          height: 'auto',
          cursor: 'pointer',
          position: 'relative'
        }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        {...props}
      >
        <span className="sr-only">{text}</span>
        
        {characters.map((char, index) => (
          <span key={index}>
            {renderCharBox(char, index)}
          </span>
        ))}
      </div>
    </>
  )
}

Letter3DSwap.displayName = "Letter3DSwap"

export default Letter3DSwap