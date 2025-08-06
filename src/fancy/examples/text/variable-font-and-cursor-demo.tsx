"use client"

import { useRef } from "react"

import { useMousePosition } from "@/hooks/use-mouse-position"
import VariableFontAndCursor from "@/fancy/components/text/variable-font-and-cursor"

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { x, y } = useMousePosition(containerRef)

  return (
    <div
      className="w-full h-full rounded-lg items-center justify-center font-overused-grotesk p-24 bg-background relative cursor-none overflow-hidden"
      ref={containerRef}
    >
      {/* this is the important stuff */}
      <div className="w-full h-full items-center justify-center flex">
        <VariableFontAndCursor
          className="text-5xl sm:text-7xl md:text-9xl text-primary-orange"
          fontVariationMapping={{
            y: { name: "wght", min: 100, max: 900 },
            x: { name: "slnt", min: 0, max: -10 },
          }}
          containerRef={containerRef}
        >
          fancy!
        </VariableFontAndCursor>
      </div>

      {/* this is just fluff for the demo */}

      <div className="absolute bottom-8 left-8 flex flex-col font-azeret-mono">
        <span className="text-xs text-foreground/60 tabular-nums">
          x: {Math.round(x)}
        </span>
        <span className="text-xs text-foreground/60 tabular-nums">
          y: {Math.round(y)}
        </span>
      </div>

      <div
        className="absolute w-px h-screen bg-foreground/20 dark:bg-foreground top-0 -translate-x-1/2"
        style={{
          left: `${x}px`,
        }}
      />
      <div
        className="absolute w-screen h-px bg-foreground/20 dark:bg-foreground left-0 -translate-y-1/2"
        style={{
          top: `${y}px`,
        }}
      />
      <div
        className="absolute w-2 h-2 bg-primary-orange -translate-x-1/2 -translate-y-1/2 rounded-xs"
        style={{
          top: `${y}px`,
          left: `${x}px`,
        }}
      />
    </div>
  )
}
