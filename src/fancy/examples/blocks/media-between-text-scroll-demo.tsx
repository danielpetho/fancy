import React from "react"

import MediaBetweenText from "@/fancy/components/blocks/media-between-text"

const elements = [
    {src: "https://cdn.cosmos.so/53454cbe-a4ec-4782-923f-a82d70e12645.mp4", left: "Tim", right: "Rodenböker", url: "https://www.instagram.com/tim_rodenbroeker/"},
    {src: "https://cdn.cosmos.so/499ddb3b-57cf-4c07-996c-f797fadf64ab.mp4", left: "Simon ", right: "Alexander-Adams", url: "https://www.instagram.com/polyhop/"},
    {src: "https://cdn.cosmos.so/444e4a2a-45a6-477f-b342-6b6bc9a7c53b.mp4", left: "Andreion", right: "de Castro", url: "https://www.instagram.com/andreiongd/"},
    {src: "https://cdn.cosmos.so/f533f1a8-9f67-4360-b395-7abc8594cac9.mp4", left: "Lorraine", right: "Li", url: "https://www.instagram.com/lorrr.l/"},
]

export default function MediaBetweenTextScrollDemo() {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <div
      className="w-full h-full items-center justify-center bg-background overflow-auto"
      ref={ref}
    >
      <div className="h-full relative w-full flex">
      <h3 className="text-8xl tracking-wide absolute bottom-12 left-12 w-64">today's inspo</h3>
      <p className="right-12 bottom-12 absolute">Scroll down ↓</p>

      </div>

      <div className="h-full w-full flex flex-col space-y-12 mt-24 justify-center items-center text-6xl px-6">
        {elements.map((element, index) => (
            <a href={element.url} target="_blank" rel="noreferrer">
              <MediaBetweenText
                key={index}
                firstWord={element.left}
                secondWord={element.right}
                mediaUrl={element.src}
                mediaType="video"
                triggerType="inView"
                useInViewOptionsProp={{ once: false, amount: 1, root: ref, margin: "-5% 0px -0% 0px" }}
                containerRef={ref}
                mediaContainerClassName="w-full h-[80px] overflow-hidden mx-3 mt-4"
                className="cursor-pointer text-4xl font-light flex flex-row items-center justify-center"
                cursorAnimationVariants={{
                  initial: { width: 0 },
                  animate: {
                    width: "80px",
                    transition: { duration: 0.4, type: "spring", bounce: 0 },
                  },
                }}
              />
            </a>
        ))}
      </div>
    </div>
  )
}
