import React from "react"
import { exampleImages } from "@/utils/demo-images"

import Screensaver from "@/fancy/components/blocks/screensaver"

const CirclingElementsDemo: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      className="w-full h-full bg-[#efefef] overflow-hidden flex items-center justify-center relative text-foreground dark:text-muted"
      ref={containerRef}
    >
      <h1 className="z-30 text-3xl md:text-6xl font-overused-grotesk">
        page not found
      </h1>
      {[...exampleImages, ...exampleImages].map((image, index) => (
        <Screensaver
          key={index}
          speed={1}
          startPosition={{ x: index * 3, y: index * 3 }}
          startAngle={40}
          containerRef={containerRef}
        >
          <div className="w-20 h-20 md:w-48 md:h-48 overflow-hidden">
            <img
              src={image.url}
              alt={`Example ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </Screensaver>
      ))}
    </div>
  )
}

export default CirclingElementsDemo
