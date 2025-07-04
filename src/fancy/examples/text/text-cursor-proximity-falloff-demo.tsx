"use client"

import { useRef } from "react"

import TextCursorProximity from "@/fancy/components/text/text-cursor-proximity"

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="w-full h-full rounded-lg items-center justify-center font-overused-grotesk p-8 sm:p-16 md:p-20 lg:p-24 bg-white cursor-pointer relative overflow-hidden"
      ref={containerRef}
    >
      {/* this is the important stuff */}
      <div className="w-full h-full items-center justify-center grid text-justify">
        <TextCursorProximity
          className="leading-tight text-primary-blue text-pretty"
          styles={{
            opacity: { from: 0.1, to: 1 },
          }}
          falloff="linear"
          radius={80}
          containerRef={containerRef}
        >
          Just as every problem is novel and different from others. so the grid
          must be conceived afresh every time so as to meet requirements. This
          means that the designer must approach each new problem with an open
          mind and must seek to solve it by analysing it objectively. The
          difficulties of the task are due to the enormous differences in the
          demands made on the designer by the various assignments he receives. A
          small newspaper advertisement does not present the difficulties of
          designing, say, a daily paper with 10 and more columns. a great
          variety of subjects, and an additional advertising section. Such a
          task calls not only for designing talent but also organizing ability
          since the many constantly changing items of information have to be
          arranged in a logical order and their priorities reflected in
          appropriate typography.
        </TextCursorProximity>
      </div>
    </div>
  )
}
