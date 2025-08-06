"use client"

import React, { ElementType, useCallback, useRef } from "react"
import { motion, useAnimationFrame } from "motion/react"

import { cn } from "@/lib/utils"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

/**
 * Interface for defining a single font variation axis.
 * Each axis represents a dimension of variation in a variable font. You should check the font variation settings of the font you are using to see the available axes.
 */
interface FontVariationAxis {
  /**
   * The name of the font variation axis (e.g., "wght" for weight, "slnt" for slant).
   * This corresponds to the OpenType variation axis tags, but can be arbitrary. Make sure to check the font variation settings of the font you are using to see the available axes.
   */
  name: string

  /**
   * The minimum value for this axis.
   * Applied when the cursor is at the left edge (for x-axis) or top edge (for y-axis).
   */
  min: number

  /**
   * The maximum value for this axis.
   * Applied when the cursor is at the right edge (for x-axis) or bottom edge (for y-axis).
   */
  max: number
}

/**
 * Interface for mapping cursor position to font variation settings.
 * Allows independent control of two font variation axes based on cursor movement.
 */
interface FontVariationMapping {
  /**
   * Font variation axis controlled by horizontal cursor movement.
   */
  x: FontVariationAxis

  /**
   * Font variation axis controlled by vertical cursor movement.
   */
  y: FontVariationAxis
}

/**
 * Props for the VariableFontAndCursor component.
 */
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The text content to display and animate.
   * Required prop with no default value.
   */
  children: React.ReactNode

  /**
   * HTML Tag to render the component as.
   * @default "span"
   */
  as?: ElementType

  /**
   * Mapping configuration that defines how cursor position affects font variation settings.
   * Maps x and y cursor positions to specific font variation axes and value ranges.
   * Required prop with no default value.
   */
  fontVariationMapping: FontVariationMapping

  /**
   * Reference to the container element for mouse tracking.
   * The cursor position will be calculated relative to this container's bounds.
   * Required prop with no default value.
   */
  containerRef: React.RefObject<HTMLDivElement>
}

const VariableFontAndCursor = ({
  children,
  as = "span",
  fontVariationMapping,
  className,
  containerRef,
  ...props
}: TextProps) => {
  // Hook to track mouse position relative to the specified container
  const mousePositionRef = useMousePositionRef(containerRef)

  // Ref for the visible text span to apply font variation settings
  const spanRef = useRef<HTMLSpanElement>(null)

  /**
   * Calculates font variation settings based on cursor position within the container.
   *
   * This function maps the cursor's x and y coordinates to font variation values
   * by interpolating between the minimum and maximum values defined in the mapping.
   * The position is normalized to a 0-1 range based on the container dimensions.
   *
   * @param xPosition - Horizontal cursor position relative to container
   * @param yPosition - Vertical cursor position relative to container
   * @returns CSS font-variation-settings string with calculated values
   */
  const interpolateFontVariationSettings = useCallback(
    (xPosition: number, yPosition: number) => {
      const container = containerRef.current
      if (!container) return "0 0" // Return default values if container is null

      // Get container dimensions for normalization
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      // Normalize cursor position to 0-1 range, clamped to container bounds
      const xProgress = Math.min(Math.max(xPosition / containerWidth, 0), 1)
      const yProgress = Math.min(Math.max(yPosition / containerHeight, 0), 1)

      // Interpolate between min and max values for each axis
      const xValue =
        fontVariationMapping.x.min +
        (fontVariationMapping.x.max - fontVariationMapping.x.min) * xProgress
      const yValue =
        fontVariationMapping.y.min +
        (fontVariationMapping.y.max - fontVariationMapping.y.min) * yProgress

      // Return CSS font-variation-settings string
      return `'${fontVariationMapping.x.name}' ${xValue}, '${fontVariationMapping.y.name}' ${yValue}`
    },
    [fontVariationMapping, containerRef]
  )

  // Use animation frame to smoothly update font variations on every frame
  // This ensures smooth transitions as the cursor moves
  useAnimationFrame(() => {
    const settings = interpolateFontVariationSettings(
      mousePositionRef.current.x,
      mousePositionRef.current.y
    )
    if (spanRef.current) {
      spanRef.current.style.fontVariationSettings = settings
    }
  })

  // Custom motion component to render as the specified HTML tag
  const MotionComponent = motion.create(as)

  return (
    <MotionComponent
      className={cn(className)}
      data-text={children}
      ref={spanRef}
      {...props}
    >
      <span className="inline-block">{children}</span>
    </MotionComponent>
  )
}

export default VariableFontAndCursor
