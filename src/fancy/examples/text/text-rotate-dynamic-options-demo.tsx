import { LayoutGroup, motion } from "motion/react"
import { useRef, useState } from "react"

import TextRotate, { TextRotateRef } from "@/fancy/components/text/text-rotate"

export default function Preview() {
  const textRotateRef = useRef<TextRotateRef>(null)
  const [currentText, setCurrentText] = useState("First")

  const texts = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"]
  const currentIndex = texts.indexOf(currentText)

  const previous = () => {
    const newIndex = currentIndex === 0 ? texts.length - 1 : currentIndex - 1
    setCurrentText(texts[newIndex])
  }

  const next = () => {
    const newIndex = currentIndex === texts.length - 1 ? 0 : currentIndex + 1
    setCurrentText(texts[newIndex])
  }

  const reset = () => {
    setCurrentText(texts[0])
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-overusedGrotesk bg-background font-light overflow-hidden p-24 gap-8">
          <TextRotate
            ref={textRotateRef}
            texts={[currentText]}
            mainClassName="text-3xl"
            staggerDuration={0.0}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
            splitBy="words"
          />

      <div className="flex gap-4">
        <button
          onClick={previous}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Reset
        </button>
        <button
          onClick={next}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  )
}
