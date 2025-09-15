"use client"

import { useRef } from "react"

import CircularCarousel, {
  type CircularCarouselRef,
} from "@/fancy/components/carousel/circular-carousel"

const items = Array.from({ length: 8 }, (_, i) => (
  <div
    key={i}
    className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg border-blue-500"
    style={{
      boxShadow: "0 0 var(--shadow-blur, 0px) rgba(0,0,0,var(--shadow-opacity, 0))",
      borderWidth: "var(--border-width, 0px)",
    }}
  >
    {i + 1}
  </div>
))

export default function CircularCarouselContinuousFocusDemo() {
  const carouselRef = useRef<CircularCarouselRef>(null)

  return (
    <div className="w-full h-full relative bg-gray-50 flex items-center justify-center">
      <div className="relative w-96 h-96">
        <CircularCarousel
          ref={carouselRef}
          items={items}
          radius={200}
          keepOriginalOrientation={true}
          continuousFocus={true}
          focusOrigin={0} // Focus at the top of the circle
          focusStyleInterpolation={[
            {
              property: "scale",
              from: 1,
              to: 1.5,
            },
            {
              property: "rotateZ",
              from: 0,
              to: 15,
            },
            {
              property: "translateY",
              from: 0,
              to: -100,
            },
            {
              property: "borderWidth",
              from: 0,
              to: 10,
            },
          ]}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          enableDrag={true}
          dragSensitivity={1}
          snapOnRelease={true}
          enableMomentum={true}
          momentumDecay={0.95}
          containerClassName=""
          itemClassName=""
        />
        
        {/* Visual indicator for focus origin */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full opacity-50"></div>
      </div>
    </div>
  )
}
