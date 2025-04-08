import { useEffect, useRef, useState } from "react"
import { animate, useMotionValue, useMotionValueEvent } from "motion/react"

import PixelateSvgFilter from "@/fancy/components/filter/pixelate-svg-filter"

export default function PixelateSVGFilterDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pixelSize = useMotionValue(16)
  const [size, setSize] = useState(16)
  const [isAnimating, setIsAnimating] = useState(true)

  useMotionValueEvent(pixelSize, "change", (latest) => {
    setSize(latest)
  })

  useEffect(() => {
    const controls = animate(pixelSize, 1, {
      duration: 1.2,
      ease: "easeOut",
      onComplete: () => setIsAnimating(false),
    })

    return controls.stop
  }, [])

  return (
    <div
      className="relative flex flex-col md:flex-row w-full h-full bg-background p-4 sm:p-8 md:p-12"
      ref={containerRef}
    >
      {isAnimating && (
        <PixelateSvgFilter id="pixelate-text-filter" size={size} />
      )}

      {/* Left Content */}
      <div
        className="flex-1 mb-8 md:mb-0"
        style={{
          filter: isAnimating ? "url(#pixelate-text-filter)" : undefined,
        }}
      >
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl mb-1">Ari — Yu</h1>
          <a
            href="mailto:hello@arianexus.io"
            className="text-muted-foreground text-xs sm:text-sm"
          >
            hello@ariyu.co
          </a>
        </div>

        <div className="mb-12 sm:mb-16 md:mb-24">
          <h2 className="text-base sm:text-lg font-bold">Creative Director</h2>
          <h2 className="text-base sm:text-lg font-bold">& Writer</h2>
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-sm sm:text-base font-medium mb-2">
            Selected Works
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Dreamweaver #93 Dec 2023 Starlight #87 "digital dreams" The Quantum
            Mirror Press Holograph Vol.5 crystal edition 2020 Byte Flow Vol.12
            Neural Canvas #9 Synthmagazin 11/2020 VOID 2020 zine Nebula #4 VOID
            量子 + Wave zines Binary Pulse volume 7 Cyber Cascade
            (self-published)
          </p>
        </div>
      </div>

      {/* Right Content - Image */}
      <div className="hidden md:block md:w-36 md:h-36 relative mx-auto md:mr-12">
        <img
          className="w-full h-full object-cover absolute inset-0"
          src={
            "https://images.unsplash.com/photo-1729009704569-474ddd86ed3a?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          style={{
            filter: isAnimating ? "url(#pixelate-text-filter)" : undefined,
          }}
        />
      </div>
    </div>
  )
}
