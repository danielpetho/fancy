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
    type: "video",
    src: "https://cdn.cosmos.so/3fe9c8a8-b562-4090-a5ac-5bbdf655a938.mp4",
    alt: "Mountain landscape"
  },
  {
    id: "2", 
    type: "video",
    src: "https://cdn.cosmos.so/9e15ecba-a578-45fe-a530-b659e92d82a8.mp4",
    alt: "poster"
  },
  {
    id: "3",
    type: "image", 
    src: "https://cdn.cosmos.so/09d4ee6f-f08b-407f-a6db-a97eda9ae3f8?format=jpeg",
    alt: "shapes"
  },
  {
    id: "4",
    type: "image",
    src: "https://cdn.cosmos.so/27ac2696-1f2b-498e-8d3d-11f2dd358ab9?format=jpeg", 
    alt: "Desert dunes"
  },
  {
    id: "5",
    type: "image",
    src: "https://cdn.cosmos.so/53134561-4917-42a6-abee-a03d2303e3b6?format=jpeg",
    alt: "Snowy mountains"
  },
  {
    id: "6",
    type: "image",
    src: "https://cdn.cosmos.so/c1e053f1-ba4f-4259-bd3b-bbb1704ace54?format=jpeg",
    alt: "Ocean waves"
  },
  {
    id: "7",
    type: "image",
    src: "https://cdn.cosmos.so/6d557fd0-c4f2-4dac-b4a9-94b384467d40?format=jpeg",
    alt: "Autumn forest"
  },
  {
    id: "8", 
    type: "image",
    src: "https://cdn.cosmos.so/778d0640-d4b8-45b4-8bbe-862e759c231d?format=jpeg",
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
    <div className="w-full max-w-4xl h-full p-6 flex justify-items-center justify-center items-center text-muted-foreground bg-[#fefefe]">
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
            enableDrag
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
