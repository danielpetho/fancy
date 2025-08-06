"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"
import VariableFontCursorProximity from "@/fancy/components/text/variable-font-cursor-proximity"

const texts = ["Overstimulated", "Underutilized", "Familiar", "Extraordinary"]

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="w-full h-full rounded-lg items-center justify-center font-overused-grotesk bg-primary-red cursor-pointer relative overflow-hidden"
      ref={containerRef}
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white">
        {texts.map((text, i) => (
          <VariableFontCursorProximity
            key={i}
            className={cn("text-4xl md:text-6xl lg:text-7xl leading-none")}
            fromFontVariationSettings="'wght' 400, 'slnt' 0"
            toFontVariationSettings="'wght' 900, 'slnt' -10"
            radius={200}
            containerRef={containerRef}
          >
            {text}
          </VariableFontCursorProximity>
        ))}
      </div>
    </div>
  )
}
