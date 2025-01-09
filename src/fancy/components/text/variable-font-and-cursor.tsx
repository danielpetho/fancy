"use client"

import React, { useCallback, useRef } from "react"

import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"
import { motion, useAnimationFrame } from "motion/react"

interface FontVariationAxis {
  name: string
  min: number
  max: number
}

interface FontVariationMapping {
  x: FontVariationAxis
  y: FontVariationAxis
}

interface TextProps {
  label: string
  fontVariationMapping: FontVariationMapping
  containerRef: React.RefObject<HTMLDivElement>
  className?: string
  onClick?: () => void
}

const VariableFontAndCursor = ({
  label,
  fontVariationMapping,
  className,
  containerRef,
  onClick,
  ...props
}: TextProps) => {
  const mousePositionRef = useMousePositionRef(containerRef)
  const spanRef = useRef<HTMLSpanElement>(null)  // Add ref for the span

  const interpolateFontVariationSettings = useCallback((
    xPosition: number,
    yPosition: number
  ) => {
    const container = containerRef.current
    if (!container) return "0 0" // Return default values if container is null

    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    const xProgress = Math.min(Math.max(xPosition / containerWidth, 0), 1)
    const yProgress = Math.min(Math.max(yPosition / containerHeight, 0), 1)

    const xValue =
      fontVariationMapping.x.min +
      (fontVariationMapping.x.max - fontVariationMapping.x.min) * xProgress
    const yValue =
      fontVariationMapping.y.min +
      (fontVariationMapping.y.max - fontVariationMapping.y.min) * yProgress

    return `'${fontVariationMapping.x.name}' ${xValue}, '${fontVariationMapping.y.name}' ${yValue}`
  }, [])

  useAnimationFrame(() => {
    const settings = interpolateFontVariationSettings(
      mousePositionRef.current.x, 
      mousePositionRef.current.y
    )
    if (spanRef.current) {
      spanRef.current.style.fontVariationSettings = settings
    }
  })

  return (
    <motion.span
      ref={spanRef}
      className={`${className} inline-block`}
      onClick={onClick}
      {...props}
    >
      {label}
    </motion.span>
  )
}

export default VariableFontAndCursor
