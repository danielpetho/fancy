"use client"

import { useRef } from "react"

import TextCursorProximity from "@/fancy/components/text/text-cursor-proximity"

const ASCII = ["✎", "✐", "✏", "✑"]

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 shadow-lg bg-white"
      ref={containerRef}
    >
      <div className="relative h-full w-full cursor-pointer overflow-hidden  justify-start items-start shadow-lg flex bg-primary-blue text-white">
        <div className="flex flex-col justify-center uppercase leading-none pt-4 pl-6">
          <TextCursorProximity
            label="DIGITAL"
            className=" text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl font-overused-grotesk"
            styles={{
              transform: {
                from: "scale(1)",
                to: "scale(1.4)",
              },
              color: { from: "#ffffff", to: "#ff87c1" },
            }}
            falloff="gaussian"
            radius={100}
            containerRef={containerRef}
          />
          <TextCursorProximity
            label="WORKSHOP"
            className="leading-none text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl font-overused-grotesk"
            styles={{
              transform: {
                from: "scale(1)",
                to: "scale(1.4)",
              },
              color: { from: "#ffffff", to: "#ff87c1" },
            }}
            falloff="gaussian"
            radius={100}
            containerRef={containerRef}
          />
        </div>

        <div className="absolute bottom-2 flex w-full justify-between px-6">
          {ASCII.map((hand, i) => (
            <span key={i} className="text-2xl opacity-80">
              {hand}
            </span>
          ))}
        </div>

        <TextCursorProximity
          className="absolute top-6 right-6 hidden sm:block text-xs "
          label="15/01/2025"
          styles={{
            transform: {
              from: "scale(1)",
              to: "scale(1.4)",
            },
            color: { from: "#ffffff", to: "#ff87c1" },
          }}
          falloff="linear"
          radius={10}
          containerRef={containerRef}
        />
      </div>
    </div>
  )
}
