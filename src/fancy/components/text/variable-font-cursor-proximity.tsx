"use client"

import React, { ElementType, forwardRef, useMemo, useRef } from "react"
import { motion, useAnimationFrame } from "motion/react"

import { cn } from "@/lib/utils"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

/**
 * Props for the VariableFontCursorProximity component.
 */
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The text content to display and animate.
   * Each letter will respond individually to cursor proximity.
   * Required prop with no default value.
   */
  children: React.ReactNode

  /**
   * HTML Tag to render the component as.
   * @default "span"
   */
  as?: ElementType

  /**
   * Default font variation settings applied when cursor is outside the radius.
   * Should be a CSS font-variation-settings string (e.g., "'wght' 400, 'slnt' 0").
   * You should check the font variation settings of the font you are using to see the available axes.
   * Required prop with no default value.
   */
  fromFontVariationSettings: string

  /**
   * Target font variation settings applied when cursor is at the center of a letter.
   * Should be a CSS font-variation-settings string (e.g., "'wght' 900, 'slnt' 15").
   * Make sure to check the font variation settings of the font you are using to see the available axes.
   * Required prop with no default value.
   */
  toFontVariationSettings: string

  /**
   * Reference to the container element for mouse tracking.
   * The cursor position will be calculated relative to this container's bounds.
   * Required prop with no default value.
   */
  containerRef: React.RefObject<HTMLDivElement>

  /**
   * The radius in pixels within which letters respond to cursor proximity.
   * Letters outside this radius will use the default font variation settings.
   * @default 50
   */
  radius?: number

  /**
   * The falloff function that determines how the effect diminishes with distance.
   * - "linear": Linear interpolation (straight line falloff)
   * - "exponential": Quadratic falloff (more dramatic near cursor)
   * - "gaussian": Bell curve falloff (smooth, natural feeling)
   * @default "linear"
   */
  falloff?: "linear" | "exponential" | "gaussian"
}

const VariableFontCursorProximity = forwardRef<HTMLElement, TextProps>(
  (
    {
      children,
      as = "span",
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      ...props
    },
    ref
  ) => {
    // Refs to store references to each individual letter element
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([])

    // Cache for interpolated font settings to avoid recalculation
    const interpolatedSettingsRef = useRef<string[]>([])

    // Hook to track mouse position relative to the specified container
    const mousePositionRef = useMousePositionRef(containerRef)

    /**
     * Parse and prepare font variation settings for interpolation.
     *
     * Converts CSS font-variation-settings strings into structured data that can be
     * efficiently interpolated. Each axis is parsed with its from/to values for
     * smooth transitions during proximity-based animation.
     *
     * Expected format: "'wght' 400, 'slnt' 0" -> Map of axis names to values
     */
    const parsedSettings = useMemo(() => {
      // Parse the 'from' font variation settings string
      const fromSettings = new Map(
        fromFontVariationSettings
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(" ")
            return [name.replace(/['"]/g, ""), parseFloat(value)]
          })
      )

      // Parse the 'to' font variation settings string
      const toSettings = new Map(
        toFontVariationSettings
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(" ")
            return [name.replace(/['"]/g, ""), parseFloat(value)]
          })
      )

      // Create structured data for each axis with from/to values
      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }))
    }, [fromFontVariationSettings, toFontVariationSettings])

    /**
     * Calculate Euclidean distance between two points.
     *
     * Used to determine the distance between the cursor position and each letter's center.
     * This distance is then used to calculate the proximity effect strength.
     *
     * @param x1 - X coordinate of first point (cursor)
     * @param y1 - Y coordinate of first point (cursor)
     * @param x2 - X coordinate of second point (letter center)
     * @param y2 - Y coordinate of second point (letter center)
     * @returns Distance in pixels between the two points
     */
    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    /**
     * Calculate the falloff value based on distance and selected falloff type.
     *
     * This function determines how strongly the proximity effect affects each letter
     * based on its distance from the cursor. Different falloff types create different
     * visual effects and feelings of interaction.
     *
     * @param distance - Distance in pixels from cursor to letter center
     * @returns Falloff value between 0 (no effect) and 1 (full effect)
     */
    const calculateFalloff = (distance: number): number => {
      // Normalize distance to 0-1 range within the radius
      const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1)

      switch (falloff) {
        case "exponential":
          // Quadratic falloff - more dramatic effect near cursor
          return Math.pow(normalizedDistance, 2)
        case "gaussian":
          // Bell curve falloff - smooth, natural feeling
          return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2)
        case "linear":
        default:
          // Linear falloff - consistent rate of change
          return normalizedDistance
      }
    }

    // Use animation frame to smoothly update font variations for all letters
    // This ensures smooth transitions as the cursor moves across the text
    useAnimationFrame(() => {
      if (!containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()

      // Process each letter individually for proximity-based animation
      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return

        // Calculate letter's center position relative to container
        const rect = letterRef.getBoundingClientRect()
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top

        // Calculate distance from cursor to this letter's center
        const distance = calculateDistance(
          mousePositionRef.current.x,
          mousePositionRef.current.y,
          letterCenterX,
          letterCenterY
        )

        // If letter is outside the effect radius, reset to default settings
        if (distance >= radius) {
          if (
            letterRef.style.fontVariationSettings !== fromFontVariationSettings
          ) {
            letterRef.style.fontVariationSettings = fromFontVariationSettings
          }
          return
        }

        // Calculate falloff strength based on distance and falloff type
        const falloffValue = calculateFalloff(distance)

        // Interpolate between from and to settings for each axis
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue =
              fromValue + (toValue - fromValue) * falloffValue
            return `'${axis}' ${interpolatedValue}`
          })
          .join(", ")

        // Cache and apply the interpolated settings
        interpolatedSettingsRef.current[index] = newSettings
        letterRef.style.fontVariationSettings = newSettings
      })
    })

    // Split text into words and track letter indices across all words
    const words = String(children).split(" ")
    let letterIndex = 0
    const ElementTag = as

    return (
      <ElementTag
        ref={ref}
        className={cn(
          className,
        )}
        {...props}
        data-text={children}
      >
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className="inline-block whitespace-nowrap"
            aria-hidden
          >
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++
              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={(el: HTMLSpanElement | null) => {
                    letterRefs.current[currentLetterIndex] = el
                  }}
                  className="inline-block"
                  aria-hidden="true"
                  style={{
                    fontVariationSettings:
                      interpolatedSettingsRef.current[currentLetterIndex],
                  }}
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
        <span className="sr-only">{children}</span>
      </ElementTag>
    )
  }
)

VariableFontCursorProximity.displayName = "VariableFontCursorProximity"
export default VariableFontCursorProximity
