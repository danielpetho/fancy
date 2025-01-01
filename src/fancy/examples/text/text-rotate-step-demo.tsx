import { LayoutGroup, motion } from "motion/react"
import { useRef } from "react"

import TextRotate, { TextRotateRef } from "@/fancy/components/text/text-rotate"

export default function Preview() {
  const textRotateRef = useRef<TextRotateRef>(null)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-overusedGrotesk bg-background font-light overflow-hidden p-24 gap-8">
      <LayoutGroup>
        <motion.p className="" layout>
          <TextRotate
            ref={textRotateRef}
            texts={["This is the first text", "this is the 2nd", "we're at third!", "4th! keep going", "5th! almost", "this is the end."]}
            mainClassName="text-3xl justify-center flex"
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
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={() => textRotateRef.current?.reset()}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Reset
        </button>
        <button
          onClick={() => textRotateRef.current?.next()}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  )
}
