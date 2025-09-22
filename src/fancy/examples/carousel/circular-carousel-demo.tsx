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
  "New Delhi, India",
]

export default function CircularCarouselDemo() {
  const carouselRef = useRef<CircularCarouselRef>(null)

  return (
    <div className="w-full h-full relative bg-black">
      <div className="absolute -top-[92px] left-0 -translate-x-1/2 ">
        <CircularCarousel
          ref={carouselRef}
          keepOriginalOrientation={true}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          // focusStyleTargetState={{
          //   x: 10,
          //   color: "#000",
          // }}
          //autoPlay={true}
          focusOrigin={0}
          focusItemRange={1}
          continuousFocus={true}
          focusStyleInterpolation={[
            {
              property: "color",
              from: "#777",
              to: "#fff",
            },
            {
              property: "fontWeight",
              from: "normal",
              to: "bold",
            },
            {
              property: "x",
              from: 0,
              to: 4,
            }
          ]}
          autoPlayInterval={1000}
          autoPlayDirection="ccw"
          staggerDelay={0.0}
          className="rotate-90"
          radius={360}
        >
          {cityNames.map((text, i) => (
            <CircularCarouselItem key={i} className="-rotate-90 flex items-center justify-start w-40">
              <p className="text-xs font-bold cursor-pointer select-none">{text}</p>
            </CircularCarouselItem>
          ))}
        </CircularCarousel>
        <div className="absolute rounded-full top-[calc(50%-5px)] left-[calc(100%-132px)]  flex items-center text-2xl justify-center w-2 h-2 bg-red-500 "></div>
      </div>
    </div>
  )
}
