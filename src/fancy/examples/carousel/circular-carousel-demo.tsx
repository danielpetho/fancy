"use client"

import { useRef } from "react"

import CircularCarousel, {
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

  const items = cityNames.map((text, i) => (
    <p className="text-xs font-bold cursor-pointer select-none">{text}</p>
  ))

  return (
    <div className="w-full h-full relative">
      <div className="absolute -top-[92px] left-0 -translate-x-1/2 text-black/40">
        <CircularCarousel
          ref={carouselRef}
          items={items}
          keepOriginalOrientation={true}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          focusTargetState={{
            x: 20,
            color: "#000",
          }}
          autoPlay={true}
          autoPlayInterval={1000}
          staggerDelay={0.0}
          containerClassName="rotate-90"
          itemClassName="-rotate-90 flex items-center justify-start w-40"
          radius={360}
        />
        <div className="absolute rounded-full top-[calc(50%-5px)] left-[calc(100%-132px)]  flex items-center text-2xl justify-center w-2 h-2 bg-black "></div>
      </div>
    </div>
  )
}
