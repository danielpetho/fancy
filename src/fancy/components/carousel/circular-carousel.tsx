"use client"

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { motion, TargetAndTransition, Transition } from "motion/react"

import { cn } from "@/lib/utils"

interface CircularCarouselProps {
  /**
   * Array of React components to display in the carousel
   */
  items: React.ReactNode[]
  /**
   * Radius of the circular arrangement in pixels, or auto to fit the container
   * @default auto
   */
  radius?: number | "auto"
  /**
   * The state to animate to when an item becomes in focus.
   * @default {}
   */
  focusTargetState?: TargetAndTransition
  /**
   * Keep items facing the camera (counter-rotate to maintain local rotation)
   * @default false
   */
  keepOriginalOrientation?: boolean
  /**
   * Whether to change the z index to the top when the item is in focus
   * @default false
   */
  focusedOnTop?: boolean
  /**
   * The base z index to use for all items
   * @default 0
   */
  baseZIndex?: number
  /**
   * Whether to go to a specific item when an item is clicked
   * @default false
   */
  goToOnClick?: boolean
  /**
   * Render debug items instead of actual items (random colors with numbers)
   * @default false
   */
  debug?: boolean
  /**
   * Transition configuration for animations
   * @default { type: "spring", stiffness: 300, damping: 30 }
   */
  transition?: Transition
  /**
   * Stagger delay between each item's animation (in seconds)
   * If provided, each item will animate with this delay multiplied by its distance from staggerOrigin
   * @default 0
   */
  staggerDelay?: number
  /**
   * Fixed angle (in radians) or position where stagger animation should start from
   * This position stays fixed regardless of carousel rotation
   * @default 0 (top of circle)
   * @example Math.PI (bottom), Math.PI/2 (right), -Math.PI/2 (left)
   */
  staggerOrigin?: number
  /**
   * Enable auto-play mode
   * @default false
   */
  autoPlay?: boolean
  /**
   * Interval (ms) between auto-play transitions
   * @default 3000
   */
  autoPlayInterval?: number
  /**
   * Rotation direction of the carousel on autoplay, cw as clockwise, ccw as counter-clockwise
   * @default "cw"
   */
  autoPlayDirection?: "cw" | "ccw"
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string
  /**
   * Additional CSS classes for the items
   */
  itemClassName?: string
  /**
   * Enable drag interaction to rotate the carousel
   * @default true
   */
  enableDrag?: boolean
  /**
   * Sensitivity of the drag movement
   * @default 1
   */
  dragSensitivity?: number
  /**
   * Snap to the closest item on drag release
   * @default true
   */
  snapOnRelease?: boolean
  /**
   * Show grab/grabbing cursor while dragging
   * @default true
   */
  grabCursor?: boolean
  /**
   * Continue rotation with decaying velocity after release
   * @default true
   */
  enableMomentum?: boolean
  /**
   * Decay factor per 60fps frame for momentum (0..1).
   * @default 0.95
   */
  momentumDecay?: number
  /**
   * Velocity threshold (rad/s) under which momentum stops and snaps to the nearest item
   * @default 0.2
   */
  momentumStopSpeed?: number
}

export interface CircularCarouselRef {
  /**
   * Move to the next item
   */
  next: () => void
  /**
   * Move to the previous item
   */
  prev: () => void
  /**
   * Go to a specific item by index
   */
  goTo: (index: number) => void
  /**
   * Get the current item index
   */
  getCurrentIndex: () => number
}

