"use client"

import { useRef } from "react"

import TextCursorProximity from "@/fancy/components/text/text-cursor-proximity"

const styles = {
  title: {
    filter: {
      from: "blur(0px)",
      to: "blur(8px)",
    }
  },
  details: {
    filter: {
      from: "blur(0px)", 
      to: "blur(4px)",
    }
  }
}

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 shadow-lg bg-white"
      ref={containerRef}
    >
      <div className="relative min-w-[280px] max-w-[400px] sm:min-w-[350px] h-2/3 sm:h-full overflow-hidden w-full sm:w-4/5 md:w-4/5 lg:w-2/3 justify-between flex-col flex items-start shadow-lg p-4 bg-primary-blue text-white select-none">
        <div className="flex flex-col justify-center uppercase -space-y-2">
          <TextCursorProximity
            className="text-xl will-change-transform sm:text-2xl md:text-3xl lg:text-5xl font-overused-grotesk font-bold"
            styles={styles.title}
            falloff="gaussian"
            radius={100}
            containerRef={containerRef}
          >
            DIGITAL
          </TextCursorProximity>
          <TextCursorProximity
            className="text-xl will-change-transform sm:text-2xl md:text-3xl lg:text-5xl font-overused-grotesk font-bold"
            styles={styles.title}
            falloff="gaussian"
            radius={100}
            containerRef={containerRef}
          >
            WORKSHOP
          </TextCursorProximity>
        </div>

        <div className=" flex w-full justify-between font-medium">
          <div className="flex flex-col w-full leading-tight text-xs sm:text-sm md:text-sm lg:text-base ">
            <TextCursorProximity
              className="text-left"
              styles={styles.details}
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            >
              LONDON, UK ⟡ 18:30 GMT
            </TextCursorProximity>

            <TextCursorProximity
              className=" text-right"
              styles={styles.details}
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            >
              123 DIGITAL STREET, EC1A 1BB ⟶
            </TextCursorProximity>

            <TextCursorProximity
              className="text-left"
              styles={styles.details}
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            >
              +44 20 7123 4567 ⟨⟩ INFO@DIGITAL.WORK
            </TextCursorProximity>

            <TextCursorProximity
              className="text-left"
              styles={styles.details}
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            >
              @DIGITALWORKSHOP * DIGITAL.WORK®
            </TextCursorProximity>

            <TextCursorProximity
              className="text-right"
              styles={styles.details}
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            >
              RSVP REQUIRED ⌲ LIMITED SEATS
            </TextCursorProximity>
          </div>
        </div>
      </div>
    </div>
  )
}
