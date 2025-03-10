import React from "react"
import Image from "next/image"
import { exampleImages } from "@/utils/demo-images"

import useScreenSize from "@/hooks/use-screen-size"
import CirclingElements from "@/fancy/components/blocks/circling-elements"

const CirclingElementsDemo: React.FC = () => {
  const screenSize = useScreenSize()

  return (
    <div className="w-full h-full bg-[#efefef] flex items-center justify-center">
      <CirclingElements
        radius={screenSize.lessThan(`md`) ? 80 : 120}
        duration={10}
        easing="linear"
        pauseOnHover={true}
      >
        {exampleImages.map((image, index) => (
          <div
            key={index}
            className="w-20 h-20 md:w-28 md:h-28 hover:scale-125 duration-200 ease-out cursor-pointer"
          >
            <Image src={image.url} fill alt="image" className="object-cover" />
          </div>
        ))}
      </CirclingElements>
    </div>
  )
}

export default CirclingElementsDemo