const CircularCarousel = forwardRef<CircularCarouselRef, CircularCarouselProps>(
  (
    {
      items,
      radius = "auto",
      keepOriginalOrientation = false,
      debug = false,
      focusedOnTop = false,
      baseZIndex = 0,
      focusTargetState = {},
      goToOnClick = false,
      transition = { type: "spring", stiffness: 300, damping: 30 },
      staggerDelay = 0,
      staggerOrigin = Math.PI,
      autoPlay = false,
      autoPlayInterval = 3000,
      autoPlayDirection = "cw",
      containerClassName,
      itemClassName,
      enableDrag = true,
      dragSensitivity = 1,
      snapOnRelease = true,
      grabCursor = true,
      enableMomentum = true,
      momentumDecay = 0.95,
      momentumStopSpeed = 0.2,
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [totalRotation, setTotalRotation] = useState(0)

    const containerRef = useRef<HTMLDivElement | null>(null)

    const [calculatedRadius, setCalculatedRadius] = useState<number | "auto">(
      radius
    )

    const isDragging = useRef(false)
    const [dragging, setDragging] = useState(false)
    const startRotationRef = useRef(0)
    const startAngleRef = useRef(0)
    const lastMoveAngleRef = useRef(0)
    const lastMoveTimeRef = useRef(0)
    const angularVelocityRef = useRef(0) // rad/s
    const [inertiaRunning, setInertiaRunning] = useState(false)
    const inertiaRafRef = useRef<number | null>(null)
    const lastInertiaTimeRef = useRef(0)

    const angleStep = (2 * Math.PI) / items.length

    const getDebugColor = (index: number) => {
      const colors = [
        "bg-red-200",
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-purple-200",
        "bg-pink-200",
        "bg-indigo-200",
        "bg-teal-200",
        "bg-orange-200",
        "bg-cyan-200",
        "bg-lime-200",
        "bg-emerald-200",
      ]
      return colors[index % colors.length]
    }

    const next = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
      setTotalRotation((prev) => prev - angleStep)
    }

    const prev = () => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
      setTotalRotation((prev) => prev + angleStep)
    }

    const goTo = (index: number) => {
      if (index < 0 || index >= items.length) {
        console.error("CircularCarousel: Index out of bounds")
        return
      }

      // Stop any running inertia so it doesn't interfere
      if (inertiaRunning) {
        setInertiaRunning(false)
        if (inertiaRafRef.current) cancelAnimationFrame(inertiaRafRef.current)
        inertiaRafRef.current = null
        angularVelocityRef.current = 0
      }

      // Compute shortest signed step difference in [-N/2, N/2]
      const n = items.length
      let diff = (((index - currentIndex) % n) + n) % n // normalize to [0, n-1]
      if (diff > n / 2) diff -= n // now in (-n/2, n/2]

      setCurrentIndex(index)
      setTotalRotation((prev) => prev - diff * angleStep)
    }

    const getCurrentIndex = () => currentIndex

    useImperativeHandle(ref, () => ({
      next,
      prev,
      goTo,
      getCurrentIndex,
    }))

    /**
     * Auto-play the carousel
     */
    useEffect(() => {
      if (autoPlay && items.length > 0 && !dragging && !inertiaRunning) {
        const interval = setInterval(() => {
          if (autoPlayDirection === "cw") {
            next()
          } else {
            prev()
          }
        }, autoPlayInterval)
        return () => clearInterval(interval)
      }
    }, [autoPlay, items.length, autoPlayInterval, dragging, inertiaRunning])

    /**
     * If radius is auto, calculate the radius based on the container size
     */
    useEffect(() => {
      if (radius !== "auto") setCalculatedRadius(radius)

      const container = containerRef.current
      if (!container) return

      const updateRadius = () => {
        setCalculatedRadius(
          Math.min(container.clientWidth, container.clientHeight) / 2
        )
      }

      updateRadius()

      const resizeObserver = new window.ResizeObserver(() => {
        updateRadius()
      })
      resizeObserver.observe(container)

      return () => {
        resizeObserver.disconnect()
      }
    }, [radius])

    const snapToNearest = useCallback(() => {
      setTotalRotation((curr) => {
        const stepsFromZero = Math.round(-curr / angleStep)
        const snappedRotation = -stepsFromZero * angleStep
        const newIndex =
          ((stepsFromZero % items.length) + items.length) % items.length
        setCurrentIndex(newIndex)
        return snappedRotation
      })
    }, [angleStep, items.length])

    const getCenterAndAngle = useCallback(
      (e: PointerEvent | React.PointerEvent) => {
        const container = containerRef.current
        if (!container) return { angle: 0 }
        const rect = container.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const clientX =
          (e as PointerEvent).clientX ?? (e as React.PointerEvent).clientX
        const clientY =
          (e as PointerEvent).clientY ?? (e as React.PointerEvent).clientY
        const dx = clientX - cx
        const dy = clientY - cy
        // Screen Y grows downwards; atan2 handles it correctly for relative changes
        const angle = Math.atan2(dy, dx)
        return { angle }
      },
      []
    )

    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (!enableDrag) return
        const target = e.currentTarget as HTMLElement
        try {
          target.setPointerCapture(e.pointerId)
        } catch {}
        isDragging.current = true
        setDragging(true)
        startRotationRef.current = totalRotation
        const { angle } = getCenterAndAngle(e)
        startAngleRef.current = angle
        lastMoveAngleRef.current = angle
        lastMoveTimeRef.current = performance.now()
        angularVelocityRef.current = 0
        if (grabCursor) {
          target.style.cursor = "grabbing"
        }
        // stop any running inertia
        if (inertiaRunning) {
          setInertiaRunning(false)
          if (inertiaRafRef.current) cancelAnimationFrame(inertiaRafRef.current)
          inertiaRafRef.current = null
        }
      },
      [enableDrag, totalRotation, getCenterAndAngle, grabCursor, inertiaRunning]
    )

    const handlePointerMove = useCallback(
      (e: PointerEvent) => {
        if (!isDragging.current || !enableDrag) return
        const { angle } = getCenterAndAngle(e)
        let delta = angle - startAngleRef.current
        // Normalize to [-PI, PI] to avoid jumps when crossing the seam
        while (delta > Math.PI) delta -= 2 * Math.PI
        while (delta < -Math.PI) delta += 2 * Math.PI
        const deltaAngle = delta * dragSensitivity
        // Negative sign to align with next() which subtracts angleStep for clockwise move
        setTotalRotation(startRotationRef.current + deltaAngle)

        // compute angular velocity (rad/s)
        let moveDelta = angle - lastMoveAngleRef.current
        while (moveDelta > Math.PI) moveDelta -= 2 * Math.PI
        while (moveDelta < -Math.PI) moveDelta += 2 * Math.PI
        const now = performance.now()
        const dt = (now - lastMoveTimeRef.current) / 1000
        if (dt > 0) {
          angularVelocityRef.current = moveDelta / dt
        }
        lastMoveAngleRef.current = angle
        lastMoveTimeRef.current = now
      },
      [enableDrag, getCenterAndAngle, dragSensitivity]
    )

    const handlePointerUp = useCallback(
      (e: PointerEvent | React.PointerEvent) => {
        if (!isDragging.current) return
        isDragging.current = false
        setDragging(false)
        const target = containerRef.current
        if (target && grabCursor) {
          target.style.cursor = grabCursor ? "grab" : "auto"
        }

        const speed = Math.abs(angularVelocityRef.current)
        const shouldGlide = enableMomentum && speed > momentumStopSpeed
        if (shouldGlide) {
          // start inertia
          setInertiaRunning(true)
          lastInertiaTimeRef.current = performance.now()

          const step = () => {
            const now = performance.now()
            const dt = (now - lastInertiaTimeRef.current) / 1000
            lastInertiaTimeRef.current = now

            const decay = Math.pow(momentumDecay, dt * 60)
            angularVelocityRef.current *= decay
            setTotalRotation((curr) => curr + angularVelocityRef.current * dt)

            if (Math.abs(angularVelocityRef.current) <= momentumStopSpeed) {
              setInertiaRunning(false)
              inertiaRafRef.current = null
              if (snapOnRelease) snapToNearest()
              return
            }

            inertiaRafRef.current = requestAnimationFrame(step)
          }

          inertiaRafRef.current = requestAnimationFrame(step)
          return
        }

        if (!snapOnRelease) return
        snapToNearest()
      },
      [
        snapOnRelease,
        grabCursor,
        enableMomentum,
        momentumStopSpeed,
        momentumDecay,
        snapToNearest,
      ]
    )

    /**
     * add pointer listeners for dragging
     */
    useEffect(() => {
      const onMove = (e: PointerEvent) => handlePointerMove(e)
      const onUp = (e: PointerEvent) => handlePointerUp(e)
      window.addEventListener("pointermove", onMove)
      window.addEventListener("pointerup", onUp)
      window.addEventListener("pointercancel", onUp)
      return () => {
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerup", onUp)
        window.removeEventListener("pointercancel", onUp)
      }
    }, [handlePointerMove, handlePointerUp])

    return (
      <div
        className={cn(
          "relative w-full h-full grid place-items-center",
          containerClassName
        )}
        style={{
          width: radius === "auto" ? "100%" : radius * 2,
          height: radius === "auto" ? "100%" : radius * 2,
        }}
        ref={containerRef}
        onPointerDown={handlePointerDown}
      >
        {items.map((item, index) => {
          const baseAngle = index * angleStep
          const angle = baseAngle + totalRotation

          // Create item-specific transition with stagger delay based on distance from staggerOrigin
          let itemTransition = transition
          if (staggerDelay > 0) {
            // Calculate this item's current angle in space
            const itemCurrentAngle = angle

            // Calculate the angular distance from staggerOrigin, going clockwise
            let clockwiseDistance = itemCurrentAngle - staggerOrigin

            // Normalize to 0 to 2π range (always positive, clockwise from origin)
            while (clockwiseDistance < 0) clockwiseDistance += 2 * Math.PI
            while (clockwiseDistance >= 2 * Math.PI)
              clockwiseDistance -= 2 * Math.PI

            // Convert to a step count (0 to items.length-1)
            const stepCount =
              Math.round((clockwiseDistance / (2 * Math.PI)) * items.length) %
              items.length

            itemTransition = {
              ...transition,
              delay: (transition.delay || 0) + stepCount * staggerDelay,
            }
          }

          // During drag, we want immediate response (no animation)
          if (dragging || inertiaRunning) {
            itemTransition = { ...itemTransition, duration: 0 }
          }

          const itemContent = debug ? (
            <div
              className={`w-16 h-16 ${getDebugColor(index)} flex items-center justify-center font-medium text-black text`}
            >
              {index + 1}
            </div>
          ) : (
            item
          )

          return (
            <motion.div
              key={index}
              className={cn(
                "absolute",
                enableDrag && grabCursor && "cursor-grab"
              )}
              animate={{
                transform: keepOriginalOrientation
                  ? `rotate(${angle}rad) translate(0, -${calculatedRadius}px) rotate(${-angle}rad)`
                  : `rotate(${angle}rad) translate(0, -${calculatedRadius}px)`,
                zIndex:
                  currentIndex === index && focusedOnTop
                    ? baseZIndex + items.length
                    : baseZIndex + index,
              }}
              initial={false}
              onClick={() => {
                if (goToOnClick) {
                  goTo(index)
                }
              }}
              transition={itemTransition}
            >
              <motion.div
                animate={currentIndex === index ? focusTargetState : {}}
                transition={itemTransition}
                className={cn("", itemClassName)}
              >
                {itemContent}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    )
  }
)

CircularCarousel.displayName = "CircularCarousel"

export default CircularCarousel
export type { CircularCarouselProps }
