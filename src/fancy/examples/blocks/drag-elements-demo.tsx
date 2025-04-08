import React from "react"
import Image from "next/image"

import useScreenSize from "@/hooks/use-screen-size"
import DragElements from "@/fancy/components/blocks/drag-elements"

const urls = [
  "https://images.unsplash.com/photo-1683746531526-3bca2bc901b8?q=80&w=1820&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1631561729243-9b3291efceae?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1635434002329-8ab192fe01e1?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1719586799413-3f42bb2a132d?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1720561467986-ca3d408ca30b?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1724403124996-64115f38cd3f?q=80&w=3082&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const DragElementsDemo: React.FC = () => {
  const screenSize = useScreenSize()
  return (
    <div className="w-full h-full relative bg-[#eeeeee] overflow-hidden">
      <h1 className="absolute text-xl md:text-4xl md:ml-36 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground uppercase w-full">
        all your
        <span className="font-bold text-foreground dark:text-muted">
          {" "}
          memories.{" "}
        </span>
      </h1>
      <DragElements dragMomentum={false} className="p-40">
        {urls.map((url, index) => {
          const rotation = randomInt(-12, 12)
          const width = screenSize.lessThan(`md`)
            ? randomInt(90, 120)
            : randomInt(120, 150)
          const height = screenSize.lessThan(`md`)
            ? randomInt(120, 140)
            : randomInt(150, 180)

          return (
            <div
              key={index}
              className={`flex items-start justify-center bg-white shadow-2xl p-4`}
              style={{
                transform: `rotate(${rotation}deg)`,
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <div
                className={`relative overflow-hidden`}
                style={{
                  width: `${width - 4}px`,
                  height: `${height - 30}px`,
                }}
              >
                <Image
                  src={url}
                  fill
                  alt={`Analog photo ${index + 1}`}
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </div>
          )
        })}
      </DragElements>
    </div>
  )
}

export default DragElementsDemo
