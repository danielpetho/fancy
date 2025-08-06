"use client"

import { useRef } from "react"

import VariableFontCursorProximity from "@/fancy/components/text/variable-font-cursor-proximity"

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="w-full h-full rounded-lg items-center justify-center font-overused-grotesk p-8 sm:p-16 md:p-20 lg:p-24 bg-white cursor-pointer relative overflow-hidden"
      ref={containerRef}
    >
      <div className="w-full h-full items-center justify-center grid text-justify">
        <VariableFontCursorProximity
          className="leading-tight text-xs sm:text-sm md:text-base lg:text-lg text-primary-red -m-4 p-2"
          fromFontVariationSettings="'wght' 400, 'slnt' 0"
          toFontVariationSettings="'wght' 900, 'slnt' -10"
          falloff="exponential"
          radius={70}
          containerRef={containerRef}
        >
          {`Modern typography is based primarily on the theories and principles of design evolved in the 20's and 30's of our century. It was Mallarmé and Rimbaud in the 19th century and Apollinaire in the early 20th century who paved the way to a new understanding of the possibilities inherent in typography and who, released from conventional prejudices and fetters, created through their experiments the basis for the pioneer achievements of the theoreticians and practitioners that followed. Walter Dexel, El Lissitzky, Kurt Schwitters, Jan Tschichold, Paul Renner, Moholy-Nagy, Joost Schmidt etc. breathed new life into an unduly rigid typography. In his book "Die neue Typografie" (1928) J. Tschichold formulated the rules of an up-to-date and objective typography which met the needs of the age.`}
        </VariableFontCursorProximity>
      </div>
    </div>
  )
}
