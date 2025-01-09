"use client"

import React, { useEffect, useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"
import { useDimensions } from "@/hooks/use-dimensions"

type ScreensaverProps = {
  children: React.ReactNode
  containerRef: React.RefObject<HTMLElement>
  speed?: number
  startPosition?: { x: number; y: number } // x,y as percentages (0-100)
  startAngle?: number // in degrees
  className?: string
}

const Screensaver: React.FC<ScreensaverProps> = ({
  children,
  speed = 3,
  startPosition = { x: 0, y: 0 },
  startAngle = 45,
  containerRef,
  className,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const angle = useRef((startAngle * Math.PI) / 180)

  const containerDimensions = useDimensions(containerRef)
  const elementDimensions = useDimensions(elementRef)

  // Set initial position based on container dimensions and percentage
  useEffect(() => {
    if (containerDimensions.width && containerDimensions.height) {
      const initialX =
        (startPosition.x / 100) *
        (containerDimensions.width - (elementDimensions.width || 0))
      const initialY =
        (startPosition.y / 100) *
        (containerDimensions.height - (elementDimensions.height || 0))
      x.set(initialX)
      y.set(initialY)
    }
  }, [containerDimensions, elementDimensions, startPosition])

  useAnimationFrame(() => {
    const velocity = speed
    const dx = Math.cos(angle.current) * velocity
    const dy = Math.sin(angle.current) * velocity

    let newX = x.get() + dx
    let newY = y.get() + dy

    // Check for collisions with container boundaries
    if (
      newX <= 0 ||
      newX + elementDimensions.width >= containerDimensions.width
    ) {
      angle.current = Math.PI - angle.current
      newX = Math.max(
        0,
        Math.min(newX, containerDimensions.width - elementDimensions.width)
      )
    }
    if (
      newY <= 0 ||
      newY + elementDimensions.height >= containerDimensions.height
    ) {
      angle.current = -angle.current
      newY = Math.max(
        0,
        Math.min(newY, containerDimensions.height - elementDimensions.height)
      )
    }

    x.set(newX)
    y.set(newY)
  })

  return (
    <motion.div
      ref={elementRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        x,
        y,
      }}
      className={cn("transform will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}

export default Screensaver
