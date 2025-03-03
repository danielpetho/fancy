"use client"

import { motion } from "motion/react"

import ElasticLine from "@/fancy/components/physics/elastic-line"

export default function Preview() {
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  }

  return (
    <div className="w-full h-full flex flex-row items-center justify-center font-overused-grotesk overflow-hidden bg-white text-foreground dark:text-muted">
      <div className="absolute left-0 top-0 w-full h-full px-6 sm:px-8 md:px-12 z-10">
        {/* Animated elastic line */}
        <ElasticLine
          releaseThreshold={50}
          strokeWidth={1}
          animateInTransition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.15,
          }}
        />
      </div>

      {/* This is just fluff for the demo */}
      <div className="h-full flex flex-col py-6 w-full px-6 sm:px-8 md:px-12 font-light">
        <div className="h-1/2 py-8 w-full items-end flex">
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="uppercase text-4xl sm:text-5xl md:text-6xl font-medium"
            custom={0}
          >
            FANCY COMPONENTS
          </motion.p>
        </div>
        <div className="flex flex-row  pt-8 justify-between items-start gap-x-4">
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="w-1/3 uppercase md:text-7xl hidden md:block text-orange-500"
            custom={0}
          >
            ✽
          </motion.p>
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-2/3 sm:text-left text-base sm:text-xl md:text-2xl"
            custom={1}
          >
            Ready to use, fancy, animated React components & microinteractions
            for creative developers.
          </motion.p>
        </div>

        {/* <div className="h-1/3 flex items-center justify-end">
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            
          </motion.p>
        </div> */}
      </div>
    </div>
  )
}
