import React from "react"

import SimpleMarquee from "@/fancy/components/blocks/simple-marquee"

const MarqueeItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row items-center justify-center px-8 mx-4 py-4 mt-4 bg-muted rounded-lg">
    {children}
  </div>
)

export default function SimpleMarqueeDemo() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <SimpleMarquee
        className=""
        baseVelocity={30}
        repeat={4}
        direction="up"
      >
        <MarqueeItem>
          <span className="text-xl font-semibold">Item 1</span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="text-xl font-semibold">Item 2</span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="text-2xl px-12 font-semibold">Item 3</span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="text-xl font-semibold">Item 4</span>
        </MarqueeItem>
        <MarqueeItem>
          <span className="text-xl font-semibold">Item 5</span>
        </MarqueeItem>
      </SimpleMarquee>
    </div>
  )
}
