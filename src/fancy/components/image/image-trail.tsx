"use client"

import React, { ElementType, HTMLAttributes, useEffect } from "react"
import {
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  useAnimate,
} from "motion/react"

import { cn } from "@/lib/utils"

interface ImageTrailProps extends HTMLAttributes<HTMLDivElement> {
  threshold?: number
  as?: ElementType
  children: React.ReactNode
  intensity?: number
  keyframes?: DOMKeyframesDefinition
  keyframesOptions?: DynamicAnimationOptions
}

interface ImageTrailItemProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  children: React.ReactNode
}

// helper functions
const MathUtils = {
  // linear interpolation
  lerp: (a: number, b: number, n: number) => (1 - n) * a + n * b,
  // distance between two points
  distance: (x1: number, y1: number, x2: number, y2: number) =>
    Math.hypot(x2 - x1, y2 - y1),
}

const ImageTrail = ({
  className,
  as = "div",
  children,
  threshold = 100,
  intensity = 0.3,
  keyframes,
  keyframesOptions,
  ...props
}: ImageTrailProps) => {
  const [currentId, setCurrentId] = React.useState(0)
  const lastMousePos = React.useRef({ x: 0, y: 0 })
  const cachedMousePos = React.useRef({ x: 0, y: 0 })
  const [containerRef, animate] = useAnimate()
  const globalzIndex = React.useRef(0)
  const allImages = React.useRef<NodeListOf<HTMLElement>>()

  useEffect(() => {
    allImages.current = containerRef?.current?.querySelectorAll(
      ".image-trail-item"
    ) as NodeListOf<HTMLElement>
  }, [containerRef])

  const handleMouseMove = (e: React.MouseEvent) => {
    const containerRect = containerRef?.current?.getBoundingClientRect()
    const mousePos = {
      x: e.clientX - (containerRect?.left || 0),
      y: e.clientY - (containerRect?.top || 0),
    }

    cachedMousePos.current.x = MathUtils.lerp(
      cachedMousePos.current.x || mousePos.x,
      mousePos.x,
      intensity
    )
    cachedMousePos.current.y = MathUtils.lerp(
      cachedMousePos.current.y || mousePos.y,
      mousePos.y,
      intensity
    )
    const distance = MathUtils.distance(
      mousePos.x,
      mousePos.y,
      lastMousePos.current.x,
      lastMousePos.current.y
    )

    if (distance > threshold && allImages?.current) {
      animate(
        allImages.current[currentId],
        {
          x: [
            cachedMousePos.current.x -
              allImages.current[currentId].offsetWidth / 2,
            mousePos.x - allImages.current[currentId].offsetWidth / 2,
          ],
          y: [
            cachedMousePos.current.y -
              allImages.current[currentId].offsetHeight / 2,
            mousePos.y - allImages.current?.[currentId].offsetHeight / 2,
          ],
          zIndex: globalzIndex.current,
          ...keyframes,
        },
        {
          x: { duration: 1, type: "tween" },
          y: { duration: 1, type: "tween" },
          ...keyframesOptions,
        }
      )

      setCurrentId(
        currentId === allImages.current.length - 1 ? 0 : currentId + 1
      )
      lastMousePos.current = { x: mousePos.x, y: mousePos.y }
      globalzIndex.current++
    }
  }

  const ElementTag = as ?? "div"

  return (
    <ElementTag
      className={cn("h-full w-full relative", className)}
      onMouseMove={handleMouseMove}
      ref={containerRef}
      {...props}
    >
      {children}
    </ElementTag>
  )
}

const ImageTrailItem = ({
  className,
  children,
  as = "div",
  ...props
}: ImageTrailItemProps) => {
  const ElementTag = as ?? "div"
  return (
    <ElementTag
      {...props}
      className={cn(
        "absolute top-0 left-0 will-change-transform opacity-0",
        className,
        "image-trail-item"
      )}
    >
      {children}
    </ElementTag>
  )
}

export { ImageTrail, ImageTrailItem }
