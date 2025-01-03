import { use, useRef } from "react"
import { useScroll } from "motion/react"

import TextRotate, { TextRotateRef } from "@/fancy/components/text/text-rotate"

import { exampleImages } from "../_helpers/exampleImages"

function Item({ index, image }: { index: number; image: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  })

  return (
    <section
      ref={ref}
      key={index + 1}
      className="h-full w-full flex justify-start pl-24 items-center snap-center"
    >
      <div className="w-64 h-64">
        <img
          src={image}
          alt={`Example ${index + 2}`}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}

export default function Preview() {
  const textRotateRef = useRef<TextRotateRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full h-full overflow-auto absolute snap-y snap-mandatory">
      <div className="sticky inset-0 h-full w-full flex items-center pr-24">
        <TextRotate
          ref={textRotateRef}
          texts={[
            "This is the first text",
            "this is the 2nd",
            "we're at third!",
            "4th! keep going",
            "5th.",
            "this is the end.",
          ]}
          mainClassName="text-3xl w-full justify-end flex"
          staggerFrom={"first"}
          animatePresenceMode="sync"
          loop={true}
          auto={false}
          staggerDuration={0.0}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
          splitBy="words"
        />
      </div>
      <div className="absolute inset-0">
        {exampleImages.slice(1).map((image, index) => (
          <Item key={index} index={index} image={image} />
        ))}
      </div>
    </div>
  )
}
