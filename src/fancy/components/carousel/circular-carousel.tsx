"use client"

import React, { forwardRef, useImperativeHandle, useState } from "react"
import { motion } from "motion/react"

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
   * Additional CSS classes for the container
   */
  className?: string
  /**
   * Keep items facing the camera (counter-rotate to maintain local rotation)
   * @default false
   */
  keepOriginalOrientation?: boolean
  /**
   * Render debug items instead of actual items (random colors with numbers)
   * @default false
   */
  debug?: boolean
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
  ({ items, radius = 100, className, keepOriginalOrientation = false, debug = false }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [totalRotation, setTotalRotation] = useState(0)

    const angleStep = (2 * Math.PI) / items.length

    const getDebugColor = (index: number) => {
      const colors = [
        'bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200',
        'bg-purple-200', 'bg-pink-200', 'bg-indigo-200', 'bg-teal-200',
        'bg-orange-200', 'bg-cyan-200', 'bg-lime-200', 'bg-emerald-200'
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
        let diff = Math.abs(index - currentIndex)

        // Find the shortest path around the circle
        if (diff > items.length / 2) {
          diff = diff + items.length
        } else if (diff < -items.length / 2) {
          diff = diff - items.length
        }

        setCurrentIndex(index)
        setTotalRotation((prev) => prev + diff * angleStep)
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

    return (
      <div
        className={cn("relative", className)}
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            rotate: `${totalRotation}rad`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {items.map((item, index) => {
            const angle = index * angleStep
            const x = Math.sin(angle) * radius
            const y = -Math.cos(angle) * radius

            const itemRotation = keepOriginalOrientation ? -totalRotation : angle

            const itemContent = debug ? (
              <div className={`w-16 h-16 ${getDebugColor(index)} flex items-center justify-center font-medium text-black text`}>
                {index + 1}
              </div>
            ) : item

            return (
              <motion.div
                key={index}
                className="absolute"
                animate={{
                  transform: `translate(-50%, -50%) rotate(${itemRotation}rad)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                {itemContent}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    )
  }
)

CircularCarousel.displayName = "CircularCarousel"

export default CircularCarousel
export type { CircularCarouselProps }
