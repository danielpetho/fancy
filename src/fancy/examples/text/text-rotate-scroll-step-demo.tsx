import { use, useEffect, useRef } from "react"
import { useInView, useScroll } from "motion/react"

import TextRotate, { TextRotateRef } from "@/fancy/components/text/text-rotate"

import { exampleImages } from "../_helpers/exampleImages"

function Item({
  index,
  image,
  link,
  onInView,
}: {
  index: number
  image: string
  link: string
  onInView: (inView: boolean) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    margin: "-45% 0px -45% 0px",
  })

  useEffect(() => {
    onInView(isInView)
  }, [isInView, onInView])

  return (
    <section
      ref={ref}
      key={index + 1}
      className="h-full w-full flex justify-start pl-24 items-center snap-center"
    >
      <div className="w-64 h-64">
        <a href={link} target="_blank" rel="noreferrer">
          <img
            src={image}
            alt={`Example ${index + 2}`}
            className="w-full h-full object-cover"
          />
        </a>
      </div>
    </section>
  )
}

export default function Preview() {
  const textRotateRef = useRef<TextRotateRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleInView = (index: number, inView: boolean) => {
    console.log(index, inView)
    if (inView && textRotateRef.current) {
      textRotateRef.current.jumpTo(index)
    }
  }

  return (
    <div className="w-full h-full overflow-auto absolute snap-y snap-mandatory">
      <div className="sticky inset-0 h-full w-full flex items-center pr-40">
        <TextRotate
          ref={textRotateRef}
          texts={[...exampleImages.map((image) => image.author)]}
          mainClassName="text-3xl w-full justify-end flex"
          splitLevelClassName="overflow-hidden"
          staggerFrom={"first"}
          animatePresenceMode="wait"
          loop={false}
          auto={false}
          staggerDuration={0.005}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0. }}
        />
      </div>
      <div className="absolute inset-0">
        {exampleImages.slice(1).map((image, index) => (
          <Item
            key={index}
            index={index}
            image={image.url}
            link={image.link}
            onInView={(inView) => handleInView(index, inView)}
          />
        ))}
      </div>
    </div>
  )
}
