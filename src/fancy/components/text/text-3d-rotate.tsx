"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

interface FaceProps {
  size: number
  transform: string
  texts: string[]
  className?: string
  innerClassName?: string
}

const CubeFace = ({ size, transform, texts, className, innerClassName }: FaceProps) => (
  <div
    className={cn(
      "absolute [backface-visibility:hidden] flex flex-col select-none p-2 w-full h-full",
      className
    )}
    style={{
      transform,
    }}
  >
    {texts.map((text, i) => (
      <div
        key={i}
        className={cn("w-full", innerClassName)}
      >
        <span className="text-primary-blue font-bold tracking-wider">
          {text}
        </span>
      </div>
    ))}
  </div>
)

const rightTexts = [
  "MAKE THINGS",
  "YOU WISH",
  "EXISTED",
]

const backTexts = [
  "BREAK",
  "THINGS",
  "MOVE",
  "FAST",
]

const frontTexts = [
  "YOU CAN",
  "JUST",
  "DO THINGS",
]

interface CubeProps {
  size?: number
  className?: string
  perspective?: number
  stiffness?: number
  damping?: number
}

export default function Cube({
  size = 200,
  className,
  perspective = 600,
  stiffness = 100,
  damping = 30,
}: CubeProps) {
  const isDragging = useRef(false)
  const startPosition = useRef({ x: 0, y: 0 })
  const startRotation = useRef({ x: 0, y: 0 })

  // Base motion values
  const baseRotateX = useMotionValue(0)
  const baseRotateY = useMotionValue(0)

  // Spring-animated values
  const springRotateX = useSpring(baseRotateX, {
    stiffness,
    damping,
    // Reduce stiffness during drag for smoother motion
    ...isDragging.current ? { stiffness: stiffness / 2 } : {}
  })
  const springRotateY = useSpring(baseRotateY, {
    stiffness,
    damping,
    ...isDragging.current ? { stiffness: stiffness / 2 } : {}
  })
  
  // Transform the spring values into a complete transform string
  const transform = useTransform(
    [springRotateX, springRotateY],
    ([x, y]) => `translateZ(-100px) rotateX(${x}deg) rotateY(${y}deg)`
  )

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startPosition.current = { x: e.clientX, y: e.clientY }
    startRotation.current = { 
      x: baseRotateX.get(), 
      y: baseRotateY.get() 
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return

    const deltaX = e.clientX - startPosition.current.x
    const deltaY = e.clientY - startPosition.current.y

    baseRotateX.set(startRotation.current.x - deltaY / 2)
    baseRotateY.set(startRotation.current.y + deltaX / 2)
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div
      className={cn("scene cursor-move select-none scale-150", className)} // Added select-none here
      style={{
        width: size,
        height: size,
        perspective: `${perspective}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d] text-3xl"
        style={{ transform }}
      >
        {/* Front face */}
        {/* Front face */}
        <CubeFace
          size={size}
          transform="rotateY(0deg) translateZ(100px)"
          texts={frontTexts}
          className="text-right w-full justify-end"
        />

        {/* Back face */}
        <CubeFace
          size={size}
          transform="rotateY(180deg) translateZ(100px)"
          texts={backTexts}
          className="items-end text-right" 
        />

        {/* Right face */}
        <CubeFace
          size={size}
          transform="rotateY(90deg) translateZ(100px)"
          texts={rightTexts}
          className="text-left w-full justify-end h-full"
        />

        {/* Left face */}
        <CubeFace
          size={size}
          transform="rotateY(-90deg) translateZ(100px)"
          texts={frontTexts}
          className=""
        />

        {/* Top face */}
        <CubeFace
          size={size}
          transform="rotateX(90deg) translateZ(100px)"
          texts={rightTexts}
        />

        {/* Bottom face */}
        <CubeFace
          size={size}
          transform="rotateX(-90deg) translateZ(100px) rotateZ(90deg)"
          texts={backTexts}
          className="items-start"
        />
      </motion.div>
    </div>
  )
}