"use client"

import { useRef, useState } from "react"
import CircularCarousel, { type CircularCarouselRef } from "@/fancy/components/carousel/circular-carousel"

export default function CircularCarouselDemo() {
  const carouselRef = useRef<CircularCarouselRef>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Simple components to arrange in a circle
  const items = [
    <div key="1" className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
      1
    </div>,
    <div key="2" className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
      2
    </div>,
    <div key="3" className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
      3
    </div>,
    <div key="4" className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
      4
    </div>,
    <div key="5" className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
      5
    </div>,
    <div key="6" className="w-16 h-16 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
      6
    </div>,
  ]

  const handleNext = () => {
    carouselRef.current?.next()
    setCurrentIndex(prev => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    carouselRef.current?.prev()
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleGoTo = (index: number) => {
    carouselRef.current?.goTo(index)
    setCurrentIndex(index)
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 p-8">
      
      <CircularCarousel
        ref={carouselRef}
        items={items}
        keepOriginalOrientation={true}
        debug={true}
        radius={100}
      />
      
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          ← Previous
        </button>
        
        <span className="text-sm text-gray-600 tabular-nums">
          Item {currentIndex + 1} of {items.length}
        </span>
        
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Direct navigation */}
      <div className="flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleGoTo(index)}
            className={`w-2 h-2 rounded-full text-sm font-medium transition-colors ${
              index === currentIndex
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
          </button>
        ))}
      </div>

    </div>
  )
}