"use client"

import { useEffect, useRef } from "react"
import { useInView } from "motion/react"

import VerticalCutReveal, {
  VerticalCutRevealRef,
} from "@/fancy/components/text/vertical-cut-reveal"

export default function Preview() {
  const ref = useRef(null)
  const textRef = useRef<VerticalCutRevealRef>(null)
  const isInView = useInView(ref, { once: false })

  useEffect(() => {
    if (isInView) {
      textRef.current?.startAnimation()
    } else {
      textRef.current?.reset()
    }
  }, [isInView])

  return (
    <div className="w-full h-full font-overused-grotesk bg-primary-blue overflow-auto text-white text md:text-4xl lg:text-4xl font-bold text-xl">
      <div className="h-full flex w-full  justify-center items-center ">
        Scroll down champ ↓
      </div>
      <div className="h-full  flex text-white justify-center items-center">
        <div ref={ref}>
          <VerticalCutReveal
            splitBy="characters"
            staggerDuration={0.02}
            staggerFrom="first"
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 35,
              delay: 0.1,
            }}
            containerClassName="text-[#00000] leading-snug"
            ref={textRef}
            autoStart={false}
          >
            {`howdy! 👋`}
          </VerticalCutReveal>
        </div>
      </div>
    </div>
  )
}
