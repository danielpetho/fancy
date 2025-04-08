import React from "react"
import Image from "next/image"
import { exampleImages } from "@/utils/demo-images"

import useScreenSize from "@/hooks/use-screen-size"
import CirclingElements from "@/fancy/components/blocks/circling-elements"

const CirclingElementsDemo: React.FC = () => {
  const screenSize = useScreenSize()

  return (
    <div className="relative w-full h-full bg-[#efefef] flex items-center justify-center">
      <CirclingElements
        radius={screenSize.lessThan(`md`) ? 100 : 180}
        duration={8}
        direction="reverse"
        easing="0.944, 0.008, 0.147, 1.002"
      >
        {[...exampleImages, ...exampleImages].map((image, index) => (
          <div
            key={index}
            className="w-20 h-20 md:w-28 md:h-28 absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 duration-200 ease-out"
          >
            <Image
              src={image.url}
              fill
              alt="image"
              className="object-cover shadow-2xl "
            />
          </div>
        ))}
      </CirclingElements>
    </div>
  )
}

export default CirclingElementsDemo
