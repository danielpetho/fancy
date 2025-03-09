import { useRef } from "react"
import { exampleImages } from "@/utils/demo-images"

import ElementAlongPath, { ElementAlongPathItem } from "@/fancy/components/blocks/element-along-svg-path"

export default function ElementAlongPathDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Example curved path
  const path = [
    "M1 339C11.6667 293.167 86 213.5 246 163.5C446 101 536.1 150.923 686 163.5C906.5 182 1096.67 45 1112 1",
    "M1 439C11.6667 393.167 86 313.5 246 263.5C446 201 536.1 250.923 686 263.5C906.5 282 1096.67 145 1112 101"
  ]

  return (
    <div ref={containerRef} className="relative overflow-auto w-full h-full bg-black">
      <p className="text-white h-[200%] absolute top-12 left-12 w-64 text-6xl">this week in the bag</p>
      <div className="sticky w-full top-64 -left-32 h-full flex flex-col scale-125">
        <ElementAlongPath
          path={path[0]}
          pathId="path-1"
          scrollContainer={containerRef}
          animationType="scroll"
          className="absolute top-0 left-0 w-full h-full -rotate-16 -z-10" 

        >
          {[...Array(12)].map((_, i) => (
            <ElementAlongPathItem
              key={i}
              startOffset={i * 8} // Spread elements along the path
              // transition={{
              //   duration: 16,
              //   repeat: Infinity,
              //   ease: "linear",
              //   delay: i * 1.33,
              // }}
              className="z-20 pointer-events-auto"
            >
              <img
                src={exampleImages[i % exampleImages.length].url}
                alt={`Example ${i}`}
                className="w-20 h-20 object-cover shadow-2xl cursor-pointer hover:scale-105 duration-300 ease-in-out"

              />
            </ElementAlongPathItem>
          ))}
        </ElementAlongPath>
        <ElementAlongPath
          path={path[1]}
          pathId="path-2"
          scrollContainer={containerRef}
          animationType="scroll"
          className="absolute top-0 left-0 w-full h-full -rotate-16" 
          direction="reverse"
        >
          {[...Array(12)].map((_, i) => (
            <ElementAlongPathItem
              key={i}
              startOffset={i * 8} // Spread elements along the path
              // transition={{
              //   duration: 16,
              //   repeat: Infinity,
              //   ease: "linear",
              //   delay: i * 1.33,
              // }}
              className="pointer-events-auto"
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