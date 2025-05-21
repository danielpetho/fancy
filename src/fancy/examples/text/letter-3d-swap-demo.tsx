"use client"

import { useState } from "react"
import Letter3DSwap from "@/fancy/components/text/letter-3d-swap"

export default function Preview() {
  const [debug, setDebug] = useState(false)

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-background">
      {/* <button
        className="absolute top-4 left-4 px-2 py-1 bg-background text-foreground rounded-md border text-[8px] cursor-pointer hover:bg-muted"
        onClick={() => setDebug(!debug)}
      >
        Debug: {debug ? "On" : "Off"}
      </button> */}
      <div className="flex flex-col items-center max-w-2xl font-cotham">
        <Letter3DSwap 
          mainClassName="text-2xl sm:text-5xl md:text-7xl bg-background lowercase"
          frontFaceClassName={`bg-background ${debug ? 'border' : ''} text-foreground`}
          secondFaceClassName={`bg-background ${debug ? 'border' : ''} text-foreground`}
          rotateDirection="top"
          staggerDuration={0.03}
          staggerFrom="first"
          transition={{ type: "spring", damping: 25, stiffness: debug ? 50 : 160 }}
        >
          SET YOUR MIND TO IT
        </Letter3DSwap>
      </div>
    </div>
  )
}
