"use client"

import { useEffect, useRef, useState } from "react"
import { Bug, BugOff } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import BoxCarousel, {
  type BoxCarouselRef,
  type CarouselItem,
} from "@/fancy/components/carousel/box-carousel"

// Sample carousel items with mix of images and videos
const carouselItems: CarouselItem[] = [
  {
    id: "1",
    type: "video",
    src: "https://cdn.cosmos.so/3fe9c8a8-b562-4090-a5ac-5bbdf655a938.mp4",
    alt: "@portalsandpaths",
  },
  {
    id: "2",
    type: "video",
    src: "https://cdn.cosmos.so/9e15ecba-a578-45fe-a530-b659e92d82a8.mp4",
    alt: "@demo.festival",
  },
  {
    id: "3",
    type: "video",
    src: "https://cdn.cosmos.so/e80b1973-3f23-452d-966c-77dcb54ce59c.mp4",
    alt: "@are.na",
  },
  {
    id: "4",
    type: "video",
    src: "https://cdn.cosmos.so/594e87df-e8ca-4d03-8137-f78b5dab6793.mp4",
    alt: "@studio.size",
  },
  {
    id: "5",
    type: "image",
    src: "https://cdn.cosmos.so/53134561-4917-42a6-abee-a03d2303e3b6?format=jpeg",
    alt: "Snowy mountains",
  },
  {
    id: "6",
    type: "image",
    src: "https://cdn.cosmos.so/c1e053f1-ba4f-4259-bd3b-bbb1704ace54?format=jpeg",
    alt: "Ocean waves",
  },
  {
    id: "7",
    type: "image",
    src: "https://cdn.cosmos.so/6d557fd0-c4f2-4dac-b4a9-94b384467d40?format=jpeg",
    alt: "Autumn forest",
  },
  {
    id: "8",
    type: "image",
    src: "https://cdn.cosmos.so/778d0640-d4b8-45b4-8bbe-862e759c231d?format=jpeg",
    alt: "City skyline",
  },
]

export default function BoxCarouselDemo() {
  const carouselRef = useRef<BoxCarouselRef>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [debug, setDebug] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleNext = () => {
    carouselRef.current?.next()
  }

  const handlePrev = () => {
    carouselRef.current?.prev()
  }

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleDebug = () => {
    setDebug(!debug)
  }

  return (
    <div className="w-full max-w-4xl h-full p-6 flex justify-items-center justify-center items-center text-muted-foreground bg-[#fefefe]">
      {/* <button
        onClick={toggleDebug}
        className="absolute top-4 left-4 p-1.5 border border-black text-black rounded-full cursor-pointer transition-all duration-300 ease-out hover:bg-gray-100 active:scale-95"
        title={debug ? "Debug Mode: ON" : "Debug Mode: OFF"}
      >
        {debug ? <Bug size={10} /> : <BugOff size={10} />}
      </button> */}

      <div className="space-y-20">
        <div className="flex justify-center">
          <BoxCarousel
            ref={carouselRef}
            items={carouselItems}
            width={350}
            height={250}
            direction="right"
            onIndexChange={handleIndexChange}
            debug={debug}
            enableDrag
            transition={{ duration: 0.8, ease: [0.953, 0.001, 0.019, 0.995] }}
            perspective={1000}
          />
        </div>

        <div className="flex gap-2 justify-center w-full items-start">
          {/* <motion.div
            className="px-3 py-1.5 text-sm w-autp bg-gray-200 text-black rounded-xl"
            layout
            transition={{ duration: 0.5, ease: "easeOut" }}

          > */}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={currentIndex}
                layoutId="id"
                layout
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="px-3 py-1.5 text-sm w-autp bg-gray-200 text-black rounded-xl"
              >
                {carouselItems[currentIndex]?.alt}
              </motion.span>
            </AnimatePresence>
          {/* </motion.div> */}
          {/* <button 
            onClick={handlePrev}
            className="px-2 py-0.5 text-xs border border-black text-black rounded-full cursor-pointer transition-all duration-300 ease-out hover:bg-gray-100 active:scale-95"
          >
            Prev
          </button>
          <button 
            onClick={handleNext}
            className="px-2 py-0.5 text-xs border border-black text-black rounded-full cursor-pointer transition-all duration-300 ease-out hover:bg-gray-100 active:scale-95"
          >
            Next
          </button> */}
        </div>
      </div>
    </div>
  )
}
