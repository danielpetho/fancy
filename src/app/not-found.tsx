"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "motion/react"

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
        <h1 className="text-3xl md:text-6xl font-overused-grotesk ">
          page not found
        </h1>

        <button
          className="text-sm sm:text-base md:text-lg tracking-tight text-white bg-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg md:rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 ease-out"
        >
          <Link href="/docs/introduction">
            Back to docs <span className="font-serif ml-1">→</span>
          </Link>
        </button>
      </div>

      {[...Array(12)].map((_, i) => (
        <Screensaver
          key={i}
          speed={1}
          startPosition={{ x:  10 + i * 1, y: 10 + i * 1 }} // Offset each element's starting position slightly
          startAngle={215} // Keep same angle for all elements
          containerRef={containerRef}
         
        >
          <span
            className="text-[160px] sm:text-[200px] md:text-[240px] lg:text-[300px] font-bold text-black [-webkit-text-stroke-width:2px] sm:[-webkit-text-stroke-width:2.5px] md:[-webkit-text-stroke-width:3px]  lg:[-webkit-text-stroke-width:4px] [-webkit-text-stroke-color:white] align-text-top"
          >
            404
          </span>
        </Screensaver>
      ))}
    </div>
  )
}
