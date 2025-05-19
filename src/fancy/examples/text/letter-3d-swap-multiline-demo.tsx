"use client"

import { useState } from "react"

import Letter3DSwap from "@/fancy/components/text/letter-3d-swap"

export default function Preview() {

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-white gap-8">
      <div className="flex flex-col items-center gap-8 max-w-2xl font-cotham gap-y-18">
        <Letter3DSwap
          rotateDirection="right"
          staggerFrom="random"
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 100,
          }}
          mainClassName="text-4xl bg-white lowercase text-primary-blue"
          frontFaceClassName="bg-white"
          secondFaceClassName="bg-white"
          staggerDuration={0.005}
        >
          In the depths of code. Where logic flows like streams. Bugs dance in
          shadows. While developers dream
        </Letter3DSwap>
      </div>
    </div>
  )
}
