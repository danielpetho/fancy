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
  showBackface?: boolean
  children?: ReactNode
  style?: React.CSSProperties
}

const CubeFace = ({
  transform,
  className,
  showBackface,
  children,
  style,
}: FaceProps) => (
  <div
    className={cn(
      "absolute",
      showBackface ? "backface-visible" : "backface-hidden",
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
  getCurrentRotation: () => { x: number; y: number }
}

interface CSSBoxProps extends React.HTMLProps<HTMLDivElement> {
  width: number
  height: number
  depth: number
  className?: string
  perspective?: number
  stiffness?: number
  damping?: number
  showBackface?: boolean
  faces?: CubeFaces
  draggable?: boolean
}

const CSSBox = forwardRef<CSSBoxRef, CSSBoxProps>(
  (
    {
      width,
      height,
      depth,
      className,
      perspective = 600,
      stiffness = 100,
      damping = 30,
      showBackface = false,
      faces = {},
      draggable = true,
      ...props
    },
    ref
  ) => {
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

    const currentRotation = useRef({ x: 0, y: 0 })

    useImperativeHandle(
      ref,
      () => ({
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

        getCurrentRotation: () => currentRotation.current,
      }),
      []
    )

    const transform = useTransform(
      [springRotateX, springRotateY],
      ([x, y]) =>
        `translateZ(-${depth / 2}px) rotateX(${x}deg) rotateY(${y}deg)`
    )
    const handleStart = useCallback(
      (e: React.MouseEvent | React.TouchEvent) => {
        if (!draggable) return
        isDragging.current = true
        const point = 'touches' in e ? e.touches[0] : e
        startPosition.current = { x: point.clientX, y: point.clientY }
        startRotation.current = {
          x: baseRotateX.get(),
          y: baseRotateY.get(),
        }
      },
      [draggable]
    )

    const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return
      const point = 'touches' in e ? e.touches[0] : e
      const deltaX = point.clientX - startPosition.current.x
      const deltaY = point.clientY - startPosition.current.y
      baseRotateX.set(startRotation.current.x - deltaY / 2)
      baseRotateY.set(startRotation.current.y + deltaX / 2)
    }, [])

    const handleEnd = useCallback(() => {
      isDragging.current = false
    }, [])

    useEffect(() => {
      if (draggable) {
        window.addEventListener("mousemove", handleMove)
        window.addEventListener("mouseup", handleEnd)
        window.addEventListener("touchmove", handleMove)
        window.addEventListener("touchend", handleEnd)
        return () => {
          window.removeEventListener("mousemove", handleMove)
          window.removeEventListener("mouseup", handleEnd)
          window.removeEventListener("touchmove", handleMove)
          window.removeEventListener("touchend", handleEnd)
        }
      }
    }, [draggable, handleMove, handleEnd])

    useEffect(() => {
      const unsubscribeX = baseRotateX.on("change", (v) => {
        currentRotation.current.x = v
      })
      const unsubscribeY = baseRotateY.on("change", (v) => {
        currentRotation.current.y = v
      })
      return () => {
        unsubscribeX()
        unsubscribeY()
      }
    }, [])

    return (
      <div
        className={cn(draggable && "cursor-move", className)}
        style={{
          width,
          height,
          perspective: `${perspective}px`,
        }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        {...props}
      >
        <motion.div
          className="relative w-full h-full [transform-style:preserve-3d]"
          style={{ transform }}
        >
          {/* Front and Back */}
          <CubeFace
            transform={`rotateY(0deg) translateZ(${depth / 2}px)`}
            style={{ width, height }}
            showBackface={showBackface}
          >
            {faces.front}
          </CubeFace>

          <CubeFace
            transform={`rotateY(180deg) translateZ(${depth / 2}px)`}
            style={{ width, height }}
            showBackface={showBackface}
          >
            {faces.back}
          </CubeFace>

          {/* Right and Left */}
          <CubeFace
            transform={`rotateY(90deg) translateZ(${width / 2}px)`}
            style={{
              width: depth,
              height,
              left: (width - depth) / 2,
            }}
            showBackface={showBackface}
          >
            {faces.right}
          </CubeFace>

          <CubeFace
            transform={`rotateY(-90deg) translateZ(${width / 2}px)`}
            style={{
              width: depth,
              height,
              left: (width - depth) / 2,
            }}
            showBackface={showBackface}
          >
            {faces.left}
          </CubeFace>

          {/* Top and Bottom */}
          <CubeFace
            transform={`rotateX(90deg) translateZ(${height / 2}px)`}
            style={{
              width,
              height: depth,
              top: (height - depth) / 2,
            }}
            showBackface={showBackface}
          >
            {faces.top}
          </CubeFace>

          <CubeFace
            transform={`rotateX(-90deg) translateZ(${height / 2}px)`}
            style={{
              width,
              height: depth,
              top: (height - depth) / 2,
            }}
            showBackface={showBackface}
          >
            {faces.bottom}
          </CubeFace>
        </motion.div>
      </div>
    )
  }
)

CSSBox.displayName = "CSSBox"

export default CSSBox
