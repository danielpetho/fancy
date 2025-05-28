"use client"

import { useRef, useState } from "react"

import {
  TextHighlighter,
  TextHighlighterRef,
} from "@/fancy/components/text/text-highlighter"

export default function TextHighlighterDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const highlighterRefs = useRef<TextHighlighterRef[]>([])
  const [isHighlighted, setIsHighlighted] = useState(false)

  const transition = { type: "spring", duration: 1, delay: 0, bounce: 0 }
  const highlightClass = "rounded-[0.3em] px-px"
  const highlightColor = "#F7F764"

  const handleHighlight = () => {
    highlighterRefs.current.forEach((ref) => {
      ref.animate()
    })
    setIsHighlighted(true)
  }

  const handleReset = () => {
    highlighterRefs.current.forEach((ref) => {
      ref.reset()
    })
    setIsHighlighted(false)
  }

  return (
    <div className="h-full w-full bg-[#fefefe] relative p-0">
      <div
        className="h-full w-full z-10 bg-[#fefefe] overflow-scroll"
        ref={containerRef}
      >
        <div className="max-w-5xl mx-auto px-12 mt-20 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
            <div className="space-y-2">
              <p>
                The present-day designer has a host of printing types at his
                disposal. Since{" "}
                <TextHighlighter
                  ref={(el) => {
                    if (el) highlighterRefs.current.push(el)
                  }}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                >
                  Gutenberg
                </TextHighlighter>{" "}
                first invented movable type in 1436-55 hundreds of different
                types have been designed and cast in lead. The{" "}
                <TextHighlighter
                  ref={(el) => {
                    if (el) highlighterRefs.current.push(el)
                  }}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                >
                  most recent technical developments
                </TextHighlighter>{" "}
                with computer and photo-typesetting have once again brought new
                faces or variations of old ones on the market.
              </p>
            </div>

            <div className="space-y-2">
              <p>
                Knowledge of the quality of a typeface is of the greatest
                importance for the{" "}
                <TextHighlighter
                  ref={(el) => {
                    if (el) highlighterRefs.current.push(el)
                  }}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                >
                  functional, aesthetic and psychological effect
                </TextHighlighter>{" "}
                of printed matter. Again, the typographic design, i.e. the
                correct spaces between letters and words and the length and
                spacing of lines conducive to easy reading, does much to enhance
                the impression created.
              </p>
            </div>

            <div className="space-y-2">
              <p>
                By studying the classic designs of{" "}
                <TextHighlighter
                  ref={(el) => {
                    if (el) highlighterRefs.current.push(el)
                  }}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                >
                  Garamond, Caslon, Bodoni, Walbaum
                </TextHighlighter>{" "}
                and others, the designer can learn what the timeless criteria
                are which produce a refined and artistic typeface that makes for
                ease of reading.
              </p>
            </div>

            <div className="space-y-2">
              <p>
                The lead type designs of{" "}
                <TextHighlighter
                  ref={(el) => {
                    if (el) highlighterRefs.current.push(el)
                  }}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                >
                  Berthold, Helvetica, Folio, Univers
                </TextHighlighter>{" "}
                etc. produce pleasant and easily legible type areas. The
                typographic rules that apply to the roman typefaces are also
                valid for the sans serifs.
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <TextHighlighter
                  ref={(el) => {
                    if (el) highlighterRefs.current.push(el)
                  }}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                >
                  The creators of these type designs
                </TextHighlighter>{" "}
                were extremely intelligent artists with high creative powers.
                This is shown by the fact that for more than four centuries
                innumerable type designers have sought to create new type
                alphabets but very few of these have gained acceptance. An{" "}
                <TextHighlighter
                  ref={(el) => {
                    if (el) highlighterRefs.current.push(el)
                  }}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                >
                  alphabet of Garamond
                </TextHighlighter>{" "}
                for example, is an artistic achievement of the first order.
              </p>
            </div>

            <div className="space-y-2">
              <p>
                Every designer who is concerned with typography should take the
                trouble when creating graphic designs to{" "}
                <TextHighlighter
                  ref={(el) => {
                    if (el) highlighterRefs.current.push(el)
                  }}
                  triggerType="ref"
                  className={highlightClass}
                  transition={transition}
                  highlightColor={highlightColor}
                >
                  sketch words and sentences by hand
                </TextHighlighter>
                . Many designers take advantage of the Letraset process, which
                can undoubtedly produce a clean draft design that is almost
                ready for press.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 flex gap-4">
        <button
          onClick={isHighlighted ? handleReset : handleHighlight}
          className="text-black border border-border px-3 py-1.5 rounded-md bg-transparent text-xs backdrop-blur-lg cursor-pointer hover:bg-muted"
        >
          {isHighlighted ? "Reset" : "Highlight"}
        </button>
      </div>
    </div>
  )
}
