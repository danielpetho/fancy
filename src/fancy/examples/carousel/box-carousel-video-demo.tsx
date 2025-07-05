"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import BoxCarousel, {
  type BoxCarouselRef,
  type CarouselItem,
} from "@/fancy/components/carousel/box-carousel"
import useScreenSize from "@/hooks/use-screen-size"

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
    src: "https://cdn.cosmos.so/594e87df-e8ca-4d03-8137-f78b5dab6793.mp4",
    alt: "@studio.size",
  },
  {
    id: "3",
    type: "image",
    src: "https://cdn.cosmos.so/92162e2e-abf6-4b98-a557-bfe25a336608?format=jpeg",
    alt: "@david_wise",
  },
  {
    id: "4",
    type: "video",
    src: "https://cdn.cosmos.so/aae0a1e6-d03d-43ae-aa7f-21627a950730.mp4",
    alt: "@svenvranjes",
  },
  {
    id: "5",
    type: "image",
    src: "https://cdn.cosmos.so/7a5f1a73-ca73-466b-afaf-2b3d0639aa1a?format=jpeg",
    alt: "@deconstructie",
  },
]

export default function BoxCarouselDemo() {
  const carouselRef = useRef<BoxCarouselRef>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const screenSize = useScreenSize()

  // Responsive dimensions based on screen size
  const getCarouselDimensions = () => {
    if (screenSize.lessThan("md")) {
      return { width: 200, height: 150 }
    }
    return { width: 350, height: 250 }
  }

  const { width, height } = getCarouselDimensions()

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="w-full max-w-4xl h-full p-6 flex justify-items-center justify-center items-center text-muted-foreground bg-[#fefefe]">


      <div className="space-y-20">
        <div className="flex justify-center">
          <BoxCarousel
            ref={carouselRef}
            items={carouselItems}
            width={width}
            height={height}
            direction="right"
            onIndexChange={handleIndexChange}
            enableDrag
            perspective={1000}
          />
        </div>

        <div className="flex gap-2 justify-center w-full items-start">
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
        </div>
      </div>
    </div>
  )
}
