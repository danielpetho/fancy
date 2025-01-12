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

  // Safely get component data with null checks
  const stickyFooter = getComp("sticky-footer");
  const scrambleIn = getComp("scramble-in");
  const letterSwap = getComp("letter-swap");
  const screensaver = getComp("screensaver");
  const dragElements = getComp("drag-elements");
  const breathingText = getComp("breathing-text");
  const textRotate = getComp("text-rotate");
  const pixelTrail = getComp("pixel-trail");
  const elasticLine = getComp("elastic-line");
  const gravity = getComp("gravity");
  const typewriter = getComp("typewriter");

  if (!stickyFooter || !scrambleIn || !letterSwap || !screensaver || !dragElements || !breathingText || !textRotate || !pixelTrail || !elasticLine || !gravity || !typewriter) {
    console.error("One or more required components not found");
    return null;
  }

  return (
    <Floating sensitivity={-0.5} className="h-full">
      <FloatingElement
        depth={0.5}
        className="top-[15%] left-[2%] md:top-[25%] md:left-[5%] "
      >
        <Link href={`${preLink}/blocks/sticky-footer`}>
          <HoverVideo
            thumbnail={stickyFooter.thumbnail.url}
            videoSrc={stickyFooter.demo.url}
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
            thumbnail={scrambleIn.thumbnail.url}
            videoSrc={scrambleIn.demo.url}
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
            thumbnail={letterSwap.thumbnail.url}
            videoSrc={letterSwap.demo.url}
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
            thumbnail={screensaver.thumbnail.url}
            videoSrc={screensaver.demo.url}
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
            thumbnail={dragElements.thumbnail.url}
            videoSrc={dragElements.demo.url}
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
            delay={1.3}
          />
        </Link>
      </FloatingElement>
      {/* <FloatingElement
        depth={3}
        className="top-[2%] left-[2%] md:top-[-2%] md:left-[2%]"
      >
        <Link href={`${preLink}/text/breathing-text`}>
          <HoverVideo
            thumbnail={breathingText.thumbnail.url}
            videoSrc={breathingText.demo.url}
            className="w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 lg:w-56 lg:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl rotate-[5deg]"
            delay={1.5}
          />
        </Link>
      </FloatingElement>
      <FloatingElement
        depth={2}
        className="top-[0%] left-[65%] md:top-[-5%] md:left-[70%]"
      >
        <Link href={`${preLink}/text/text-rotate`}>
          <HoverVideo
            thumbnail={textRotate.thumbnail.url}
            videoSrc={textRotate.demo.url}
            className="w-36 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36 lg:w-60 lg:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl -rotate-[3deg]"
            delay={1.7}
          />
        </Link>
      </FloatingElement>
      <FloatingElement
        depth={4.5}
        className="top-[92%] left-[30%] md:top-[95%] md:left-[25%]"
      >
        <Link href={`${preLink}/text/pixel-trail`}>
          <HoverVideo
            thumbnail={pixelTrail.thumbnail.url}
            videoSrc={pixelTrail.demo.url}
            className="w-32 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32 lg:w-56 lg:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl rotate-[2deg]"
            delay={1.9}
          />
        </Link>
      </FloatingElement>
      <FloatingElement
        depth={3}
        className="top-[88%] left-[65%] md:top-[88%] md:left-[70%]"
      >
        <Link href={`${preLink}/text/elastic-line`}>
          <HoverVideo
            thumbnail={elasticLine.thumbnail.url}
            videoSrc={elasticLine.demo.url}
            className="w-36 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36 lg:w-60 lg:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl -rotate-[4deg]"
            delay={2.1}
          />
        </Link>
      </FloatingElement>
      <FloatingElement
        depth={5}
        className="top-[45%] left-[92%] md:top-[50%] md:left-[92%]"
      >
        <Link href={`${preLink}/text/gravity`}>
          <HoverVideo
            thumbnail={gravity.thumbnail.url}
            videoSrc={gravity.demo.url}
            className="w-32 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32 lg:w-56 lg:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl rotate-[6deg]"
            delay={2.3}
          />
        </Link>
      </FloatingElement>
      <FloatingElement
        depth={2}
        className="top-[45%] left-[-5%] md:top-[50%] md:left-[-5%]"
      >
        <Link href={`${preLink}/text/typewriter`}>
          <HoverVideo
            thumbnail={typewriter.thumbnail.url}
            videoSrc={typewriter.demo.url}
            className="w-36 h-24 sm:w-44 sm:h-32 md:w-52 md:h-36 lg:w-60 lg:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl -rotate-[2deg]"
            delay={2.5}
          />
        </Link>
      </FloatingElement> */}
    </Floating>
  )
}
