"use client"

import { exampleImages } from "@/utils/demo-images"
import { motion } from "motion/react"

import Float from "@/fancy/components/blocks/float"

export default function FloatDemo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white text-foreground dark:text-muted">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.5, ease: "easeOut" }}
        >
          <Float>
            <div className="sm:w-40 sm:h-40 h-32 w-32 md:w-48 md:h-48 shadow-2xl relative overflow-hidden  hover:scale-105 duration-200 cursor-pointer transition-transform">
              <img
                src={exampleImages[4].url}
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            </div>
          </Float>
        </motion.div>
        <motion.h2
          className="pt-8 sm:pt-12 md:pt-16 text-xl sm:text-3xl md:text-4xl uppercase z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.7, ease: "easeOut" }}
        >
          Album of the week
        </motion.h2>
      </div>
    </div>
  )
}
