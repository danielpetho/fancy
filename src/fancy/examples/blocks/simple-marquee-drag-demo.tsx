import React, { useState } from "react"
import { motion } from "motion/react"

import SimpleMarquee from "@/fancy/components/blocks/simple-marquee"
import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal"

const imgs = [
  "https://cdn.cosmos.so/97fd931c-28cc-480f-91a8-cffb635cf832?format=jpeg",
  "https://cdn.cosmos.so/305a25f2-cc53-4ff3-95a5-6a5ca1517ff8?format=jpeg",
  "https://cdn.cosmos.so/2a024234-6713-41b2-a2f2-1d5e385ac490?format=jpeg",
  "https://cdn.cosmos.so/89cc65c1-b0bf-42f6-9afc-4db6678ae652?format=jpeg",
  "https://cdn.cosmos.so/211e0ca7-4126-4222-9de8-03aeb1e4688e?format=jpeg",
  "https://cdn.cosmos.so/b7dc0ec1-4b03-42ce-9805-1964d0f49feb?format=jpeg",
  "https://cdn.cosmos.so/43be3f32-bd6e-4fd1-93c8-d54e0d8196ee?format=jpeg",
  "https://cdn.cosmos.so/d0d146aa-b49c-48be-8b09-6b7eaf8e836d?format=jpeg",
  "https://cdn.cosmos.so/e765d51f-8be7-4618-83e2-90c13379b366?format=jpeg",
  "https://cdn.cosmos.so/c1854fe0-e974-4cb6-8bc4-ffcf1686b9e7?format=jpeg",
]

const firstRow = imgs.slice(0, 5)
const secondRow = imgs.slice(5)

const MarqueeItem = ({
  children,
  index,
}: {
  children: React.ReactNode
  index: number
}) => (
  <motion.div
    className="mx-2 sm:mx-3 md:mx-4 border-neutral-600 p-2 sm:p-3 md:p-4 shadow shadow-white/20 flex justify-center items-center flex-col perspective-near transform-3d rotate-y-45 rotate-z-12 bg-black"
    initial={{ opacity: 0, y: 0, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + 0.1 * index }}
    style={{
      transform: `translateZ(-150px) rotate(${index * 15}deg)`,
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </motion.div>
)

export default function SimpleMarqueeDemo() {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  return (
    <div
      className="flex w-full h-full relative justify-center items-center flex-col bg-black overflow-y-auto overflow-x-hidden"
      ref={(node) => setContainer(node)}
    >
      <h1 className="absolute text-center text-3xl sm:text-5xl md:text-6xl top-32 sm:top-1/4 text-white font-calendas">
        <VerticalCutReveal splitBy="characters" staggerDuration={0.04}>
          New Arrivals
        </VerticalCutReveal>
      </h1>
      <div className="absolute h-full top-1/5 sm:top-2/4 w-full justify-center items-center flex flex-col space-y-2 sm:space-y-3 md:space-y-4 z-0">
        <SimpleMarquee
          className="w-full z-10 relative"
          baseVelocity={8}
          repeat={2}
          draggable={true}
          dragSensitivity={0.08}
          useScrollVelocity={true}
          scrollAwareDirection={true}
          scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          scrollContainer={{ current: container }}
          dragAwareDirection={true}
          grabCursor
          direction="left"
        >
          {firstRow.map((src, i) => (
            <MarqueeItem key={i} index={i}>
              <motion.img
                src={src}
                alt={`Image ${i + 1}`}
                draggable={false}
                className="w-32 sm:w-36 md:w-44 select-none"
              />
            </MarqueeItem>
          ))}
        </SimpleMarquee>

        <SimpleMarquee
          className="w-full z-[100] relative"
          baseVelocity={8}
          repeat={2}
          draggable={true}
          dragSensitivity={0.08}
          useScrollVelocity={true}
          scrollAwareDirection={true}
          scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          scrollContainer={{ current: container }}
          dragAwareDirection={true}
          grabCursor
          direction="right"
        >
          {secondRow.map((src, i) => (
            <MarqueeItem key={i} index={i}>
              <motion.img
                src={src}
                alt={`Image ${i + 6}`}
                draggable={false}
                className="w-32 sm:w-36 md:w-44 select-none"
              />
            </MarqueeItem>
          ))}
        </SimpleMarquee>
      </div>
    </div>
  )
}
