import { useRef } from "react"

import ScrollAndSwapText from "@/fancy/components/text/scroll-and-swap-text"

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="w-full h-full rounded-lg items-center justify-center font-overusedGrotesk p-2 overflow-auto overscroll-auto text-[#E794DA] relative"
      ref={containerRef}
    >
      <div className="h-[100%] flex justify-center items-center uppercase relative">
        <p className="absolute bottom-4 left-4 font-bold text-xl">
          SCROLL SLOWLY
        </p>
        <div className="flex md:text-4xl sm:text-3xl text-lg lg:text-5xl cl:text-6xl justify-center items-center flex-col">
          <ScrollAndSwapText
            label="Every day is a journey,"
            offset={["0 0.15", "0 0.35"]}
            className="font-bold "
            containerRef={containerRef}
          />
          <ScrollAndSwapText
            label="and the journey"
            offset={["0 0.25", "0 0.45"]}
            className="font-bold "
            containerRef={containerRef}
          />
          <ScrollAndSwapText
            label=" itself is home."
            offset={["0 0.35", "0 0.55"]}
            className="font-bold"
            containerRef={containerRef}
          />
        </div>
      </div>
      <div className="h-[30%]"></div>
    </div>
  )
}
