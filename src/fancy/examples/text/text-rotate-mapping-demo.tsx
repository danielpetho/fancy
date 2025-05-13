"use client"

import { LayoutGroup, motion } from "motion/react"

import TextRotate from "@/fancy/components/text/text-rotate"

export default function Preview() {
  return (
    <div className="w-full h-full text-2xl sm:text-3xl md:text-5xl flex flex-col items-center justify-center font-cotham bg-background text font-normal overflow-hidden p-12 gap-12">
      <LayoutGroup>
        <motion.p
          className="flex whitespace-pre text-lg sm:text-xl md:text-5xl max-w-xl text-center"
          layout
        >
          <TextRotate
            texts={[
              "The problem isn't how to make the world more technological. It's about how to make the world more humane again.",
              "The problem isn't how to make the world more technological. It's about how to make the world more humane again.",
            ]}
            mainClassName="overflow-hidden leading-10"
            staggerFrom={"random"}
            animatePresenceMode="wait"
            splitBy="characters"
            initial={[
              { x: "120%", }, // First letter moves from right
              { y: "120%", }, // Second letter moves from bottom
              { x: "-120%" }, // Third letter moves from left
              { y: "-120%" }, // Fourth letter moves from top
            ]}
            animate={[
              { x: 0 },
              { y: 0 },
              { x: 0 },
              { y: 0 },
            ]}
            exit={[
              { x: "-120%" }, // First letter exits to left
              { y: "-120%"  }, // Second letter exits to top
              { x: "120%" }, // Third letter exits to right
              { y: "120%" }, // Fourth letter exits to bottom
            ]}
            loop
            staggerDuration={0.01}
            splitLevelClassName="overflow-hidden"
            elementLevelClassName="overflow-hidden py-[4px]"
            transition={{ ease: [0.909, 0.151, 0.153, 0.86], duration: 1. }}
            rotationInterval={6000}
          />
        </motion.p>
      </LayoutGroup>
    </div>
  )
}
