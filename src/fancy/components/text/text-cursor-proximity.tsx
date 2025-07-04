"use client"

import React, { CSSProperties, ElementType, forwardRef, useRef, useMemo } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react"

import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"
import { cn } from "@/lib/utils"

// Helper type that makes all properties of CSSProperties accept number | string
type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: string | number
}

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T]
  to: CSSPropertiesWithValues[T]
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The content to be displayed and animated
   */
  children: React.ReactNode

  /**
   * HTML Tag to render the component as
   * @default span
   */
  as?: ElementType

  /**
   * Object containing style properties to animate
   * Each property should have 'from' and 'to' values
   */
  styles: Partial<{
    [K in keyof CSSPropertiesWithValues]: StyleValue<K>
  }>

  /**
   * Reference to the container element for mouse position calculations
   */
  containerRef: React.RefObject<HTMLDivElement>

  /**
   * Radius of the proximity effect in pixels
   * @default 50
   */
  radius?: number

  /**
   * Type of falloff function to use for the proximity effect
   * @default "linear"
   */
  falloff?: "linear" | "exponential" | "gaussian"
}

const TextCursorProximity = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      children,
      as,
      styles,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      ...props
    },
    ref
  ) => {
    const MotionComponent = useMemo(() => motion.create(as ?? "span"), [as])
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
    const mousePositionRef = useMousePositionRef(containerRef)

    // Convert children to string for letter processing
    const text = React.Children.toArray(children).join("")

    // Create a motion value for each letter's proximity
    const letterProximities = useRef(
      Array(text.replace(/\s/g, "").length)
        .fill(0)
        .map(() => useMotionValue(0))
    )

    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    const calculateFalloff = (distance: number): number => {
      const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1)

      switch (falloff) {
        case "exponential":
          return Math.pow(normalizedDistance, 2)
        case "gaussian":
          return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2)
        case "linear":
        default:
          return normalizedDistance
      }
    }

    useAnimationFrame(() => {
      if (!containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return

        const rect = letterRef.getBoundingClientRect()
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top

        const distance = calculateDistance(
          mousePositionRef.current.x,
          mousePositionRef.current.y,
          letterCenterX,
          letterCenterY
        )

        const proximity = calculateFalloff(distance)
        letterProximities.current[index].set(proximity)
      })
    })

    const words = text.split(" ")
    let letterIndex = 0

    return (
      <MotionComponent
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className="inline-block"
            aria-hidden={true}
          >
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++
              const proximity = letterProximities.current[currentLetterIndex]

              // Create transformed values for each style property
              const transformedStyles = Object.entries(styles).reduce(
                (acc, [key, value]) => {
                  acc[key] = useTransform(
                    proximity,
                    [0, 1],
                    [value.from, value.to]
                  )
                  return acc
                },
                {} as Record<string, any>
              )

              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={(el: HTMLSpanElement | null) => {
                    letterRefs.current[currentLetterIndex] = el
                  }}
                  className="inline-block"
                  aria-hidden="true"
                  style={transformedStyles}
                >
                  {letter}
                </motion.span>
              )
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{text}</span>
      </MotionComponent>
    )
  }
)

TextCursorProximity.displayName = "TextCursorProximity"
export default TextCursorProximity
