"use client"

import { useEffect, useRef } from "react"
import { exampleImages } from "@/utils/demo-images"
import { useInView } from "motion/react"

import TextRotate, { TextRotateRef } from "@/fancy/components/text/text-rotate"

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
      className="h-full w-1/2 flex justify-center items-center snap-center"
    >
      <div className="w-16 h-16 sm:w-36 sm:h-36 md:w-40 md:h-40">
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

  const handleInView = (index: number, inView: boolean) => {
    console.log(index, inView)
    if (inView && textRotateRef.current) {
      textRotateRef.current.jumpTo(index)
    }
  }

  return (
    <div className="w-full h-full overflow-auto absolute snap-y snap-mandatory">
      <div className="sticky inset-0 h-full w-full flex items-center justify-end bg-white dark:text-muted text-foreground">
        <div className="w-2/3">
          <TextRotate
            ref={textRotateRef}
            texts={[...exampleImages.map((image) => image.author)]}
            mainClassName="text-sm sm:text-3xl md:text-4xl w-full justify-center flex pt-2"
            splitLevelClassName="overflow-hidden pb-2"
            staggerFrom={"first"}
            animatePresenceMode="wait"
            loop={false}
            auto={false}
            staggerDuration={0.005}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          />
        </div>
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
