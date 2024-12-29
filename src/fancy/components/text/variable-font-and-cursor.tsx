import React from "react"

import { useMousePosition } from "@/hooks/use-mouse-position" // We'll create this hook

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
  const { x, y } = useMousePosition(containerRef)

  const interpolateFontVariationSettings = (
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
  }

  return (
    <span
      className={`${className}`}
      onClick={onClick}
      style={{
        fontVariationSettings: interpolateFontVariationSettings(x, y),
        display: "inline-block", // Ensure the span can receive mouse events
      }}
      {...props}
    >
      {label}
    </span>
  )
}

export default VariableFontAndCursor
