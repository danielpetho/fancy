"use client"

import { TextHighlighter } from "@/fancy/components/text/text-highlighter"

export default function TextHighlighterHoverDemo() {
  return (
    <div className="h-full w-full bg-[#fefefe] flex items-center justify-center">
      <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4 text-black">
        <div className="flex flex-col gap-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-overusedGrotesk">
          <TextHighlighter 
            triggerType="hover"
            direction="ltr"
            className="rounded-[0.3em] px-1"
          >
            Hover me - Left to Right
          </TextHighlighter>

          <TextHighlighter
            triggerType="hover" 
            direction="rtl"
            className="rounded-[0.3em] px-1"
          >
            Hover me - Right to Left
          </TextHighlighter>

          <TextHighlighter
            triggerType="hover"
            direction="ttb"
            className="rounded-[0.3em] px-1"
          >
            Hover me - Top to Bottom
          </TextHighlighter>

          <TextHighlighter
            triggerType="hover"
            direction="btt" 
            className="rounded-[0.3em] px-1"
          >
            Hover me - Bottom to Top
          </TextHighlighter>
        </div>
      </div>
    </div>
  )
}
