"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"
import CircularCarousel, {
  CircularCarouselItem,
  type CircularCarouselRef,
} from "@/fancy/components/carousel/circular-carousel"

const carouselImages = [
  {
    id: "1",
    src: "https://cdn.cosmos.so/778d0640-d4b8-45b4-8bbe-862e759c231d?format=jpeg",
    alt: "Blurry poster",
    handle: "@murica_sujao",
    city: "Budapest, Hungary"
  },
  {
    id: "2",
    src: "https://cdn.cosmos.so/27ac2696-1f2b-498e-8d3d-11f2dd358ab9?format=jpeg",
    alt: "Abstract blurry figure",
    handle: "no data",
    city: "Tokyo, Japan"
  },
  {
    id: "3",
    src: "https://cdn.cosmos.so/c48b739d-202d-4340-ab6b-afa34f0d7142?format=jpeg",
    alt: "Long exposure photo of a person",
    handle: "@theo_fauger",
    city: "Paris, France"
  },
  {
    id: "4",
    src: "https://cdn.cosmos.so/5332f9ac-7823-4635-871d-d4b3032e1c62?format=jpeg",
    alt: "Blurry portrait photo of a person",
    handle: "no data",
    city: "New York, USA"
  },
  {
    id: "5",
    src: "https://cdn.cosmos.so/d9ed937e-7c3b-4f64-a4f3-708d639f13a1?format=jpeg",
    alt: "Long exposure shots with multiple people",
    handle: "@ljwlab",
    city: "London, UK"
  },
  {
    id: "6",
    src: "https://cdn.cosmos.so/33b43e2a-da66-42d9-a0b1-08165d80b0aa?format=jpeg",
    alt: "Close up blurry photo of a person poster",
    handle: "no data",
    city: "Berlin, Germany"
  },
  {
    id: "7",
    src: "https://cdn.cosmos.so/40342df7-2ea2-4297-add2-fe17cdc62551?format=jpeg",
    alt: "Long exposure shot of a motorcyclist",
    handle: "@lemme-holla-at-you",
    city: "Sydney, Australia"
  },
  {
    id: "8",
    src: "https://cdn.cosmos.so/ce9342ee-1b49-481b-b143-72ec12f19a59?format=jpeg",
    alt: "Long exposure shot of a person",
    handle: "no data",
    city: "Cape Town, South Africa"
  },
  {
    id: "9",
    src: "https://cdn.cosmos.so/826fd6f5-f9ec-4109-a5a6-3c137962a120?format=jpeg",
    alt: "Artwork",
    handle: "@weareajnadesign",
    city: "Moscow, Russia"
  },
  {
    id: "10",
    src: "https://cdn.cosmos.so/53134561-4917-42a6-abee-a03d2303e3b6?format=jpeg",
    alt: "Long exposure shot of people",
    handle: "@64mag",
    city: "Toronto, Canada"
  },
  {
    id: "11",
    src: "https://cdn.cosmos.so/3805990a-46ef-4d70-8b77-43fb67b74840?format=jpeg",
    alt: "Blurry photo",
    handle: "@samuelburgessjohnson",
    city: "Beijing, China"
  },
  {
    id: "12",
    src: "https://cdn.cosmos.so/ca346107-04c8-4241-85e6-f26c8b64c85c?format=jpeg",
    alt: "Blurry shot of a person",
    handle: "no data",
    city: "Rome, Italy"
  },
//   {
//     id: "13",
//     src: "https://cdn.cosmos.so/0b222964-1f15-4fb4-ac41-34ead2e0e807?format=jpeg",
//     alt: "Gradient artwork with a person",
//     handle: "@serifa",
//     city: "Madrid, Spain"
//   },
//   {
//     id: "14",
//     src: "https://cdn.cosmos.so/7084b9ad-1ec6-410e-9f75-d5fcd1ecd908?format=jpeg",
//     alt: "Blurry poster",
//     handle: "no data",
//     city: "Lisbon, Portugal"
//   },
//   {
//     id: "15",
//     src: "https://cdn.cosmos.so/37468f33-6a49-46e4-bbdb-7569998c9f84?format=jpeg",
//     alt: "Blurred photo of a person",
//     handle: "@willnye4",
//     city: "Vienna, Austria"
//   },
//   {
//     id: "16",
//     src: "https://cdn.cosmos.so/369966ba-acec-403b-802e-76cd9f3f840a?format=jpeg",
//     alt: "Blurred photo of a person",
//     handle: "@lemarclola",
//     city: "Prague, Czech Republic"
//   },
]

// Create the array with images mapped 3 times
const tripleCarouselItems = [
  ...carouselImages,
  ...carouselImages.map(item => ({ ...item, id: `${item.id}_2` })),
//   ...carouselImages.map(item => ({ ...item, id: `${item.id}_3` }))
]

export default function CircularCarouselContinuousFocusDemo() {
  const carouselRef = useRef<CircularCarouselRef>(null)

  return (
    <div className="w-full h-full relative bg-black flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 pl-64 -translate-x-1/2 -translate-y-1/2 text-white perspective-1000 transform-3d w-full h-full rotate-y-[65deg]">
        <CircularCarousel
          ref={carouselRef}
          keepOriginalOrientation={true}
          continuousFocus={true}
          focusOrigin={0}
          focusItemRange={30} 
          focusStyleInterpolation={[
            // {
            //   property: "scale",
            //   from: 0.25,
            //   to: 1.5,
            // },
            {
                property: "filter",
                from: "blur(30px)",
                to: "blur(0px)",
            },
            // {
            //     property: "color",
            //     from: "#fff",
            //     to: "yellow",
            // },
            {
                property: "opacity",
                from: 0.2,
                to: 1,
            },
            // {
            //   property: "translateZ",
            //   from: 0,
            //   to: 10,
            // },
          ]}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          enableDrag={true}
          dragSensitivity={0.9}
          snapOnRelease={true}
          enableMomentum={true}
          momentumDecay={0.97}
          className="-rotate-z-90 translate-x-60 scale-[65%]"
          radius={"auto"}
        >
          {tripleCarouselItems.map((item, i) => (
            <CircularCarouselItem 
              key={item.id}
              className={cn(
                "rotate-z-90 flex items-center justify-start w-[1200px] rotate-y-[-65deg] h-72"
              )}
            >
              <div className="flex items-center">
                <div className="w-[300px] h-[180px] overflow-hidden flex-shrink-0">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </div>
                {/* <p className="text-6xl font-bold cursor-grab select-none">{item.city}</p> */}
              </div>
            </CircularCarouselItem>
          ))}
        </CircularCarousel>
      </div>
    </div>
  )
}