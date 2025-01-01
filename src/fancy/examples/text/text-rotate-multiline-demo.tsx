import { LayoutGroup, motion } from "motion/react"

import TextRotate from "@/fancy/components/text/text-rotate"

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-row items-center justify-center font-overusedGrotesk bg-background font-light overflow-hidden p-24">
      <LayoutGroup>
        <motion.p className="flex whitespace-pre" layout>
          <TextRotate
            texts={[
              "Unbaited is a browser extension that helps you filter out engagement bait and inflammatory content from your X (formerly Twitter) feed. It uses AI to analyze tweets in real-time and hides content designed to provoke emotional responses or increase engagement through controversial topics.",
              "This is a prototype and thought-provoker. The goal is to demonstrate how social media platforms could integrate more user controls natively, giving people more agency over their feed content."
            ]}
            mainClassName="text-black text-sm px-3 pt-1 overflow-hidden py-2 justify-center rounded-lg "
            staggerFrom={"first"}
            staggerDuration={0.01}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
            splitBy="words"
          />
        </motion.p>
      </LayoutGroup>
    </div>
  )
}
