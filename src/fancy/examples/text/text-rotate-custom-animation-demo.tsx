"use client"

import TextRotate from "@/fancy/components/text/text-rotate"

export default function Preview() {
  return (
    <div className="w-full h-full text-2xl sm:text-3xl md:text-5xl flex flex-col items-center justify-center font-cotham text font-normal overflow-hidden p-12 gap-12 bg-white text-black">
      <TextRotate
        texts={[
          "The problem isn't how to make the world more technological. It's about how to make the world more humane again.",
          "When you use other people's software you live in somebody else's dream.",
        ]}
        mainClassName=" md:leading-10 flex whitespace-pre text-lg sm:text-xl md:text-5xl max-w-xl text-center"
        staggerFrom={"random"}
        animatePresenceMode="wait"
        splitBy="characters"
        initial={[
          { filter: "blur(20px)", opacity: 0 },
        ]}
        animate={[
          { filter: "blur(0px)", opacity: 1 },
        ]}
        exit={[
          { filter: "blur(20px)", opacity: 0 },
        ]}
        loop
        staggerDuration={0.01}
        splitLevelClassName=""
        elementLevelClassName="md:py-[4px]"
        transition={{ ease: [0.909, 0.151, 0.153, 0.86], duration: 1 }}
        rotationInterval={4000}
      />
    </div>
  )
}
