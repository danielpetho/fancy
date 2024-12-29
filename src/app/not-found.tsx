"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import Screensaver from "@/fancy/components/blocks/screensaver"

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="w-screen px-12 h-screen bg-background overflow-hidden flex items-center justify-center relative"
      ref={containerRef}
    >
      <div className="flex flex-col items-center justify-center z-30 space-y-8">
        <h1 className="text-3xl md:text-6xl font-overusedGrotesk">
          page not found
        </h1>

        <motion.button
          className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-white bg-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-2xl font-calendas"
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", damping: 30, stiffness: 400 },
          }}
        >
          <Link href="/docs/introduction">
            Back to docs <span className="font-serif ml-1">→</span>
          </Link>
        </motion.button>
      </div>

      {[
        { speed: 1.2, pos: [-40, 60], angle: 35, color: "bg-[#ffd726]" },
        { speed: 1.8, pos: [85, -45], angle: -65, color: "bg-orange-500" },
        { speed: 1.5, pos: [-60, -30], angle: 85, color: "bg-[#ff5941]" },
        { speed: 1.2, pos: [25, 70], angle: -20, color: "bg-[#1f464d]" },
        { speed: 1.8, pos: [15, 65], angle: -80, color: "bg-[#ff5941]" },
        { speed: 1.5, pos: [15, -50], angle: 15, color: "bg-[#1f464d]" },
        { speed: 1.3, pos: [-20, 40], angle: 55, color: "bg-[#ffd726]" },
        { speed: 1.4, pos: [70, -25], angle: -40, color: "bg-[#0015ff]" },
        { speed: 1.6, pos: [-45, -55], angle: 70, color: "bg-[#E794DA] " },
        { speed: 1.9, pos: [40, 85], angle: -30, color: "bg-[#0015ff]" },
        { speed: 1.4, pos: [80, 75], angle: -60, color: "bg-[#E794DA]" },
        { speed: 1.6, pos: [5, -35], angle: 25, color: "bg-orange-500" },
      ].map(({ speed, pos, angle, color }, i) => (
        <Screensaver
          key={i}
          speed={speed}
          startPosition={{ x: pos[0], y: pos[1] }}
          startAngle={angle}
          containerRef={containerRef}
        >
          <div
            className={cn(
              "px-8 sm:px-12 md:px-16 lg:px-20 py-2 sm:py-3 md:py-4 lg:py-5 rounded-xl shadow-2xl text-white",
              color
            )}
            style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}
          >
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black">
              404
            </span>
          </div>
        </Screensaver>
      ))}
    </div>
  )
}
