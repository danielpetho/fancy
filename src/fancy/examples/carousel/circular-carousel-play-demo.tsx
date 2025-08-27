"use client"

import React, { useRef, useState } from "react"
import { motion, useAnimationFrame } from "motion/react"

import CircularCarousel, {
  type CircularCarouselRef,
} from "@/fancy/components/carousel/circular-carousel"

const albumImages = [
  "https://cdn.cosmos.so/97fd931c-28cc-480f-91a8-cffb635cf832?format=jpeg",
  "https://cdn.cosmos.so/305a25f2-cc53-4ff3-95a5-6a5ca1517ff8?format=jpeg",
  "https://cdn.cosmos.so/2a024234-6713-41b2-a2f2-1d5e385ac490?format=jpeg",
  "https://cdn.cosmos.so/89cc65c1-b0bf-42f6-9afc-4db6678ae652?format=jpeg",
  "https://cdn.cosmos.so/211e0ca7-4126-4222-9de8-03aeb1e4688e?format=jpeg",
  "https://cdn.cosmos.so/b7dc0ec1-4b03-42ce-9805-1964d0f49feb?format=jpeg",
  "https://cdn.cosmos.so/43be3f32-bd6e-4fd1-93c8-d54e0d8196ee?format=jpeg",
  "https://cdn.cosmos.so/d0d146aa-b49c-48be-8b09-6b7eaf8e836d?format=jpeg",
  "https://cdn.cosmos.so/e765d51f-8be7-4618-83e2-90c13379b366?format=jpeg",
  "https://cdn.cosmos.so/c1854fe0-e974-4cb6-8bc4-ffcf1686b9e7?format=jpeg",
]

const records = [
  {
    album: "Untitled",
    price: "$25.99",
    tracks: "8 tracks",
    condition: "VG+",
    year: "1998",
  },
  {
    album: "Untitled",
    price: "$32.50",
    tracks: "6 tracks",
    condition: "M",
    year: "2003",
  },
  {
    album: "Untitled",
    price: "$18.75",
    tracks: "12 tracks",
    condition: "VG",
    year: "1995",
  },
  {
    album: "Untitled",
    price: "$45.00",
    tracks: "4 tracks",
    condition: "NM",
    year: "2007",
  },
  {
    album: "Untitled",
    price: "$22.99",
    tracks: "10 tracks",
    condition: "VG+",
    year: "2001",
  },
  {
    album: "Untitled",
    price: "$38.25",
    tracks: "7 tracks",
    condition: "M",
    year: "2005",
  },
  {
    album: "Untitled",
    price: "$28.50",
    tracks: "9 tracks",
    condition: "VG+",
    year: "1999",
  },
  {
    album: "Untitled",
    price: "$55.00",
    tracks: "5 tracks",
    condition: "NM",
    year: "2009",
  },
  {
    album: "Untitled",
    price: "$19.99",
    tracks: "11 tracks",
    condition: "VG",
    year: "1997",
  },
  {
    album: "Untitled",
    price: "$42.75",
    tracks: "6 tracks",
    condition: "M",
    year: "2006",
  },
]

function AlbumCover({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      className="w-36 h-36 rounded-full overflow-hidden border-2 border-white/20 shadow-lg cursor-pointer"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover select-none"
        draggable={false}
      />
    </motion.div>
  )
}

export default function CircularCarouselPlayDemo() {
  const carouselRef = useRef<CircularCarouselRef>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const items = albumImages.map((image, i) => (
    <AlbumCover key={i} src={image} alt={`Album ${i + 1}`} />
  ))

  useAnimationFrame(() => {
    if (carouselRef.current) {
      const currentIdx = carouselRef.current.getCurrentIndex()
      if (currentIdx !== currentIndex) {
        setCurrentIndex(currentIdx)
      }
    }
  })

  return (
    <div className="w-full h-full flex items-center justify-start bg-black text-white overflow-hidden relative">
      {/* Carousel positioned to show only right half */}
      <div className="absolute -left-1/3 top-1/2 -translate-y-1/2">
        <CircularCarousel
          ref={carouselRef}
          items={items}
          radius={300}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          focusTargetState={{
            scale: 1.3,
            x: 30,
          }}
          containerClassName="rotate-90"
          itemClassName="-rotate-90"
          enableWheelNav={true}
          enableKeyboardNav={true}
          keepOriginalOrientation={true}
          keyboardNavDirection="vertical"
          wheelAxis="y"
          wheelDebounce={150}
          enableDrag={false}
          dragSensitivity={1.2}
          snapOnRelease={true}
          enableMomentum={true}
          focusedOnTop={true}
          staggerDelay={0.01}
          goToOnClick={true}
        />
      </div>

      {/* Title on the right side */}
      <div className="absolute right-32 flex flex-col items-center justify-center top-1/2 -translate-y-1/2  font-overused-grotesk font-medium text-2xl h-full">
        <div className="text-left space-y-1 w-64 pt-16">
          <p className="">Unknown Artist </p>
          <div className="text-left">
            <span className="">{records[currentIndex].album}</span>
          </div>
          <div className="text-left space-y-1 pt-2 whitespace-pre">
            <div className="">{records[currentIndex].year} • {records[currentIndex].condition} • {records[currentIndex].tracks} </div>
            <div className="">{records[currentIndex].price}</div>
          </div>
          <div className="flex space-x-12 pt-6">
            <a
              href="#"
              className="underline  hover:opacity-80 transition-colors"
            >
              BUY
            </a>
            <a
              href="#"
              className="underline  hover:opacity-80 transition-colors"
            >
              WANT
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
