"use client"

import { LayoutGroup, motion } from "motion/react"

import TextRotate from "@/fancy/components/text/text-rotate"

export default function Preview() {
  return (
    <div className="w-full h-full text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-overused-grotesk bg-white dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
      <LayoutGroup>
        <motion.p className="flex whitespace-pre" layout>
          <motion.span
            className="pt-0.5 sm:pt-1 md:pt-2"
            layout
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            Make it{" "}
          </motion.span>
          <TextRotate
            texts={[
              "gast",
              "test"
            ]}
            animatePresenceMode="popLayout"
            mainClassName="text-white px-2 sm:px-2 md:px-3 bg-primary-red overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg [transform-style:preserve-3d] perspective-[1000px]"
            staggerFrom={"last"}
            initial={{ rotateX: 90, opacity: 1, transformOrigin: "top center", translateZ: "50px" }}
            animate={{ rotateX: 0, opacity: 1, transformOrigin: "center center", translateZ: "0px" }}
            exit={{ rotateX: -90, opacity: 1, transformOrigin: "bottom center", translateZ: "50px" }}
            staggerDuration={0.5}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ duration: 1, ease: "easeInOut" }}
            rotationInterval={5000}
          />
        </motion.p>
      </LayoutGroup>
    </div>
  )
}
