"use client"

import Link from "next/link"

import { Component } from "@/types/types"
import Floating, {
  FloatingElement,
} from "@/fancy/components/image/parallax-floating"

import HoverVideo from "./hover-video"

export function HeroImages({ allComps }: { allComps: Component[] }) {
  if (!Array.isArray(allComps)) {
    console.error("allComps is not an array:", allComps)
    return null
  }

  const getComp = (name: string) => {
    const comp = allComps.find((comp) => comp.name === name)
    if (!comp) {
      console.error(`Component ${name} not found`)
      return null
    }
    return comp
  }

  const preLink = "/docs/components"

  return (
    <Floating sensitivity={-0.5} className="h-full">
      <FloatingElement
        depth={0.5}
        className="top-[15%] left-[2%] md:top-[25%] md:left-[5%] "
      >
        <Link href={`${preLink}/blocks/sticky-footer`}>
          <HoverVideo
            thumbnail={getComp("sticky-footer")!.thumbnail.url}
            videoSrc={getComp("sticky-footer")!.demo.url}
            className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
            delay={0.5}
          />
        </Link>
      </FloatingElement>
      <FloatingElement
        depth={1}
        className="top-[0%] left-[8%] md:top-[6%] md:left-[11%] "
      >
        <Link href={`${preLink}/text/scramble-in`}>
          <HoverVideo
            thumbnail={getComp("scramble-in")!.thumbnail.url}
            videoSrc={getComp("scramble-in")!.demo.url}
            className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
            delay={0.7}
          />
        </Link>
      </FloatingElement>

      <FloatingElement
        depth={4}
        className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
      >
        <Link href={`${preLink}/text/letter-swap`}>
          <HoverVideo
            thumbnail={getComp("letter-swap")!.thumbnail.url}
            videoSrc={getComp("letter-swap")!.demo.url}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
            delay={0.9}
          />
        </Link>
      </FloatingElement>
      <FloatingElement
        depth={2}
        className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
      >
        <Link href={`${preLink}/blocks/screensaver`}>
          <HoverVideo
            thumbnail={getComp("screensaver")!.thumbnail.url}
            videoSrc={getComp("screensaver")!.demo.url}
            className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
            delay={1.1}
          />
        </Link>
      </FloatingElement>
      <FloatingElement
        depth={1}
        className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
      >
        <Link href={`${preLink}/blocks/drag-elements`}>
          <HoverVideo
            thumbnail={getComp("drag-elements")!.thumbnail.url}
            videoSrc={getComp("drag-elements")!.demo.url}
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
            delay={1.3}
          />
        </Link>
      </FloatingElement>
    </Floating>
  )
}
