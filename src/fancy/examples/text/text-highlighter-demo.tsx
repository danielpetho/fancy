"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

import { TextHighlighter } from "@/fancy/components/text/text-highlighter"

export default function TextHighlighterDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      autoRaf: true,
      wrapper: containerRef.current,
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="h-full w-full bg-[#fffefa] relative p-0">
      <div className="absolute bottom-0 w-full left-0 h-64 bg-gradient-to-t from-[#fffefa] from-10% via-50% via-[#fffefa]/50 to-transparent z-[1] pointer-events-auto" />

      <div
        className="h-full w-full z-10 bg-[#fffefa] overflow-scroll"
        ref={containerRef}
      >
        <div className="max-w-md mx-auto px-4 mt-40 pb-64 p-0">
          <h1 className="text-4xl font-medium mb-20 font-calendas tracking-tight">
            Typeface alphabets
          </h1>

          <div className="text leading-normal space-y-4 font-overusedGrotesk ">
            <p className="whitespace-break-spaces">
              <span className="">
                The present-day designer has a host of printing types at his
                disposal.{" "}
              </span>
              <TextHighlighter>
                Since Gutenberg first invented movable type in 1436-55
              </TextHighlighter>{" "}
              <span className="">
                hundreds of different types have been designed and cast in lead.{" "}
              </span>
              <TextHighlighter>
                The most recent technical developments
              </TextHighlighter>{" "}
              <span className="">
                with computer and photo-typesetting have once again brought new
                faces or variations of old ones on the market.
              </span>
            </p>

            <p>
              <TextHighlighter>
                The choice is up to the designer
              </TextHighlighter>{" "}
              <span className="">
                It is left to his feeling for form to use{" "}
              </span>
              <TextHighlighter>good or poor typefaces</TextHighlighter>{" "}
              <span className="">
                for his design work. In view of the limited space available, we
                shall refer here to only a few of the outstanding designs of the
                past and the 20th century which have appeared most frequently in
                publications.
              </span>
            </p>

            <p>
              <span className="">
                Knowledge of the quality of a typeface is of the greatest
                importance for the{" "}
              </span>
              <TextHighlighter>
                functional, aesthetic and psychological effect
              </TextHighlighter>{" "}
              <span className="">
                of printed matter. Again, the typographic design, i. e. the
                correct spaces between letters and words and the length and
                spacing of lines conducive to easy reading, does much to enhance
                the impression created.{" "}
              </span>
              <TextHighlighter>
                Today the field is dominated mainly by computer and
                photo-typesetting
              </TextHighlighter>{" "}
              <span className="">
                A typical characteristic of these forms of composition is the
                too narrow setting of the letters which makes reading difficult.
                The designer will be well advised to demand the normal spacing
                between letters when ordering photo-typesetting.
              </span>
            </p>

            <p>
              <TextHighlighter>By studying the classic designs</TextHighlighter>{" "}
              <span className="">of </span>
              <TextHighlighter>
                Garamond, Casion, Bodoni, Walbaum
              </TextHighlighter>{" "}
              <span className="">
                and others, the designer can learn what the timeless criteria
                are which produce a refined and artistic typeface that makes for
                ease of reading.
              </span>
            </p>

            <p>
              <span className="">The lead type designs of </span>
              <TextHighlighter>
                Berthold, Helvetica, Folio, Univers
              </TextHighlighter>{" "}
              <span className="">
                etc. produce pleasant and easily legible type areas. The
                typographic rules that apply to the roman typefaces are also
                valid for the sans serifs.
              </span>
            </p>

            <p>
              <TextHighlighter>
                The creators of these type designs
              </TextHighlighter>{" "}
              <span className="">
                were extremely intelligent artists with high creative powers.
                This is shown by the fact that for more than four centuries
                innumerable type designers have sought to create new type
                alphabets but very few of these have gained acceptance.{" "}
              </span>
              <TextHighlighter>An alphabet of Garamond</TextHighlighter>{" "}
              <span className="">
                for example, is an artistic achievement of the first order. Each
                letter has its own unmistakable face, whether lower or upper
                case, and displays the highest quality of form and originality.
                Each letter has its own personality and makes a marked impact.
              </span>
            </p>

            <p>
              <span className="">
                Every designer who is concerned with typography should take the
                trouble when creating graphic designs to{" "}
              </span>
              <TextHighlighter>
                sketch words and sentences by hand
              </TextHighlighter>{" "}
              <span className="">
                Many designers take advantage of the Letraset process, which can
                undoubtedly produce a clean draft design that is almost ready
                for press. But a feeling for good letter forms and an attractive
                typeface can be acquired only by constant and careful practice
                in sketching letters.
              </span>
            </p>

            <p>
              <TextHighlighter>
                How the forms of letters can create simultaneously both tension
                and nobility
              </TextHighlighter>{" "}
              <span className="">
                and how pleasantly legible lines of type can appear to the eye
                of the reader may be seen from the examples on the following
                pages.
              </span>
            </p>

            <p>
              <TextHighlighter>
                The Renaissance created midline typography
              </TextHighlighter>{" "}
              <span className="">
                which held its position until the 20th century.
              </span>
            </p>

            <p>
              <span className="">
                The new typography differs from the old in that it is the first
                to try to{" "}
              </span>
              <TextHighlighter>
                develop the outward appearance from the function of the text
              </TextHighlighter>
            </p>

            <p>
              <TextHighlighter>
                The new typography uses the background
              </TextHighlighter>{" "}
              <span className="">
                as an element of design which is on a par with the other
                elements.
              </span>
            </p>

            <p>
              <span className="">Earlier typography (midline typography) </span>
              <TextHighlighter>
                played an active role against a dead, passive background.
              </TextHighlighter>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
