"use client"

import { useRef } from "react"
import { MoveLeft, MoveRight } from "lucide-react"
import { LayoutGroup, motion } from "motion/react"

import TextRotate, { TextRotateRef } from "@/fancy/components/text/text-rotate"

export default function Preview() {
  const textRotateRef = useRef<TextRotateRef>(null)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-overused-grotesk bg-white text-foreground dark:text-muted font-light overflow-hidden p-8 sm:p-20 md:p-24 gap-8">
      <LayoutGroup>
        <motion.p className="" layout>
          <TextRotate
            ref={textRotateRef}
            texts={[
              "this is the first text",
              "this is the 2nd",
              "we're at third!",
              "4th! keep going",
              "5th.",
              "this is the end.",
            ]}
            mainClassName="text-lg sm:text-2xl md:text-4xl justify-center flex"
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
        </motion.p>
      </LayoutGroup>

      <div className="flex gap-4">
        <button
          onClick={() => textRotateRef.current?.previous()}
          className="px-2 py-2 text-foreground dark:text-muted"
        >
          <MoveLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={() => textRotateRef.current?.next()}
          className="px-2 py-2 text-foreground dark:text-muted"
        >
          <MoveRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  )
}
