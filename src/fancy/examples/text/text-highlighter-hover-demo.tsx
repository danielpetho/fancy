"use client"

import { TextHighlighter } from "@/fancy/components/text/text-highlighter"

export default function TextHighlighterHoverDemo() {
  return (
    <div className="h-full w-full bg-[#fefefe] flex items-center justify-center">
      <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4 text-black">
        <div className="flex flex-col gap-8 text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">
          <TextHighlighter
            triggerType="hover"
            direction="ltr"
            className="px-2 py-1 cursor-pointer"
            highlightColor="#BBC2E2"
            transition={{ type: "spring", duration: 0.68, bounce: 0 }}
          >
            hover me - left to right
          </TextHighlighter>

          <TextHighlighter
            triggerType="hover"
            direction="rtl"
            className="px-2 py-1 cursor-pointer"
            highlightColor="#BBC2E2"
            transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          >
            hover me - right to left
          </TextHighlighter>

          <TextHighlighter
            triggerType="hover"
            direction="ttb"
            className="px-2 py-1 cursor-pointer"
            highlightColor="#BBC2E2"
            transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          >
            hover me - top to bottom
          </TextHighlighter>

          <TextHighlighter
            triggerType="hover"
            direction="btt"
            className="px-2 py-1 cursor-pointer"
            highlightColor="#BBC2E2"
            transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          >
            hover me - bottom to top
          </TextHighlighter>
        </div>
      </div>
    </div>
  )
}
