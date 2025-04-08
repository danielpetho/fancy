import { useState } from "react"

import AnimatedPathText from "@/fancy/components/text/text-along-path"

export default function Preview() {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  const paths = [
    "M1 254C177 219 61 -64 269 15C477 94 332 285 214 348C96 411 155 546 331 486C507 426 410 267 667 215C872.6 173.4 951.333 264.333 965 315",
    "M1 214C177 179 61 -104 269 -25C477 54 332 245 214 308C96 371 155 506 331 446C507 386 410 227 667 175C872.6 133.4 951.333 224.333 965 275",
    "M1 294C177 259 61 -24 269 55C477 134 332 325 214 388C96 451 155 586 331 526C507 466 410 307 667 255C872.6 213.4 951.333 304.333 965 355",
    "M1 174C177 139 61 -144 269 -65C477 14 332 205 214 268C96 331 155 466 331 406C507 346 410 187 667 135C872.6 93.4 951.333 184.333 965 235",
    "M1 334C177 299 61 16 269 95C477 174 332 365 214 428C96 491 155 626 331 566C507 506 410 347 667 295C872.6 253.4 951.333 344.333 965 395",
    "M1 134C177 99 61 -184 269 -105C477 -26 332 165 214 228C96 291 155 426 331 366C507 306 410 147 667 95C872.6 53.4 951.333 144.333 965 195",
    "M1 374C177 339 61 56 269 135C477 214 332 405 214 468C96 531 155 666 331 606C507 546 410 387 667 335C872.6 293.4 951.333 384.333 965 435",
    "M1 94C177 59 61 -224 269 -145C477 -66 332 125 214 188C96 251 155 386 331 326C507 266 410 107 667 55C872.6 13.4 951.333 104.333 965 155",
  ]

  // Fun text phrases for each path
  const texts = [
    "Information is expanding daily. How to get it out visually is important.",
    "The details are not the details. They make the design.",
    "There's no other product that changes function like the computer.",
    "Innovation is the outcome of a habit, not a random act.",
    "The only important thing about design is how it relates to people.",
    "Good design is obvious. Great design is transparent.",
  ]

  return (
    <div
      className="w-full h-full overflow-auto relative font-calendas"
      ref={(node) => setContainer(node)}
    >
      <div className="h-[200%] absolute top-0 left-0 w-full flex flex-col items-center mt-40 text-4xl">
        <p>SCROLL DOWN</p>
      </div>
      <div className="sticky w-full top-0  h-full flex flex-col">
        {paths.map((path, i) => (
          <AnimatedPathText
            key={`path-${i}`}
            path={path}
            // showPath
            scrollContainer={{ current: container }}
            pathId={`flowing-path-${i}`}
            svgClassName={`absolute -left-[100px] top-0 w-[calc(100%+200px)] h-full`}
            viewBox="0 0 900 600"
            text={texts[i]}
            textClassName={`text-xl font-thin font-calendas`}
            animationType="scroll"
            scrollTransformValues={[-130, 95]}
            textAnchor="start"
          />
        ))}
      </div>
    </div>
  )
}
