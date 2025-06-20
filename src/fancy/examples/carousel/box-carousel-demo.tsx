"use client"

import { useRef, useState, useEffect } from "react"
import { Bug, BugOff } from "lucide-react"
import BoxCarousel, { 
  type BoxCarouselRef, 
  type CarouselItem, 
} from "@/fancy/components/carousel/box-carousel"

// Sample carousel items with mix of images and videos
const carouselItems: CarouselItem[] = [
  {
    id: "1",
    type: "image",
    src: "https://cdn.cosmos.so/d9ed937e-7c3b-4f64-a4f3-708d639f13a1?format=jpeg",
    alt: "Mountain landscape"
  },
  {
    id: "2", 
    type: "image",
    src: "https://cdn.cosmos.so/b01a6010-7df8-4d89-b195-f93c940a9899?format=jpeg",
    alt: "poster"
  },
  {
    id: "3",
    type: "image", 
    src: "https://cdn.cosmos.so/42edd9ec-03d8-4b62-bcda-6203032561bd?format=jpeg",
    alt: "shapes"
  },
  {
    id: "4",
    type: "image",
    src: "https://cdn.cosmos.so/bec58067-dc30-45a1-9bd1-9a6b2b197410?format=jpeg", 
    alt: "Desert dunes"
  },
  {
    id: "5",
    type: "image",
    src: "https://cdn.cosmos.so/40342df7-2ea2-4297-add2-fe17cdc62551?format=jpeg",
    alt: "Snowy mountains"
  },
  {
    id: "6",
    type: "image",
    src: "https://cdn.cosmos.so/85e75781-4fe9-4fa6-914b-f87ddb6e9e7e?format=jpeg",
    alt: "Ocean waves"
  },
  {
    id: "7",
    type: "image",
    src: "https://cdn.cosmos.so/f0765e6a-9ec0-4891-a1fe-c6bfa071adf4?format=jpeg",
    alt: "Autumn forest"
  },
  {
    id: "8", 
    type: "image",
    src: "https://cdn.cosmos.so/599806c9-6623-4cbf-83e0-d9c8a0cf7a1a?format=jpeg",
    alt: "City skyline"
  }
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
    <div className="w-full max-w-4xl h-full p-6 flex justify-items-center justify-center items-center text-muted-foreground bg-[#efefef]">
      <button
        onClick={toggleDebug}
        className="absolute top-4 left-4 p-1.5 border border-black text-black rounded-full cursor-pointer transition-all duration-300 ease-out hover:bg-gray-100 active:scale-95"
        title={debug ? "Debug Mode: ON" : "Debug Mode: OFF"}
      >
        {debug ? (
          <Bug size={10} />
        ) : (
          <BugOff size={10} />
        )}
      </button>

      <div className="space-y-24">

        <div className="flex justify-center pt-20">
          <BoxCarousel
            ref={carouselRef}
            items={carouselItems}
            width={350}
            height={250}
            direction="right"
            onIndexChange={handleIndexChange}
            debug={debug}
            perspective={1000}
          />
        </div>


        <div className="flex gap-2 justify-center">
          <button 
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
          </button>
        </div>
      </div>
    </div>
  )
}
