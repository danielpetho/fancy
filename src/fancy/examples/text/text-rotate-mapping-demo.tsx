"use client"

import TextRotate from "@/fancy/components/text/text-rotate"

export default function Preview() {
  return (
    <div className="w-full h-full text-2xl sm:text-3xl md:text-5xl flex flex-col items-center justify-center font-cotham text font-normal overflow-hidden p-12 gap-12 bg-white text-black">
      <TextRotate
        texts={[
          "The problem isn't how to make the world more technological. It's about how to make the world more humane again.",
          "The problem isn't how to make the world more technological. It's about how to make the world more humane again.",
        ]}
        mainClassName="overflow-hidden md:leading-10 flex whitespace-pre text-lg sm:text-xl md:text-5xl max-w-xl text-center"
        staggerFrom={"random"}
        animatePresenceMode="wait"
        splitBy="characters"
        initial={[{ x: "120%" }, { y: "120%" }, { x: "-120%" }, { y: "-120%" }]}
        animate={[{ x: 0 }, { y: 0 }, { x: 0 }, { y: 0 }]}
        exit={[{ x: "-120%" }, { y: "-120%" }, { x: "120%" }, { y: "120%" }]}
        loop
        staggerDuration={0.01}
        splitLevelClassName="overflow-hidden"
        elementLevelClassName="overflow-hidden md:py-[4px]"
        transition={{ ease: [0.909, 0.151, 0.153, 0.86], duration: 1 }}
        rotationInterval={4000}
      />
    </div>
  )
}
