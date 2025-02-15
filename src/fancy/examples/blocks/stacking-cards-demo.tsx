"use client"

import { useRef } from "react"
import Image from "next/image"
import clsx from "clsx"
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react"

interface CardProps {
  bgColor: string
  index: number
  progress: MotionValue<number>
  rangeScale: number[]
  scaleTo: number
  title: string
  description: string
  image: string
}

const cards = [
  {
    bgColor: "bg-primaryOrange",
    title: "The Guiding Light",
    description:
      "Lighthouses have stood as beacons of hope for centuries, guiding sailors safely through treacherous waters. Their glowing light and towering presence serve as a reminder of humanity’s connection to the sea.",
    image:
      "https://plus.unsplash.com/premium_vector-1739262161806-d954eb02427c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
  },
  {
    bgColor: "bg-primaryBlue",
    title: "Life Beneath the Waves",
    description:
      "From shimmering schools of fish to solitary hunters, the ocean is home to an incredible variety of marine life. Each species plays a vital role in maintaining the balance of underwater ecosystems.",
    image:
      "https://plus.unsplash.com/premium_vector-1739200616200-69a138d91627?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
  },
  {
    bgColor: "bg-primaryRed",
    title: "Alone on the Open Sea",
    description:
      "Drifting across the endless horizon, traveling alone on the sea is a test of courage and resilience. With nothing but the waves and the sky, solitude becomes both a challenge and a source of deep reflection.",
    image:
      "https://plus.unsplash.com/premium_vector-1738597190290-a3b571590b9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
  },
  {
    bgColor: "bg-teal",
    title: "The Art of Sailing",
    description:
      "Harnessing the power of the wind, sailing is both a skill and an adventure. Whether racing across the waves or leisurely cruising, it’s a timeless way to explore the vast blue expanse.",
    image:
      "https://plus.unsplash.com/premium_vector-1738935247245-97940c74cced?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8cXRlOUpsdkd3dG98fGVufDB8fHx8fA%3D%3D",
  },
  {
    bgColor: "bg-primaryBlue",
    title: "The Era of Whaling",
    description:
      "Once a thriving industry, whale hunting shaped economies and cultures across the world. Today, efforts to protect these majestic creatures highlight the shift toward conservation and respect for marine life.",
    image:
      "https://plus.unsplash.com/premium_vector-1738935247692-1c2f2c924fd8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjJ8cXRlOUpsdkd3dG98fGVufDB8fHx8fA%3D%3D",
  },
]

export default function StackingCardsDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("first", latest)
  })

  return (
    <div ref={containerRef} className="overflow-auto h-full bg-white">
      <div>
        <div className="py-10 max-h-[620px] h-screen sm:py-12">
          <div className="relative font-calendas h-full w-full z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center text-primaryRed whitespace-pre">
            Scroll down ↓
          </div>
        </div>
        {cards.map((card, index) => {
          const scaleTo = 1 - (cards.length - index) * 0.03
          const rangeScale = [index * (1 / cards.length), 1]
          return (
            <Card
              {...card}
              progress={scrollYProgress}
              scaleTo={scaleTo}
              rangeScale={rangeScale}
              key={index}
              index={index}
            />
          )
        })}
      </div>

      <div className="w-full h-80 relative overflow-hidden">
        <h2 className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] text-primaryRed font-calendas">
          fancy
        </h2>
      </div>
    </div>
  )
}

const Card = (props: CardProps) => {
  const {
    bgColor,
    index,
    progress,
    rangeScale,
    scaleTo,
    description,
    image,
    title,
  } = props

  const scale = useTransform(progress, rangeScale, [1, scaleTo])

  return (
    <div className="h-screen text-white max-h-[620px] w-full sticky top-0">
      <motion.div
        className={clsx(
          bgColor,
          "min-h-[80%] sm:min-h-[70%] flex-col sm:flex-row aspect-video gap-5 px-8 py-10 flex w-11/12 rounded-3xl mx-auto relative origin-top"
        )}
        style={{ top: `${5 + index * 3}%`, scale }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-bold text-2xl mb-5">{title}</h3>
          <p>{description}</p>
        </div>

        <div className="w-full sm:w-1/2 rounded-xl aspect-video relative overflow-hidden shrink-0">
          <Image src={image} alt={title} className="object-cover" fill />
        </div>
      </motion.div>
    </div>
  )
}
