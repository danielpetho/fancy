import { useRef } from "react"
import { exampleImages } from "@/utils/demo-images"

import ElementAlongPath, { ElementAlongPathItem } from "@/fancy/components/blocks/element-along-svg-path"

export default function ElementAlongPathDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Example curved path
  const path = [
    "M50 834.164C212.74 882.895 680.258 917.493 517.272 666.037C313.539 351.717 165.457 717.76 261.264 792.079C357.071 866.398 764.187 1094.67 1027.35 779.733C1290.51 464.799 870.184 402.145 797.713 483.004C725.242 563.863 714.062 694.387 838.188 769.547C962.313 844.708 1241.18 882.697 1433.84 840.822C1626.51 798.948 1850.77 562.852 1797.53 423.779C1744.28 284.706 1516.34 50.0531 1379.53 187.439C1242.72 324.825 1200.59 508.353 1303.05 620.151C1405.51 731.949 1762.55 896.84 1864.04 895.741C1965.54 894.643 2546.17 930.045 2742.21 760.194",
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
          animationType="auto"
          className="absolute top-0 left-0 w-full h-full -rotate-16 -z-10" 

        >
          {[...Array(12)].map((_, i) => (
            <ElementAlongPathItem
              key={i}
              //startOffset={i * 8} // Spread elements along the path
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.33,
              }}
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
          animationType="auto"
          className="absolute top-0 left-0 w-full h-full -rotate-16" 
          direction="reverse"
        >
          {[...Array(12)].map((_, i) => (
            <ElementAlongPathItem
              key={i}
              //startOffset={i * 8} // Spread elements along the path
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.33,
              }}
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