"use client"

import { useState } from "react"
import Letter3DSwap from "@/fancy/components/text/letter-3d-swap"

export default function Preview() {
  const [debug, setDebug] = useState(false)

  const sharedProps = {
    mainClassName: "text-4xl bg-white lowercase text-primary-blue",
    frontFaceClassName: `bg-white ${debug ? 'border' : ''}`,
    secondFaceClassName: `bg-white ${debug ? 'border' : ''}`,
    paddingX: 0,
    paddingY: 0,
    staggerDuration: 0.02,
    transition: { type: "spring", damping: 25, stiffness: debug ? 50 : 160 }
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
          text="Rotate Left, Stagger First"
          rotateDirection="left"
          staggerFrom="first"
          {...sharedProps}
        />

        <Letter3DSwap 
          text="Rotate Right, Stagger Last"
          rotateDirection="right"
          staggerFrom="last"
          {...sharedProps}
        />

        <Letter3DSwap 
          text="Rotate Top, Stagger Center"
          rotateDirection="top"
          staggerFrom="center"
          {...sharedProps}
        />

        <Letter3DSwap 
          text="Rotate Bottom, Stagger Random"
          rotateDirection="bottom"
          staggerFrom="random"
          {...sharedProps}
        />
      </div>
    </div>
  )
}
