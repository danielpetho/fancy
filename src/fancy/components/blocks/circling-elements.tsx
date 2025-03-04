"use client"

import React, { useMemo } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type CirclingElementsProps = {
  children: React.ReactNode
  radius?: number
  duration?: number // in seconds
  easing?: string
  className?: string
}

const CirclingElements: React.FC<CirclingElementsProps> = ({
  children,
  radius = 100,
  duration = 10,
  easing = "linear",
  className,
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {React.Children.map(children, (child, index) => {
        const offset = (index * 360) / React.Children.count(children)

        const animationProps = {
          "--circling-duration": duration,
          "--circling-radius": radius,
          "--circling-offset": offset,
          animation: `circling ${duration}s ${easing} infinite`,
        } as React.CSSProperties

        return (
          <motion.div
            key={index}
            className={cn(
              "transform-gpu absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circling"
            )}
            style={animationProps}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}

export default CirclingElements
