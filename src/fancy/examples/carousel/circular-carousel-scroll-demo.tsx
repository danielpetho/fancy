"use client"

import React, { useRef } from "react"
import { motion, useAnimationFrame } from "motion/react"

import CircularCarousel, {
  type CircularCarouselRef,
} from "@/fancy/components/carousel/circular-carousel"

const carouselImages = [
  {
    id: "1",
    src: "https://cdn.cosmos.so/778d0640-d4b8-45b4-8bbe-862e759c231d?format=jpeg",
    alt: "Blurry poster",
  },
  {
    id: "2",
    src: "https://cdn.cosmos.so/27ac2696-1f2b-498e-8d3d-11f2dd358ab9?format=jpeg",
    alt: "Abstract blurry figure",
  },
  {
    id: "3",
    src: "https://cdn.cosmos.so/c48b739d-202d-4340-ab6b-afa34f0d7142?format=jpeg",
    alt: "Long exposure photo of a person",
  },
  {
    id: "4",
    src: "https://cdn.cosmos.so/5332f9ac-7823-4635-871d-d4b3032e1c62?format=jpeg",
    alt: "Blurry portrait photo of a person",
  },
  {
    id: "5",
    src: "https://cdn.cosmos.so/d9ed937e-7c3b-4f64-a4f3-708d639f13a1?format=jpeg",
    alt: "Long exposure shots with multiple people",
  },
  {
    id: "6",
    src: "https://cdn.cosmos.so/33b43e2a-da66-42d9-a0b1-08165d80b0aa?format=jpeg",
    alt: "Close up blurry photo of a person poster",
  },
  {
    id: "7",
    src: "https://cdn.cosmos.so/40342df7-2ea2-4297-add2-fe17cdc62551?format=jpeg",
    alt: "Long exposure shot of a motorcyclist",
  },
  {
    id: "8",
    src: "https://cdn.cosmos.so/ce9342ee-1b49-481b-b143-72ec12f19a59?format=jpeg",
    alt: "Long exposure shot of a person",
  },
  {
    id: "9",
    src: "https://cdn.cosmos.so/826fd6f5-f9ec-4109-a5a6-3c137962a120?format=jpeg",
    alt: "Artwork",
  },
  {
    id: "10",
    src: "https://cdn.cosmos.so/53134561-4917-42a6-abee-a03d2303e3b6?format=jpeg",
    alt: "Long exposure shot of people",
  },
  {
    id: "11",
    src: "https://cdn.cosmos.so/3805990a-46ef-4d70-8b77-43fb67b74840?format=jpeg",
    alt: "Blurry photo",
  },
  {
    id: "12",
    src: "https://cdn.cosmos.so/ca346107-04c8-4241-85e6-f26c8b64c85c?format=jpeg",
    alt: "Blurry shot of a person",
  },
  {
    id: "13",
    src: "https://cdn.cosmos.so/0b222964-1f15-4fb4-ac41-34ead2e0e807?format=jpeg",
    alt: "Gradient artwork with a person",
  },
  {
    id: "14",
    src: "https://cdn.cosmos.so/7084b9ad-1ec6-410e-9f75-d5fcd1ecd908?format=jpeg",
    alt: "Blurry poster",
  },
  {
    id: "15",
    src: "https://cdn.cosmos.so/37468f33-6a49-46e4-bbdb-7569998c9f84?format=jpeg",
    alt: "Blurred photo of a person",
  },
  {
    id: "16",
    src: "https://cdn.cosmos.so/369966ba-acec-403b-802e-76cd9f3f840a?format=jpeg",
    alt: "Blurred photo of a person",
  },
]

function CarouselItem({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div 
      className="w-28 h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-110 transition-all duration-400 ease-out"
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  )
}

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.4,
    },
  },
}

