"use client"

import React, {
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import {
  animate,
  DynamicOption,
  motion,
  Transition,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  ValueAnimationOptions,
} from "motion/react"

import { cn } from "@/lib/utils"

interface CarouselItem {
  id: string
  type: "image" | "video"
  src: string
  alt?: string
  poster?: string // for videos
}

interface FaceProps {
  transform: string
  className?: string
  children?: ReactNode
  style?: React.CSSProperties
  debug?: boolean
}

const CubeFace = memo(
  ({ transform, className, children, style, debug }: FaceProps) => (
    <div
      className={cn("absolute overflow-hidden", debug && "backface-visible opacity-50", className)}
      style={{ transform, ...style }}
    >
      {children}
    </div>
  )
)

CubeFace.displayName = "CubeFace"

const MediaRenderer = memo(
  ({ item, className, debug = false }: { item: CarouselItem; className?: string; debug?: boolean }) => {
    if (!debug) {
      if (item.type === "video") {
        return (
          <video
            src={item.src}
            poster={item.poster}
            className={cn("w-full h-full object-cover", className)}
            controls
            muted
            loop
          />
        )
      }

      return (
        <img
          src={item.src}
          alt={item.alt || ""}
          className={cn("w-full h-full object-cover", className)}
        />
      )
    }

    return (
      <div className={cn("w-full h-full flex items-center justify-center border text-2xl", className)}>
        {item.id}
      </div>
    )
  }
)

MediaRenderer.displayName = "MediaRenderer"

export interface BoxCarouselRef {
  next: () => void
  prev: () => void
  goToIndex: (index: number) => void
  getCurrentItemIndex: () => number
}

type RotationDirection = "horizontal" | "vertical"

interface SpringConfig {
  stiffness?: number
  damping?: number
  mass?: number
}

interface BoxCarouselProps extends React.HTMLProps<HTMLDivElement> {
  items: CarouselItem[]
  width: number
  height: number
  depth: number
  className?: string
  debug?: boolean
  perspective?: number
  direction?: RotationDirection
  transition?: ValueAnimationOptions
  autoPlay?: boolean
  autoPlayInterval?: number
  onIndexChange?: (index: number) => void
}

const BoxCarousel = forwardRef<BoxCarouselRef, BoxCarouselProps>(
  (
    {
      items,
      width,
      height,
      depth,
      className,
      perspective = 600,
      debug = false,
      direction = "horizontal",
      transition = { duration: 1.25, ease: [0.953, 0.001, 0.019, 0.995] },
      autoPlay = false,
      autoPlayInterval = 3000,
      onIndexChange,
      ...props
    },
    ref
  ) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [currentFrontFaceIndex, setCurrentFrontFaceIndex] = useState(1)

    const [originalTop, setOriginalTop] = useState(items.length - 1)
    const [originalFront, setOriginalFront] = useState(0)
    const [originalBottom, setOriginalBottom] = useState(1)
    const [originalBack, setOriginalBack] = useState(2)

    const [currentRotation, setCurrentRotation] = useState(0)

    const rotationCount = useRef(1)
    const isRotating = useRef(false)
    const pendingIndexChange = useRef<number | null>(null)

    const baseRotateX = useMotionValue(0)
    const baseRotateY = useMotionValue(0)

    const handleAnimationComplete = useCallback((direction: string) => {
      if (isRotating.current && pendingIndexChange.current !== null) {
        isRotating.current = false

        let newFrontFaceIndex: number
        let currentBackFaceIndex: number

        if (direction === "horizontal_left" || direction === "vertical_top") {
            newFrontFaceIndex = (currentFrontFaceIndex + 1) % 4
            currentBackFaceIndex = (newFrontFaceIndex + 2) % 4
        }
        else {
            newFrontFaceIndex = (currentFrontFaceIndex - 1) % 4
            currentBackFaceIndex = (newFrontFaceIndex + 2) % 4
        }

        console.log("new front face index: ", newFrontFaceIndex)

        setCurrentItemIndex(pendingIndexChange.current)
        onIndexChange?.(pendingIndexChange.current)

        console.log(
          "original face forward: ",
          newFrontFaceIndex === 0
            ? "top"
            : newFrontFaceIndex === 1
              ? "front"
              : newFrontFaceIndex === 2
                ? "bottom"
                : "back"
        )

        const indexOffset = (direction === "horizontal_left" || direction === "vertical_top") ? -1 : 1

        if (currentBackFaceIndex === 0) {
          setOriginalTop((pendingIndexChange.current + indexOffset + items.length) % items.length)
        }
        else if (currentBackFaceIndex === 1) {
          setOriginalFront((pendingIndexChange.current + indexOffset + items.length) % items.length)
        }
        else if (currentBackFaceIndex === 2) {
          setOriginalBottom((pendingIndexChange.current + indexOffset + items.length) % items.length)
        }
        else if (currentBackFaceIndex === 3) {
          setOriginalBack((pendingIndexChange.current + indexOffset + items.length) % items.length)
        }

        pendingIndexChange.current = null
        rotationCount.current++

        setCurrentFrontFaceIndex(newFrontFaceIndex)
      }
    }, [currentFrontFaceIndex, items.length, onIndexChange])

    const next = useCallback(() => {
      if (items.length === 0 || isRotating.current) return

      isRotating.current = true
      const newIndex = (currentItemIndex + 1) % items.length
      pendingIndexChange.current = newIndex

      if (direction === "horizontal") {
        animate(baseRotateY, currentRotation + 90, {
          ...transition,
          onComplete: () => {
            handleAnimationComplete("horizontal_left")
            setCurrentRotation(currentRotation + 90)
          },
        })
      } else {
        animate(baseRotateX, currentRotation + 90, {
          ...transition,
          onComplete: () => {
            handleAnimationComplete("vertical_top")
            setCurrentRotation(currentRotation + 90)
          },
        })
      }
    }, [items.length, direction, transition, currentRotation])

    const prev = useCallback(() => {
      if (items.length === 0 || isRotating.current) return

      isRotating.current = true
      const newIndex =
        currentItemIndex === 0 ? items.length - 1 : currentItemIndex - 1
      pendingIndexChange.current = newIndex

      if (direction === "horizontal") {
        animate(baseRotateY, currentRotation - 90, {
          ...transition,
          onComplete: () => {
            handleAnimationComplete("horizontal_right")
            setCurrentRotation(currentRotation - 90)
          },
        })
      } else {
        animate(baseRotateX, currentRotation - 90, {
          ...transition,
          onComplete: () => {
            handleAnimationComplete("vertical_bottom")
            setCurrentRotation(currentRotation - 90)
          },
        })
      }
    }, [items.length, direction, transition])

    const goToIndex = useCallback(
      (index: number) => {
        if (index < 0 || index >= items.length || isRotating.current) return

        isRotating.current = true
        const difference = index - currentItemIndex
        pendingIndexChange.current = index

        const rotationAmount = difference * 90

        
        // Animate the rotation
        // if (direction === "horizontal") {
        //   animate(baseRotateY, rotationAmount, {
        //     ...transition,
        //     onComplete: handleAnimationComplete,
        //   })
        // } else {
        //   animate(baseRotateX, -rotationAmount, {
        //     ...transition,
        //     onComplete: handleAnimationComplete,
        //   })
        // }
      },
      [
        currentItemIndex,
        items.length,
        direction,
        transition,
        handleAnimationComplete,
        baseRotateY,
        baseRotateX,
      ]
    )

    useImperativeHandle(
      ref,
      () => ({
        next,
        prev,
        goToIndex,
        getCurrentItemIndex: () => currentItemIndex,
      }),
      [next, prev, goToIndex, currentItemIndex]
    )

    const transform = useTransform(
      [baseRotateX, baseRotateY],
      ([x, y]) =>
        `translateZ(-${depth / 2}px) rotateX(${x}deg) rotateY(${y}deg)`
    )

    // Auto play functionality
    useEffect(() => {
      if (autoPlay && items.length > 0) {
        const interval = setInterval(next, autoPlayInterval)
        return () => clearInterval(interval)
      }
    }, [autoPlay, items.length, next, autoPlayInterval])

    return (
      <div
        className={cn("relative", className)}
        style={{
          width,
          height,
          perspective: `${perspective}px`,
        }}
        {...props}
      >
        <motion.div
          className="relative w-full h-full [transform-style:preserve-3d]"
          style={{
            transform: transform,
          }}
        >
          {/* original top */}
          <CubeFace
            transform={`rotateX(90deg) translateZ(${height / 2}px)`}
            style={debug ? { width, height, backgroundColor: '#ff9999' } : { width, height }}
            debug={debug}
          >
            <MediaRenderer item={items[originalTop]} debug={debug} />
          </CubeFace>

          {/* original front */}
          <CubeFace
            transform={`rotateY(0deg) translateZ(${depth / 2}px)`}
            style={debug ? { width, height, backgroundColor: '#99ff99' } : { width, height }}
            debug={debug}
          >
            <MediaRenderer item={items[originalFront]} debug={debug} />
          </CubeFace>

          {/* original bottom */}
          <CubeFace
            transform={`rotateX(-90deg) translateZ(${height / 2}px)`}
            style={debug ? { width, height, backgroundColor: '#9999ff' } : { width, height }}
            debug={debug}
          >
            <MediaRenderer item={items[originalBottom]} debug={debug} />
          </CubeFace>

          {/* original back */}
          <CubeFace
            transform={`rotateY(180deg) translateZ(${depth / 2}px) rotateZ(180deg)`}
            style={debug ? { width, height, backgroundColor: '#ffff99' } : { width, height }}
            debug={debug}
          >
            <MediaRenderer item={items[originalBack]} debug={debug} />
          </CubeFace>
        </motion.div>
      </div>
    )
  }
)

BoxCarousel.displayName = "BoxCarousel"

export default BoxCarousel
export type { CarouselItem, RotationDirection, SpringConfig }
