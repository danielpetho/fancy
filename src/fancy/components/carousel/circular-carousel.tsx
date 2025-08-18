"use client"

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import {
  motion,
  TargetAndTransition,
  Transition,
  useAnimationFrame,
  useTime,
} from "motion/react"

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
   * Pause auto-play on hover
   * @default false
   */
  autoPlayPauseOnHover?: boolean
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

  /**
   * Enable keyboard navigation when the carousel is focused
   * @default true
   */
  enableKeyboardNav?: boolean
  /**
   * Direction of keyboard navigation
   * @default "horizontal" - left/right arrows
   */
  keyboardNavDirection?: "horizontal" | "vertical"
  /**
   * Enable wheel navigation to trigger next/prev
   * @default true
   */
  enableWheelNav?: boolean
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
  /**
   * Get the current autoplay progress
   * @returns {progress: number, remainingTime: number} - progress from 0 to 1, remainingTime in ms
   */
  getAutoPlayProgress: () => { progress: number; remainingTime: number }
  /**
   * Get the current autoplay state
   * @returns {isPaused: boolean, isRunning: boolean}
   */
  getAutoplayState: () => { state: "paused" | "running" }
  /**
   * Pause autoplay (saves current progress)
   */
  pause: () => void
  /**
   * Resume/start autoplay (continues from saved progress if paused)
   */
  start: () => void
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
      autoPlayPauseOnHover = false,
      containerClassName,
      itemClassName,
      enableDrag = true,
      dragSensitivity = 1,
      snapOnRelease = true,
      grabCursor = true,
      enableMomentum = true,
      momentumDecay = 0.95,
      momentumStopSpeed = 0.2,
      enableKeyboardNav = true,
      keyboardNavDirection = "horizontal",
      enableWheelNav = true,
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [totalRotation, setTotalRotation] = useState(0)

    const [isHovered, setIsHovered] = useState(false)
    const [isManuallyPaused, setIsManuallyPaused] = useState(false)
    const [manualNavTrigger, setManualNavTrigger] = useState(0)

    const containerRef = useRef<HTMLDivElement | null>(null)

    const [calculatedRadius, setCalculatedRadius] = useState<number | "auto">(
      radius
    )

    // Dragging and inertia refs and states
    const isDragging = useRef(false)
    const [dragging, setDragging] = useState(false)
    const startRotationRef = useRef(0)
    const startAngleRef = useRef(0)
    const lastMoveAngleRef = useRef(0)
    const lastMoveTimeRef = useRef(0)
    const angularVelocityRef = useRef(0) // rad/s
    const [inertiaRunning, setInertiaRunning] = useState(false)

    // Progress tracking refs
    const autoPlayStartTimeRef = useRef<number>(0)
    const currentProgressRef = useRef<number>(0)
    const currentRemainingTimeRef = useRef<number>(0)
    const currentProgressTimeRef = useRef<number>(0)

    // Angle difference between each item in radians
    const angleStep = (2 * Math.PI) / items.length

    // Handy time value from motion. It counts from its creation time.
    const t = useTime()

    useAnimationFrame((time, delta) => {
      // Update autoplay progress if nit paused or hovered
      if (!(autoPlayPauseOnHover && isHovered) && !isManuallyPaused) {
        currentProgressTimeRef.current = t.get() - autoPlayStartTimeRef.current
        currentProgressRef.current =
          (t.get() - autoPlayStartTimeRef.current) / autoPlayInterval
        currentRemainingTimeRef.current =
          autoPlayInterval - (t.get() - autoPlayStartTimeRef.current)
      }

      // If no intertia is running, no need to calculate anything.
      if (!inertiaRunning) return

      // Otherwise rotate the carousel until inertia stops.
      const dt = delta / 1000

      const decay = Math.pow(momentumDecay, dt * 60)
      angularVelocityRef.current *= decay

      setTotalRotation((curr) => curr + angularVelocityRef.current * dt)

      // Check if velocity has decreased below threshold, then we snap to the nearest item.
      if (Math.abs(angularVelocityRef.current) <= momentumStopSpeed) {
        setInertiaRunning(false)
        angularVelocityRef.current = 0
        if (snapOnRelease) snapToNearest()
      }
    })

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

    // Reset autoplay progress
    const resetAutoPlayProgress = useCallback(() => {
      autoPlayStartTimeRef.current = t.get()
      currentProgressRef.current = 0
      currentRemainingTimeRef.current = autoPlayInterval
      currentProgressTimeRef.current = t.get() - autoPlayStartTimeRef.current
    }, [autoPlayInterval])

    const getAutoPlayProgress = useCallback(() => {
      return {
        progress: currentProgressRef.current,
        remainingTime: currentRemainingTimeRef.current,
      }
    }, [])

    const next = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
      setTotalRotation((prev) => prev - angleStep)
      resetAutoPlayProgress()
      setManualNavTrigger((prev) => prev + 1)
    }

    const prev = () => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
      setTotalRotation((prev) => prev + angleStep)
      resetAutoPlayProgress()
      setManualNavTrigger((prev) => prev + 1)
    }

    const goTo = (index: number) => {
      if (index < 0 || index >= items.length) {
        console.error("CircularCarousel: Index out of bounds")
        return
      }

      // Stop any running inertia so it doesn't interfere
      if (inertiaRunning) {
        setInertiaRunning(false)
        angularVelocityRef.current = 0
      }

      /*
       * Get the "shortest" path to the focus angle. For example, if the carousel is at index 0 and we want to go to items.length - 1, it will not rotate an almost full circle, only one step.
       */
      const n = items.length
      // Find the distance between the current index and the target index, with mod to wrap around the carousel.
      let diff = (index - currentIndex) % n
      // If diff is negative, wrap it to a positive equivalent.
      if (diff < 0) diff += n
      // If moving forward is longer than moving backward, go backward instead.
      if (diff > n / 2) diff -= n

      setCurrentIndex(index)
      setTotalRotation((prev) => prev - diff * angleStep)
      resetAutoPlayProgress()
      setManualNavTrigger((prev) => prev + 1)
    }

    const getCurrentIndex = () => currentIndex

    const pause = useCallback(() => {
      if (!isManuallyPaused) {
        currentProgressTimeRef.current = t.get() - autoPlayStartTimeRef.current
        setIsManuallyPaused(true)
      }
    }, [isManuallyPaused])

    const start = useCallback(() => {
      if (isManuallyPaused) {
        // Resume from where we left off
        autoPlayStartTimeRef.current = t.get() - currentProgressTimeRef.current
        setIsManuallyPaused(false)
      }
    }, [isManuallyPaused])

    const getAutoplayState = useCallback(() => {
      return {
        state: isManuallyPaused
          ? "paused"
          : ("running" as "paused" | "running"),
      }
    }, [isManuallyPaused])

    useImperativeHandle(ref, () => ({
      next,
      prev,
      goTo,
      getCurrentIndex,
      getAutoPlayProgress,
      getAutoplayState,
      pause,
      start,
    }))

    /**
     * Auto-play
     */
    useEffect(() => {
      if (
        autoPlay &&
        items.length > 0 &&
        !dragging &&
        !inertiaRunning &&
        !isManuallyPaused &&
        !(autoPlayPauseOnHover && isHovered)
      ) {
        let intervalId: NodeJS.Timeout | null = null

        const step = () => {
          if (autoPlayDirection === "cw") {
            next()
          } else {
            prev()
          }
        }

        // If we have remaining time from a pause, use that for the first timeout
        const hasRemainingTime =
          currentRemainingTimeRef.current > 0 &&
          currentRemainingTimeRef.current < autoPlayInterval
        const initialDelay = hasRemainingTime
          ? currentRemainingTimeRef.current
          : autoPlayInterval

        // First execution (either full interval or remaining time)
        const timeout = window.setTimeout(() => {
          step()
          // After the first execution, set up regular interval. This will be in effect until the next manual nav trigger / hover / pause etc.
          intervalId = setInterval(step, autoPlayInterval)
        }, initialDelay)

        return () => {
          clearTimeout(timeout)
          if (intervalId) {
            clearInterval(intervalId)
          }
        }
      }
    }, [
      autoPlay,
      items.length,
      autoPlayInterval,
      dragging,
      inertiaRunning,
      isManuallyPaused,
      autoPlayPauseOnHover,
      isHovered,
      manualNavTrigger,
    ])

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

      if (autoPlayPauseOnHover) {
        container.addEventListener("mouseenter", handleMouseEnter)
        container.addEventListener("mouseleave", handleMouseLeave)
      }

      return () => {
        resizeObserver.disconnect()
      }
    }, [radius])

    /**
     * Snap to the nearest item
     */
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

    /**
     * Get the center and angle of the pointer event. Needed for correctly calculating the angle of the dragging.
     */
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
        lastMoveTimeRef.current = t.get()
        angularVelocityRef.current = 0
        if (grabCursor) {
          target.style.cursor = "grabbing"
        }
        // stop any running inertia
        if (inertiaRunning) {
          setInertiaRunning(false)
          angularVelocityRef.current = 0
        }
      },
      [enableDrag, totalRotation, getCenterAndAngle, grabCursor, inertiaRunning]
    )

    const handlePointerMove = useCallback(
      (e: PointerEvent) => {
        if (!isDragging.current || !enableDrag) return
        const { angle } = getCenterAndAngle(e)
        let delta = angle - startAngleRef.current

        while (delta > Math.PI) delta -= 2 * Math.PI
        while (delta < -Math.PI) delta += 2 * Math.PI
        const deltaAngle = delta * dragSensitivity

        setTotalRotation(startRotationRef.current + deltaAngle)

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
          setInertiaRunning(true)
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

    const handleMouseEnter = useCallback(() => {
      if (autoPlayPauseOnHover) {
        currentProgressTimeRef.current = t.get() - autoPlayStartTimeRef.current
        setIsHovered(true)
      }
    }, [autoPlayPauseOnHover])

    const handleMouseLeave = useCallback(() => {
      if (autoPlayPauseOnHover) {
        // Resume from where we left off instead of restarting
        autoPlayStartTimeRef.current = t.get() - currentProgressTimeRef.current
        setIsHovered(false)
      }
    }, [autoPlayPauseOnHover])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (!enableKeyboardNav) return

        const isHorizontal = keyboardNavDirection === "horizontal"
        const nextKeys = isHorizontal ? ["ArrowRight"] : ["ArrowDown"]
        const prevKeys = isHorizontal ? ["ArrowLeft"] : ["ArrowUp"]

        if (nextKeys.includes(e.key)) {
          e.preventDefault()
          prev()
        } else if (prevKeys.includes(e.key)) {
          e.preventDefault()
          next()
        }
      },
      [enableKeyboardNav, keyboardNavDirection, next, prev]
    )

    const handleWheel = useCallback(
      (e: WheelEvent) => {
        if (!enableWheelNav) return

        // Prevent default scrolling behavior
        e.preventDefault()

        // deltaY is positive when scrolling down, negative when scrolling up
        if (e.deltaY > 0) {
          next()
        } else if (e.deltaY < 0) {
          prev()
        }
      },
      [enableWheelNav, next, prev]
    )

    /**
     * Add pointer listeners for dragging
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

    /**
     * Add keyboard listeners for navigation
     */
    useEffect(() => {
      if (!enableKeyboardNav) return

      const container = containerRef.current
      if (!container) return

      container.addEventListener("keydown", handleKeyDown)

      if (!enableWheelNav) return

      container.addEventListener("wheel", handleWheel)

      return () => {
        container.removeEventListener("keydown", handleKeyDown)
        container.removeEventListener("wheel", handleWheel)
      }
    }, [enableKeyboardNav, handleKeyDown])


    return (
      <div
        className={cn(
          "relative w-full h-full grid place-items-center focus:outline-none",
          containerClassName
        )}
        style={{
          width: radius === "auto" ? "100%" : radius * 2,
          height: radius === "auto" ? "100%" : radius * 2,
        }}
        ref={containerRef}
        onPointerDown={handlePointerDown}
        {...(enableKeyboardNav && { tabIndex: 0 })}
      >
        {items.map((item, index) => {
          const baseAngle = index * angleStep
          const angle = baseAngle + totalRotation

          let itemTransition = transition
          if (staggerDelay > 0) {
            const itemCurrentAngle = angle

            let clockwiseDistance = itemCurrentAngle - staggerOrigin

            while (clockwiseDistance < 0) clockwiseDistance += 2 * Math.PI
            while (clockwiseDistance >= 2 * Math.PI)
              clockwiseDistance -= 2 * Math.PI

            const stepCount =
              Math.round((clockwiseDistance / (2 * Math.PI)) * items.length) %
              items.length

            itemTransition = {
              ...transition,
              delay: (transition.delay || 0) + stepCount * staggerDelay,
            }
          }

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
                "absolute ",
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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