"use client"

import React, { useMemo } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type CirclingElementsProps = {
  children: React.ReactNode
  radius?: number
  duration?: number // in seconds
  easing?: string
  direction?: "normal" | "reverse"
  className?: string
  pauseOnHover?: boolean
}

const CirclingElements: React.FC<CirclingElementsProps> = ({
  children,
  radius = 100,
  duration = 10,
  easing = "linear",
  direction = "normal",
  className,
  pauseOnHover = false,
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {React.Children.map(children, (child, index) => {
        const offset = (index * 360) / React.Children.count(children)

        const animationProps = {
          "--circling-duration": duration,
          "--circling-radius": radius,
          "--circling-offset": offset,
          "--circling-direction": direction === "reverse" ? -1 : 1,
          animation: `circling ${duration}s ${easing} infinite`,
          animationName: "circling",
          animationDuration: `${duration}s`,
          animationTimingFunction: easing,
          animationIterationCount: "infinite",
        } as React.CSSProperties

        return (
          <motion.div
            key={index}
            style={animationProps}
            className={cn(
              "transform-gpu absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circling",
              pauseOnHover && "hover:animation-play-state:paused"

            )}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}

export default CirclingElements
