"use client"

import { useRef } from "react"

import CircularCarousel, {
  CircularCarouselItem,
  type CircularCarouselRef,
} from "@/fancy/components/carousel/circular-carousel"

// 100+ random city names with country
const cityNames = [
  "Budapest, Hungary",
  "Tokyo, Japan",
  "Paris, France",
  "New York, USA",
  "London, UK",
  "Berlin, Germany",
  "Sydney, Australia",
  "Cape Town, South Africa",
  "Moscow, Russia",
  "Toronto, Canada",
  "Beijing, China",
  "Rome, Italy",
  "Madrid, Spain",
  "Lisbon, Portugal",
  "Vienna, Austria",
  "Prague, Czech Republic",
  "Warsaw, Poland",
  "Istanbul, Turkey",
  "Athens, Greece",
  "Copenhagen, Denmark",
  "Stockholm, Sweden",
  "Oslo, Norway",
  "Helsinki, Finland",
  "Dublin, Ireland",
  "Brussels, Belgium",
  "Zurich, Switzerland",
  "Amsterdam, Netherlands",
  "Edinburgh, UK",
  "Venice, Italy",
  "Munich, Germany",
  "Barcelona, Spain",
  "Seoul, South Korea",
  "Bangkok, Thailand",
  "Singapore, Singapore",
  "Kuala Lumpur, Malaysia",
  "Jakarta, Indonesia",
  "Manila, Philippines",
  "Hanoi, Vietnam",
  "Nairobi, Kenya",
  "Lagos, Nigeria",
  "Buenos Aires, Argentina",
  "Santiago, Chile",
  "Bogotá, Colombia",
  "Caracas, Venezuela",
  "Mexico City, Mexico",
  "San Francisco, USA",
  "Los Angeles, USA",
  "Chicago, USA",
  "Miami, USA",
  "Boston, USA",
  "Montreal, Canada",
  "Vancouver, Canada",
  "Calgary, Canada",
  "Auckland, New Zealand",
  "Brisbane, Australia",
  "Melbourne, Australia",
  "Perth, Australia",
  "Tallinn, Estonia",
  "Riga, Latvia",
  "Vilnius, Lithuania",
  "Krakow, Poland",
  "Belgrade, Serbia",
  "Sofia, Bulgaria",
  "Bucharest, Romania",
  "Reykjavik, Iceland",
  "Tallinn, Estonia",
  "Kiev, Ukraine",
  "Minsk, Belarus",
  "Tbilisi, Georgia",
  "Jerusalem, Israel",
  "New Delhi, India",
]

export default function CircularCarouselDemo() {
  const carouselRef = useRef<CircularCarouselRef>(null)

  return (
    <div className="w-full h-full relative bg-white">
      <div className="absolute top-1/2 left-1/2 pl-16 -translate-x-1/2 -translate-y-1/2 text-blue perspective-1000 transform-style-preserve-3d border w-full h-full">
        <CircularCarousel
          ref={carouselRef}
          keepOriginalOrientation={true}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          // focusTargetState={{
          //   x: -100,
          //   color: "#0055ff",
          // }}

          enableDrag={true}
          //goToOnClick={true}
          //momentumDecay={0.8}
          //autoPlay={true}
          autoPlayInterval={1000}
          autoPlayDirection="ccw"
          dragSensitivity={0.6}
          momentumDecay={0.9}
          // staggerDelay={0.01}
          className="-rotate-z-90 scale-[65%] rotate-y-[35deg]"
          radius={"auto"}
        >
          {cityNames.map((text, i) => (
            <CircularCarouselItem key={i} className="rotate-90 flex items-center justify-start w-64">
              <p className="text-base font-bold cursor-grab select-none">{text}</p>
            </CircularCarouselItem>
          ))}
        </CircularCarousel>
        {/* <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center text-2xl justify-center w-4 h-4 bg-blue"></div> */}
      </div>
    </div>
  )
}
