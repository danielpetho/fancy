import React, { useRef } from "react"

import AnimatedPathText from "@/fancy/components/text/text-along-path"

export default function TextAlongPathAutoDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  const paths = [
    "M1 248C214 -47 582 158 679 -39",
    "M1 208C214 -87 582 118 679 -79",
    "M1 168C214 -127 582 78 679 -119",
  ]

  const texts = [
    `PARIS • LONDON • BERLIN • ROME • BARCELONA • MADRID • VIENNA • PRAGUE • AMSTERDAM • STOCKHOLM`,
    `BUDAPEST • COPENHAGEN • OSLO • HELSINKI • MILAN • MUNICH • VENICE • MADRID • VIENNA • PRAGUE`,
    `PARIS • BERLIN • ROME • BARCELONA • MADRID • VIENNA • PRAGUE • AMSTERDAM`,
  ]

  return (
    <div
      className="w-full h-full overflow-hidden relative bg-white"
      ref={containerRef}
    >
      <div className="absolute w-full h-full flex flex-col">
        {paths.map((path, i) => (
          <AnimatedPathText
            key={`auto-path-${i}`}
            path={path}
            pathId={`auto-path-${i}`}
            svgClassName={`absolute -left-[100px] top-1/3 w-[calc(100%+200px)] h-full`}
            viewBox="0 0 680 250"
            text={texts[i]}
            textClassName={`text font-thin text-gray-800`}
            animationType="auto"
            duration={i * 0.5 + 5}
            textAnchor="start"
          />
        ))}
      </div>
    </div>
  )
}
