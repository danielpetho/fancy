import { useRef } from "react"
import { exampleImages } from "@/utils/demo-images"

import ElementAlongPath, {
  ElementAlongPathItem,
} from "@/fancy/components/blocks/element-along-svg-path"

export default function ElementAlongPathDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative overflow-auto w-full h-full">
      <p className="h-[200%] absolute top-12 left-12 w-64 text-6xl">
        this week in the bag
      </p>
      <div className="sticky w-full h-full">
        <ElementAlongPath
          path={
            "M3.5002 223.998C-15 50.9992 95.8557 -60.0575 190 37.4991C259 109 274 139.999 444 139.999"
          }
          pathId="path-1"
          showPath={true}
          viewBox="0 0 444 225"
          scrollContainer={containerRef}
          animationType="auto"
          className="absolute w-full h-full top-0 left-0"
        >
          {[...Array(1)].map((_, i) => (
            <ElementAlongPathItem
              key={i}
              transition={{
                duration: 3,
                ease: [0.757, -0.002, 0.123, 0.993],
              }}
              className="pointer-events-auto absolute top-0 left-0"
            >
              <img
                src={exampleImages[i % exampleImages.length].url}
                alt={`Example ${i}`}
                className="w-20 h-20 object-cover shadow-2xl cursor-pointer hover:scale-105 duration-300 ease-in-out"
              />
            </ElementAlongPathItem>
          ))}
        </ElementAlongPath>
      </div>
    </div>
  )
}
