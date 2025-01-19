"use client"

import { motion } from "motion/react"

import ScrambleHover from "@/fancy/components/text/scramble-hover"

export default function Preview() {
  const models = [
    "Llama 3.1 405B Instruct Turbo",
    "Llama 3.2 3B Instruct Turbo",
    "Gemma 2 27B",
    "Mistral 7B Instruct v0.3",
    "Mixtral 8x7B Instruct",
    "DeepSeek LLM Chat 67B",
    "Qwen 2.5 72B Instruct Turbo",
    "WizardLM 2 8x22B",
    "Nous Hermes 2 Mixtral",
    "StripedHyena Nous 7B",
    "DBRX Instruct",
    "MythoMax L2 13B",
    "SOLAR 10.7B Instruct",
    "Gemma 2B Instruct",
  ]

  return (
    <div className="w-full h-full flex flex-col  justify-center items-end bg-white text-foreground dark:text-muted font-normal overflow-hidden py-20 px-8 sm:px-16 md:px-24 lg:px-32 text-right text-sm sm:text-lg md:text-xl">
      {models.map((model, index) => (
        <motion.div
          layout
          key={model}
          animate={{ opacity: [0, 1, 1], y: [10, 10, 0] }}
          transition={{
            duration: 0.1,
            ease: "circInOut",
            delay: index * 0.05 + 0.5,
            times: [0, 0.2, 1],
          }}
        >
          <ScrambleHover
            text={model}
            scrambleSpeed={50}
            maxIterations={8}
            useOriginalCharsOnly={true}
            className="cursor-pointer"
          />
        </motion.div>
      ))}
    </div>
  )
}
