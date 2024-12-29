import React from "react"
import Image from "next/image"

import useScreenSize from "@/hooks/use-screen-size"
import CirclingElements from "@/fancy/components/blocks/circling-elements"

import { exampleImages } from "../_helpers/exampleImages"

const CirclingElementsDemo: React.FC = () => {
  const screenSize = useScreenSize()

  return (
    <div className="w-full h-full bg-[#efefef] flex items-center justify-center">
      <div className="absolute top-6 left-6 text-2xl md:text-4xl uppercase">
        <span className="mr-4 text-zinc-500">Curated.</span>
        <span className="text-black">For you.</span>
      </div>
      <div className="cursor-pointer z-10 group/btn absolute bottom-6 right-6 flex flex-row space-x-1 font-medium uppercase group">
        <p className="rounded-full bg-white text-black px-4 py-2">
          View Gallery
        </p>
        <div className="rounded-full bg-white text-black px-2 py-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transform transition-transform duration-300 ease-in-out group-hover/btn:-rotate-45"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>

      <CirclingElements radius={screenSize.lessThan(`md`) ? 80 : 120}>
        {exampleImages.map((url, index) => (
          <div
            key={index}
            className="w-20 h-20 md:w-28 md:h-28 absolute -translate-x-1/2 -translate-y-1/2"
          >
            <Image src={url} fill alt="image" className="object-cover" />
          </div>
        ))}
      </CirclingElements>
    </div>
  )
}

export default CirclingElementsDemo