const carouselVariants = {
  hidden: { 
    opacity: 0, 
    filter: "blur(8px)", 
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.07,
      delayChildren: 1,
      delay: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    scale: 1,
    filter: "blur(4px)",
    y: 0,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    rotateY: 0,
    transition: {
      duration: 1.5,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    filter: "blur(4px)", 
    y: 20 
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const gradientVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

export default function CircularCarouselDemo() {
  const carouselRef = useRef<CircularCarouselRef>(null)
  
  // Progress tracking refs for smooth animations without re-renders
  const progressBarRef = useRef<HTMLDivElement>(null)
  const progressCircleRef = useRef<SVGCircleElement>(null)
  const timeDisplayRef = useRef<HTMLSpanElement>(null)

  const items = carouselImages.map((image, i) => (
    <CarouselItem key={image.id} src={image.src} alt={image.alt} />
  ))

  // Use Motion's animation frame hook for progress tracking
  useAnimationFrame(() => {
    if (carouselRef.current) {
      const { progress, remainingTime } = carouselRef.current.getAutoPlayProgress()

      console.log(remainingTime)
      
      // Update progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`
      }
      
      // Update circular progress
      if (progressCircleRef.current) {
        const circumference = 2 * Math.PI * 12
        const strokeDashoffset = circumference * (1 - progress)
        progressCircleRef.current.style.strokeDashoffset = `${strokeDashoffset}`
      }
      
      // Update time display
      if (timeDisplayRef.current) {
        const seconds = Math.ceil(remainingTime / 1000)
        timeDisplayRef.current.textContent = `${seconds}s`
      }
    }
  })

  return (
    <motion.div 
      className="w-full h-full relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Carousel with fade/blur-in animation */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(50%-20px)]"
        variants={carouselVariants}
      >
        <CircularCarousel
          ref={carouselRef}
          items={items}
          keepOriginalOrientation={true}
          transition={{
            duration: 1.5,
            ease: [0.89, 0.017, 0.205, 0.983],
          }}
          //enableScroll={true}
          //scrollSensitivity={2}
          //staggerDelay={0.07}
          //radius={360}
          radius={300}
          autoPlay={true}
          autoPlayInterval={3000}
          autoPlayDirection="ccw"
          autoPlayPauseOnHover={true}
        />
      </motion.div>
      
      {/* Text with staggered fade/blur-in animation */}
      <motion.div 
        className="absolute top-[calc(50%+6rem)] left-1/2 -translate-x-1/2 flex flex-col items-center leading-tight"
        variants={textVariants}
      >
        <p className="text-2xl font uppercase">IMAGINARY STUDIO<sup>©</sup></p>
        <p className="text-2xl font uppercase">SELECTED WORKS<sup className="text-sm font-normal">(16)</sup> — 2025</p>
      </motion.div>
      
      {/* Progress indicators */}
      <motion.div 
        className="absolute top-16 left-4 right-4 flex items-center justify-between"
        variants={textVariants}
      >
        {/* Linear progress bar */}
        <div className="flex-1 mr-4">
          <div className="bg-black/10 rounded-full h-1 overflow-hidden">
            <div 
              ref={progressBarRef}
              className="bg-black h-full transition-none"
              style={{ width: '0%' }}
            />
          </div>
          <div className="text-xs text-black/60 mt-1">
            Next in <span ref={timeDisplayRef}>3s</span>
          </div>
        </div>
        
        {/* Circular progress indicator */}
        <div className="relative">
          <svg className="w-8 h-8 transform -rotate-90">
            <circle
              cx="16"
              cy="16"
              r="12"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-black/10"
            />
            <circle
              ref={progressCircleRef}
              cx="16"
              cy="16"
              r="12"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 12}`}
              strokeDashoffset={`${2 * Math.PI * 12}`}
              className="text-black transition-none"
              style={{ strokeLinecap: 'round' }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Gradient overlay with fade-in animation */}
      <motion.div 
        className="absolute h-12 bg-gradient-to-b from-transparent to-white/90 w-full bottom-0"
        variants={gradientVariants}
      />
    </motion.div>
  )
}
