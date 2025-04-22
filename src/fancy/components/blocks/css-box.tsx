"use client"

import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

interface FaceProps {
  transform: string
  className?: string
  children?: ReactNode
  style?: React.CSSProperties
}

const CubeFace = ({ transform, className, children, style }: FaceProps) => (
  <div
    className={cn(
      "absolute [backface-visibility:hidden]",
      className
    )}
    style={{ transform, ...style }}
  >
    {children}
  </div>
)

interface CubeFaces {
  front?: ReactNode
  back?: ReactNode
  right?: ReactNode
  left?: ReactNode
  top?: ReactNode
  bottom?: ReactNode
}

export interface CSSBoxRef {
  showFront: () => void
  showBack: () => void
  showLeft: () => void
  showRight: () => void
  showTop: () => void
  showBottom: () => void
  rotateTo: (x: number, y: number) => void
}

interface CSSBoxProps {
  width: number
  height: number
  depth: number
  className?: string
  perspective?: number
  stiffness?: number
  damping?: number
  faces?: CubeFaces
  draggable?: boolean
}

const CSSBox = forwardRef<CSSBoxRef, CSSBoxProps>(({
  width,
  height,
  depth,
  className,
  perspective = 600,
  stiffness = 100,
  damping = 30,
  faces = {},
  draggable = true,
}, ref) => {
  const isDragging = useRef(false)
  const startPosition = useRef({ x: 0, y: 0 })
  const startRotation = useRef({ x: 0, y: 0 })

  const baseRotateX = useMotionValue(0)
  const baseRotateY = useMotionValue(0)

  const springRotateX = useSpring(baseRotateX, {
    stiffness,
    damping,
    ...(isDragging.current ? { stiffness: stiffness / 2 } : {}),
  })
  const springRotateY = useSpring(baseRotateY, {
    stiffness,
    damping,
    ...(isDragging.current ? { stiffness: stiffness / 2 } : {}),
  })

  useImperativeHandle(ref, () => ({
    showFront: () => {
      baseRotateX.set(0)
      baseRotateY.set(0)
    },
    showBack: () => {
      baseRotateX.set(0)
      baseRotateY.set(180)
    },
    showLeft: () => {
      baseRotateX.set(0)
      baseRotateY.set(-90)
    },
    showRight: () => {
      baseRotateX.set(0)
      baseRotateY.set(90)
    },
    showTop: () => {
      baseRotateX.set(-90)
      baseRotateY.set(0)
    },
    showBottom: () => {
      baseRotateX.set(90)
      baseRotateY.set(0)
    },
    rotateTo: (x: number, y: number) => {
      baseRotateX.set(x)
      baseRotateY.set(y)
    },
  }), [])

  const transform = useTransform(
    [springRotateX, springRotateY],
    ([x, y]) => `translateZ(-${depth/2}px) rotateX(${x}deg) rotateY(${y}deg)`
  )

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!draggable) return
    isDragging.current = true
    startPosition.current = { x: e.clientX, y: e.clientY }
    startRotation.current = {
      x: baseRotateX.get(),
      y: baseRotateY.get(),
    }
  }, [draggable])

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
    if (draggable) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [draggable, handleMouseMove, handleMouseUp])

  return (
    <div
      className={cn(
        "scene select-none",
        draggable && "cursor-move",
        className
      )}
      style={{
        width,
        height,
        perspective: `${perspective}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{ transform }}
      >
        {/* Front and Back */}
        <CubeFace
          transform={`rotateY(0deg) translateZ(${depth/2}px)`}
          style={{ width, height }}
        >
          {faces.front}
        </CubeFace>

        <CubeFace
          transform={`rotateY(180deg) translateZ(${depth/2}px)`}
          style={{ width, height }}
        >
          {faces.back}
        </CubeFace>

        {/* Right and Left */}
        <CubeFace
          transform={`rotateY(90deg) translateZ(${width/2}px)`}
          style={{
            width: depth,
            height,
            left: (width - depth) / 2,
          }}
        >
          {faces.right}
        </CubeFace>

        <CubeFace
          transform={`rotateY(-90deg) translateZ(${width/2}px)`}
          style={{
            width: depth,
            height,
            left: (width - depth) / 2,
          }}
        >
          {faces.left}
        </CubeFace>

        {/* Top and Bottom */}
        <CubeFace
          transform={`rotateX(90deg) translateZ(${height/2}px)`}
          style={{
            width,
            height: depth,
            top: (height - depth) / 2,
          }}
        >
          {faces.top}
        </CubeFace>

        <CubeFace
          transform={`rotateX(-90deg) translateZ(${height/2}px)`}
          style={{
            width,
            height: depth,
            top: (height - depth) / 2,
          }}
        >
          {faces.bottom}
        </CubeFace>
      </motion.div>
    </div>
  )
})

CSSBox.displayName = "CSSBox"

export default CSSBox