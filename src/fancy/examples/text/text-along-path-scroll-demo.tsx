import { useEffect, useRef, useState } from "react"
import type { LenisRef } from "lenis/react"
import { ReactLenis } from "lenis/react"
import { cancelFrame, frame } from "motion/react"

import AnimatedPathText from "@/fancy/components/text/text-along-path"

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<LenisRef>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])

  const paths = [
    "M1 248C214 -47 582 158 679 -39",
    "M1 208C214 -87 582 118 679 -79",
    "M1 168C214 -127 582 78 679 -119",
  ]

  const texts = [
    `PARIS • LONDON • BERLIN • ROME • BARCELONA • MADRID • VIENNA • PRAGUE • AMSTERDAM • STOCKHOLM • ATHENS • LISBON • WARSAW • BUDAPEST • COPENHAGEN • OSLO • HELSINKI • MILAN • MUNICH • PARIS • LONDON • BERLIN • ROME • BARCELONA • MADRID • VIENNA • PRAGUE • AMSTERDAM • STOCKHOLM • ATHENS • LISBON • WARSAW`,
    `BUDAPEST • COPENHAGEN • OSLO • HELSINKI • MILAN • MUNICH • VENICE • MADRID • VIENNA • PRAGUE • AMSTERDAM • STOCKHOLM • ATHENS • LISBON • BUDAPEST • COPENHAGEN • OSLO • HELSINKI • MILAN • MUNICH • VENICE • MADRID • VIENNA • PRAGUE • AMSTERDAM • STOCKHOLM • ATHENS • LISBON`,
    `PARIS • BERLIN • ROME • BARCELONA • MADRID • VIENNA • PRAGUE • AMSTERDAM • STOCKHOLM • ATHENS • LISBON • WARSAW • BUDAPEST • COPENHAGEN • PARIS • BERLIN • ROME • BARCELONA • MADRID • VIENNA • PRAGUE • AMSTERDAM • STOCKHOLM • ATHENS • LISBON • WARSAW • BUDAPEST • COPENHAGEN`,
  ]

  return (
    <div className="w-full h-full overflow-auto relative " ref={containerRef}>
      <div className="absolute top-32 left-0 w-full flex flex-col">
        <div className="text-center text-5xl font-thin flex flex-row justify-center text-primaryRed">
          EUROPE • 2025
        </div>
      </div>
      <div className="absolute w-full h-[200%] flex flex-col">
        {paths.map((path, i) => (
          <AnimatedPathText
            key={`path-${i}`}
            path={path}
            scrollContainer={containerRef}
            pathId={`flowing-path-${i}`}
            svgClassName={`absolute -left-[100px] top-0 w-[calc(100%+200px)] h-full`}
            viewBox="0 0 680 270"
            text={texts[i]}
            textClassName={`text-lg font-overusedGrotesk font-thin text-primaryRed`}
            animationType="scroll"
            scrollTransformValues={[-180 + i * 10, 10 + i * 5]}
            textAnchor="start"
          />
        ))}
        <div className="absolute bottom-0 left-0 w-full bg-primaryRed text-white py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif text-center mb-4">
              EUROPE TOUR X LIVE MUSIC
            </h2>

            <div className="grid grid-cols-3 text-center">
              <div className="flex flex-col">
                <span className="text-xl">ACME by ACME</span>
                <span className="text-xl mt-auto">EVERY SUNDAY</span>
              </div>

              <div className="flex flex-col">
                <span className="text-xl">
                  FROM AUGUST 15<sup>TH</sup>, 2025
                </span>
                <span className="text-xl mt-2">
                  TIL DECEMBER 15<sup>TH</sup>, 2025
                </span>
                <span className="text-xl mt-2">
                  CHECK YOUR LOCAL SITE
                </span>
                <span className="text-xl mt-auto">SUPPORTED by ACME</span>
              </div>

              <div className="flex flex-col">
                <span className="text-xl">LIVE MUSIC</span>
                <span className="text-xl mt-auto">at 7PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
