import { useEffect, useRef, useState } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

// Custom wrap function to replace the one from @motionone/utils
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

interface SimpleMarqueeProps {
    children: React.ReactNode
    className?: string
    direction?: "left" | "right" | "up" | "down"
    baseVelocity?: number
    slowdownOnHover?: boolean
    slowDownFactor?: number
    repeat?: number
  }
  
  const SimpleMarquee = ({
    children,
    className,
    direction = "right",
    baseVelocity = 5, // pixels per second
    slowdownOnHover = true,
    slowDownFactor = 0.3,
    repeat = 3,
  }: SimpleMarqueeProps) => {
    const baseX = useMotionValue(0)
    const baseY = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    })
  
    const hoverFactorValue = useMotionValue(1)
  
    const smoothHoverFactor = useSpring(hoverFactorValue, {
      damping: 50,
      stiffness: 400,
    })
  
    // Transform scroll velocity into a factor that affects marquee speed
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    })
  
    // Determine if movement is horizontal or vertical
    const isHorizontal = direction === "left" || direction === "right"
    
    // Convert baseVelocity to the correct direction
    const actualBaseVelocity = 
      direction === "left" || direction === "up" 
        ? -baseVelocity 
        : baseVelocity
  
    // Reference to track if mouse is hovering
    const isHovered = useRef(false)
  
    // Direction factor for changing direction based on scroll
    const directionFactor = useRef(1)
  
    // Transform baseX/baseY into a percentage for the transform
    // The wrap function ensures the value stays between the specified range
    const x = useTransform(baseX, (v) => `${wrap(0, -100, v)}%`)
    const y = useTransform(baseY, (v) => `${wrap(0, -100, v)}%`)
  
    useAnimationFrame((t, delta) => {
      // Update hover factor
      if (isHovered.current) {
        hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1)
      } else {
        hoverFactorValue.set(1)
      }
  
      // Calculate how much to move based on time delta
      let moveBy = actualBaseVelocity * (delta / 1000) * smoothHoverFactor.get()
  
      // Adjust movement based on scroll velocity
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
  
      moveBy += moveBy * velocityFactor.get()
  
      // Update the appropriate motion value based on direction
      if (isHorizontal) {
        baseX.set(baseX.get() + moveBy)
      } else {
        baseY.set(baseY.get() + moveBy)
      }
    })
  
    return (
      <div
        className={cn(
          "overflow-hidden flex", 
          isHorizontal ? "flex-row" : "flex-col",
          className
        )}
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
        {Array.from({ length: repeat }, (_, i) => i).map((i) => (
          <motion.div 
            key={i}
            className={"shrink-0"} 
            style={isHorizontal ? { x } : { y }}
          >
            {children}
          </motion.div>
        ))}
      </div>
    )
  }
  
  export default SimpleMarquee