"use client"

import { useRef, useState } from "react"

import Letter3DSwapLocal from "@/fancy/components/text/letter-3d-swap-local"

export default function Preview() {
  const [debug, setDebug] = useState(false)

  const sharedProps = {
    mainClassName: "text-5xl bg-black text-white font-[900] pl-3",
    frontFaceClassName: `bg-black text-white ${debug ? "border" : ""}`,
    secondFaceClassName: `bg-black text-white ${debug ? "border" : ""}`,
    staggerDuration: 0.02,
    transition: { type: "spring", damping: 15, stiffness: 100 },
  }

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-black gap-8"
      ref={containerRef}
    >


      <div className="flex flex-col items-center max-w-2xl font-cotham">
        <Letter3DSwapLocal
          containerRef={containerRef}
          text="ZEILENDURCHSCHUSS ZEILENDURCHSCHUSS ZEILENDURCHSCHUSS ZEILENDURCHSCHUSS ZEILENDURCHSCHUSS ZEILENDURCHSCHUSS ZEILENDURCHSCHUSS"
          rotateDirection="right"
          staggerFrom="first"
          {...sharedProps}
        />
      </div>
    </div>
  )
}
