"use client"

import React, { useRef, useState } from "react"
import { AnimatePresence, motion, useAnimationFrame } from "motion/react"

import { cn } from "@/lib/utils"
import CircularCarousel, {
  type CircularCarouselRef,
} from "@/fancy/components/carousel/circular-carousel"

const carouselImages = [
  {
    id: "1",
    src: "https://cdn.cosmos.so/778d0640-d4b8-45b4-8bbe-862e759c231d?format=jpeg",
    alt: "Blurry poster",
    handle: "@murica_sujao",
  },
  {
    id: "2",
    src: "https://cdn.cosmos.so/27ac2696-1f2b-498e-8d3d-11f2dd358ab9?format=jpeg",
    alt: "Abstract blurry figure",
    handle: "no data",
  },
  {
    id: "3",
    src: "https://cdn.cosmos.so/c48b739d-202d-4340-ab6b-afa34f0d7142?format=jpeg",
    alt: "Long exposure photo of a person",
    handle: "@theo_fauger",
  },
  {
    id: "4",
    src: "https://cdn.cosmos.so/5332f9ac-7823-4635-871d-d4b3032e1c62?format=jpeg",
    alt: "Blurry portrait photo of a person",
    handle: "no data",
  },
  {
    id: "5",
    src: "https://cdn.cosmos.so/d9ed937e-7c3b-4f64-a4f3-708d639f13a1?format=jpeg",
    alt: "Long exposure shots with multiple people",
    handle: "@ljwlab",
  },
  {
    id: "6",
    src: "https://cdn.cosmos.so/33b43e2a-da66-42d9-a0b1-08165d80b0aa?format=jpeg",
    alt: "Close up blurry photo of a person poster",
    handle: "no data",
  },
  {
    id: "7",
    src: "https://cdn.cosmos.so/40342df7-2ea2-4297-add2-fe17cdc62551?format=jpeg",
    alt: "Long exposure shot of a motorcyclist",
    handle: "@lemme-holla-at-you",
  },
  {
    id: "8",
    src: "https://cdn.cosmos.so/ce9342ee-1b49-481b-b143-72ec12f19a59?format=jpeg",
    alt: "Long exposure shot of a person",
    handle: "no data",
  },
  {
    id: "9",
    src: "https://cdn.cosmos.so/826fd6f5-f9ec-4109-a5a6-3c137962a120?format=jpeg",
    alt: "Artwork",
    handle: "@weareajnadesign",
  },
  {
    id: "10",
    src: "https://cdn.cosmos.so/53134561-4917-42a6-abee-a03d2303e3b6?format=jpeg",
    alt: "Long exposure shot of people",
    handle: "@64mag",
  },
  {
    id: "11",
    src: "https://cdn.cosmos.so/3805990a-46ef-4d70-8b77-43fb67b74840?format=jpeg",
    alt: "Blurry photo",
    handle: "@samuelburgessjohnson",
  },
  {
    id: "12",
    src: "https://cdn.cosmos.so/ca346107-04c8-4241-85e6-f26c8b64c85c?format=jpeg",
    alt: "Blurry shot of a person",
    handle: "no data",
  },
  {
    id: "13",
    src: "https://cdn.cosmos.so/0b222964-1f15-4fb4-ac41-34ead2e0e807?format=jpeg",
    alt: "Gradient artwork with a person",
    handle: "@serifa",
  },
  {
    id: "14",
    src: "https://cdn.cosmos.so/7084b9ad-1ec6-410e-9f75-d5fcd1ecd908?format=jpeg",
    alt: "Blurry poster",
    handle: "no data",
  },
  {
    id: "15",
    src: "https://cdn.cosmos.so/37468f33-6a49-46e4-bbdb-7569998c9f84?format=jpeg",
    alt: "Blurred photo of a person",
    handle: "@willnye4",
  },
  {
    id: "16",
    src: "https://cdn.cosmos.so/369966ba-acec-403b-802e-76cd9f3f840a?format=jpeg",
    alt: "Blurred photo of a person",
    handle: "@lemarclola",
  },
]

function CarouselItem({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      className="w-40 h-40 rounded-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  )
}

export default function CircularCarouselMorphingDemo() {
  const carouselRef = useRef<CircularCarouselRef>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const progressCircleRef = useRef<SVGCircleElement>(null)

  const items = carouselImages.map((image, i) => (
    <CarouselItem key={image.id} src={image.src} alt={image.alt} />
  ))

  const radius = 5 // Radius for the progress circle
  const circumference = 2 * Math.PI * radius
  const strokeWidth = 2
  const svgSize = (radius + strokeWidth) * 2 + 2 // Add padding

  useAnimationFrame(() => {
    if (carouselRef.current) {
      const { progress: autoPlayProgress } =
        carouselRef.current.getAutoPlayProgress()
      const { state: autoPlayState } = carouselRef.current.getAutoplayState()
      const currentIdx = carouselRef.current.getCurrentIndex()

      setIsPaused(autoPlayState === "paused")

      if (progressCircleRef.current) {
        const strokeDashoffset = circumference * (1 - autoPlayProgress)
        progressCircleRef.current.style.strokeDashoffset = `${strokeDashoffset}`
      }

      if (currentIdx !== currentIndex) {
        setCurrentIndex(currentIdx)
      }
    }
  })

  const handleMouseEnter = () => {
    setIsHovered(true)
    carouselRef.current?.pause()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    carouselRef.current?.start()
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black">
      <div
        className="absolute top-[40%] left-1/2 -translate-x-1/2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CircularCarousel
          ref={carouselRef}
          items={items}
          transition={{
            duration: 1.2,
            ease: [0.89, 0.017, 0.205, 0.983],
          }}
          focusTargetState={{
            scaleX: 1.4,
            scaleY: 1.4,
            y: -28,
          }}
          radius={600}
          autoPlay={true}
          autoPlayInterval={3000}
          autoPlayDirection="cw"
          autoPlayPauseOnHover={true}
        />
      </div>

      <motion.div
        layout
        className="absolute bottom-40 left-1/2 -translate-x-1/2 cursor-pointer px-3 py-1.5 text-sm gap-2 bg-[#232323] text-white border border-[#333333] rounded-xl mx-auto flex items-center flex-row gap-x-2 w-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        transition={{ duration: 1, ease: [0.89, 0.017, 0.205, 0.983] }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            layoutId="handle"
            initial={{ opacity: 0, y: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 0, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: [0.89, 0.017, 0.205, 0.983] }}
            className="min-w-24 mr-6 rounded-xl"
          >
            {carouselImages[currentIndex]?.handle}
          </motion.span>
        </AnimatePresence>

        <motion.div
          className="flex items-center justify-end absolute right-2 top-1/2 -translate-y-1/2"
          transition={{ duration: 1, ease: [0.89, 0.017, 0.205, 0.983] }}
          layout
          layoutId="progress-circle"
        >
          <svg
            width={svgSize}
            height={svgSize}
            className={cn(
              "transform -rotate-90",
              isPaused ? "animate-[pulse_1s_ease-in-out_infinite]" : ""
            )}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
          >
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              className="text-white/50"
            />
            <circle
              ref={progressCircleRef}
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              className="text-white transition-none"
              style={{ strokeLinecap: "round" }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
