"use client"

import { useState } from "react"
import Letter3DSwap from "@/fancy/components/text/letter-3d-swap"

export default function Preview() {
  const [debug, setDebug] = useState(false)
  const sharedProps = {
    mainClassName: "text-4xl bg-white lowercase text-primary-blue",
    frontFaceClassName: `bg-white ${debug ? 'border' : ''}`,
    secondFaceClassName: `bg-white ${debug ? 'border' : ''}`,
    staggerDuration: 0.02,
    transition: { type: "spring" as const, damping: 25, stiffness: debug ? 50 : 160 }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-white gap-8">
      <button
        className="absolute top-4 left-4 px-2 py-1 bg-white text-black rounded-md border text-[8px] cursor-pointer hover:bg-muted"
        onClick={() => setDebug(!debug)}
      >
        Debug: {debug ? "On" : "Off"}
      </button>

      <div className="flex flex-col items-center gap-8 max-w-2xl font-cotham gap-y-18">
        <Letter3DSwap 
          rotateDirection="left"
          staggerFrom="first"
          {...sharedProps}
        >
          Rotate Left, Stagger First
        </Letter3DSwap>

        <Letter3DSwap 
          rotateDirection="right"
          staggerFrom="last"
          {...sharedProps}
        >
          Rotate Right, Stagger Last
        </Letter3DSwap>

        <Letter3DSwap 
          rotateDirection="top"
          staggerFrom="center"
          {...sharedProps}
        >
          Rotate Top, Stagger Center
        </Letter3DSwap>

        <Letter3DSwap 
          rotateDirection="bottom"
          staggerFrom="random"
          {...sharedProps}
        >
          Rotate Bottom, Stagger Random
        </Letter3DSwap>
      </div>
    </div>
  )
}
