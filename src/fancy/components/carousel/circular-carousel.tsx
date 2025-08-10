"use client"

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
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
   * Radius of the circular arrangement in pixels
   * @default 100
   */
  radius?: number
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
   * Additional CSS classes for the container
   */
  containerClassName?: string
  /**
   * Additional CSS classes for the items
   */
  itemClassName?: string
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
      radius = 100,
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
      containerClassName,
      itemClassName,
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [totalRotation, setTotalRotation] = useState(0)

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
      if (index >= 0 && index < items.length) {
        let diff = index - currentIndex
        let angle = diff * angleStep
        // Find the shortest path around the circle
        if (diff > items.length / 2) {
          angle = angle
        } else if (diff < items.length / 2) {
          angle = -angle
        }

        setCurrentIndex(index)
        setTotalRotation((prev) => prev - diff * angleStep)
      } else {
        console.error("CircularCarousel: Index out of bounds")
      }
    }

    const getCurrentIndex = () => currentIndex

    useImperativeHandle(ref, () => ({
      next,
      prev,
      goTo,
      getCurrentIndex,
    }))

    useEffect(() => {
      if (autoPlay && items.length > 0) {
        const interval = setInterval(() => {
          next()
        }, autoPlayInterval)
        return () => clearInterval(interval)
      }
    }, [autoPlay, items.length, autoPlayInterval])

    return (
      <div
        className={cn(
          "relative w-full h-full grid place-items-center",
          containerClassName
        )}
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
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
              className="absolute"
              animate={{
                transform: `rotate(${angle}rad) translate(0, -${radius}px)`,
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
