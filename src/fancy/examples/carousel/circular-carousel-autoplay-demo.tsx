"use client"

import { useRef, useState } from "react"

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
    <div className="w-28 h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-110 transition-all duration-400 ease-out">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

export default function CircularCarouselDemo() {
  const carouselRef = useRef<CircularCarouselRef>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const items = carouselImages.map((image, i) => (
    <CarouselItem key={image.id} src={image.src} alt={image.alt} />
  ))

  const handleNext = () => {
    carouselRef.current?.next()
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    carouselRef.current?.prev()
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleGoTo = (index: number) => {
    carouselRef.current?.goTo(index)
    setCurrentIndex(index)
  }

  return (
    <div className="w-full h-full relative ">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(50%-20px)]">
        <CircularCarousel
          ref={carouselRef}
          items={items}
          keepOriginalOrientation={true}
          transition={{
            duration: 1.5,
            ease: [0.89, 0.017, 0.205, 0.983],
          }}
          autoPlay={true}
          autoPlayInterval={2500}
          staggerDelay={0.07}
          radius={360}
        />
      </div>
      <div className="absolute top-[calc(50%+6rem)] left-1/2 -translate-x-1/2 flex flex-col items-center leading-tight">
        <p className="text-2xl font uppercase">IMAGINARY STUDIO<sup>*</sup></p>
        <p className="text-2xl font uppercase">SELECTED WORKS<sup className="text-sm font-normal">(16)</sup>—2025</p>
      </div>
      <div className="absolute h-12 bg-gradient-to-b from-transparent to-white/90 w-full bottom-0"></div>
    </div>
  )
}
