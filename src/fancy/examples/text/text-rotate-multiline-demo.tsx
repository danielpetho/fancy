"use client"

import { LayoutGroup, motion } from "motion/react"

import TextRotate from "@/fancy/components/text/text-rotate"

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-col items-start font-overused-grotesk  font-light overflow-hidden p-8 pt-20 sm:pt-16 sm:p-16 md:p-20 bg-white text-base sm:text-xl md:text-2xl leading-tight dark:text-muted text-foreground">
      <LayoutGroup>
        <TextRotate
          texts={[
            "A typeface family is an accomplishment on the order of a novel, a feature film screenplay, a computer language design and implementation, a major musical composition, a monumental sculpture, or other artistic or technical endeavors that consume a year or more of intensive creative effort.",
            "Typography is two-dimensional architecture, based on experience and imagination, and guided by rules and readability. And this is the purpose of typography: The arrangement of design elements within a given structure should allow the reader to easily focus on the message, without slowing down the speed of his reading.",
          ]}
          staggerFrom={"first"}
          staggerDuration={0.01}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={4000}
          splitBy="words"
        />
        <motion.div
          className="bg-primary-red w-2 h-2 sm:w-3 sm:h-3 rounded-full my-6"
          layout
        />
        <TextRotate
          texts={["Charles Bigelow", "Hermann Zapf"]}
          staggerFrom={"first"}
          staggerDuration={0.025}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={4000}
          splitBy="characters"
        />
      </LayoutGroup>
    </div>
  )
}
