"use client";

import Floating, { FloatingElement } from "@/fancy/components/image/floating";
import { Component } from "@/types/types";
import HoverVideo from "./hover-video";
import Link from "next/link";

export function HeroImages({ allComps }: { allComps: Component[] }) {
  const getComp = (name: string) => allComps.find((comp) => comp.name === name);
  const preLink = "/docs/components";

  return (
    <Floating sensitivity={-0.5} className="w-full h-full ">
      <FloatingElement depth={0.5} className="top-[25%] left-[5%] ">
        <Link href={`${preLink}/blocks/sticky-footer`}>
          <HoverVideo
            thumbnail={getComp("sticky-footer")!.thumbnail.url}
            videoSrc={getComp("sticky-footer")!.demo.url}
            className="w-24 h-16 md:w-32 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
            delay={0.5}
          />
        </Link>
      </FloatingElement>
      <FloatingElement depth={1} className="top-[6%] left-[11%] ">
        <Link href={`${preLink}/text/scramble-in`}>
          <HoverVideo
            thumbnail={getComp("scramble-in")!.thumbnail.url}
            videoSrc={getComp("scramble-in")!.demo.url}
            className="w-24 h-16 md:w-60 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
            delay={0.7}
          />
        </Link>
      </FloatingElement>

      <FloatingElement depth={4} className="top-[80%] left-[8%]">
        <Link href={`${preLink}/text/letter-swap`}>
          <HoverVideo
            thumbnail={getComp("letter-swap-hover")!.thumbnail.url}
            videoSrc={getComp("letter-swap-hover")!.demo.url}
            className="w-20 h-20 md:w-64 md:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
            delay={0.9}
          />
        </Link>
      </FloatingElement>
      <FloatingElement depth={2} className="top-[2%] left-[83%]">
        <Link href={`${preLink}/blocks/screensaver`}>
          <HoverVideo
            thumbnail={getComp("screensaver")!.thumbnail.url}
            videoSrc={getComp("screensaver")!.demo.url}
            className="w-32 h-28 md:w-64 md:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
            delay={1.1}
          />
        </Link>
      </FloatingElement>
      <FloatingElement depth={1} className="top-[68%] left-[83%]">
        <Link href={`${preLink}/blocks/drag-elements`}>
          <HoverVideo
            thumbnail={getComp("drag-elements")!.thumbnail.url}
            videoSrc={getComp("drag-elements")!.demo.url}
            className="w-32 h-28 md:w-80 md:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
            delay={1.3}
          />
        </Link>
      </FloatingElement>
    </Floating>
  );
}
