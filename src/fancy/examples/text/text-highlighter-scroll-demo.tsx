"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { motion, useInView } from "motion/react"

import {
  TextHighlighter,
  TextHighlighterRef,
} from "@/fancy/components/text/text-highlighter"

const HIGHLIGHT_COLOR = "hsl(80, 100%, 50%)"

// Reusable class names
const SECTION_CLASSES = "min-w-full h-full snap-start flex items-center justify-center shrink-0"
const CONTAINER_CLASSES = "max-w-[240px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4 sm:px-6"
const PARAGRAPH_CLASSES = "text-sm sm:text-base md:text-lg leading-relaxed font-overusedGrotesk mb-3 sm:mb-4 last:mb-0"

const HighlighterContext = createContext<{
  registerRef: (ref: TextHighlighterRef | null) => void
  scrollDirection: "ltr" | "rtl" | "ttb" | "btt"
}>({
  registerRef: () => {},
  scrollDirection: "ltr",
})

function ContextAwareTextHighlighter({
  children,
  ...props
}: React.ComponentProps<typeof TextHighlighter>) {
  const { registerRef } = useContext(HighlighterContext)

  return (
    <TextHighlighter
      {...props}
      triggerType="ref"
      ref={registerRef}
      className="rounded-[0.3em] px-1"
      useInViewOptions={{ amount: 0, initial: true, once: false }}
    >
      {children}
    </TextHighlighter>
  )
}

function useHighlighterAnimation(
  isInView: boolean,
  scrollDirection: "ltr" | "rtl" | "ttb" | "btt",
  delay: number = 0
) {
  const highlighterRefs = useRef<TextHighlighterRef[]>([])
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const registerRef = useCallback(
    (highlighterRef: TextHighlighterRef | null) => {
      if (highlighterRef && !highlighterRefs.current.includes(highlighterRef)) {
        highlighterRefs.current.push(highlighterRef)
      }
    },
    []
  )

  const clearTimeouts = useCallback(() => {
    animationTimeouts.current.forEach(clearTimeout)
    animationTimeouts.current = []
  }, [])

  const resetHighlighters = useCallback(() => {
    clearTimeouts()
    highlighterRefs.current.forEach((ref) => ref?.reset())
    setIsAnimating(false)
  }, [clearTimeouts])

  const animateHighlighters = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    clearTimeouts()

    highlighterRefs.current.forEach((ref, index) => {
      if (ref) {
        const timeout = setTimeout(() => {
          ref.animate(scrollDirection)
        }, 0)
        animationTimeouts.current.push(timeout)
      }
    })
  }, [isAnimating, scrollDirection, clearTimeouts])

  useEffect(() => {
    if (isInView && !isAnimating) {
      const triggerTimeout = setTimeout(animateHighlighters, delay + 100)
      return () => clearTimeout(triggerTimeout)
    } else if (!isInView) {
      resetHighlighters()
    }
  }, [isInView, isAnimating, animateHighlighters, resetHighlighters, delay])

  useEffect(() => {
    return () => {
      clearTimeouts()
    }
  }, [clearTimeouts])

  return { registerRef, resetHighlighters }
}

function AnimatedSection({
  children,
  delay = 0,
  scrollDirection = "ltr",
}: {
  children: React.ReactNode
  delay?: number
  scrollDirection?: "ltr" | "rtl" | "ttb" | "btt"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: "-20%",
    amount: 0.5,
  })

  const { registerRef } = useHighlighterAnimation(
    isInView,
    scrollDirection,
    delay
  )

  return (
    <HighlighterContext.Provider value={{ registerRef, scrollDirection }}>
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          filter: "blur(8px)",
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                filter: "blur(0px)",
              }
            : {
                opacity: 0.3,
                filter: "blur(6px)",
              }
        }
        transition={{
          duration: 0.8,
          delay: isInView ? delay : 0,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="space-y-4"
      >
        {children}
      </motion.div>
    </HighlighterContext.Provider>
  )
}

// Reusable section container component
function Section({ 
  children, 
  delay, 
  scrollDirection 
}: { 
  children: React.ReactNode
  delay: number
  scrollDirection: "ltr" | "rtl" | "ttb" | "btt" 
}) {
  return (
    <section className={SECTION_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <AnimatedSection delay={delay} scrollDirection={scrollDirection}>
          {children}
        </AnimatedSection>
      </div>
    </section>
  )
}

export default function TextHighlighterDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(1)
  const [scrollDirection, setScrollDirection] = useState<"ltr" | "rtl">("ltr")
  const [lastScrollLeft, setLastScrollLeft] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth
      const sectionIndex = Math.round(scrollLeft / containerWidth) + 1
      setCurrentSection(Math.min(5, Math.max(1, sectionIndex)))

      // Determine scroll direction
      const newDirection =
        scrollLeft > lastScrollLeft
          ? "ltr"
          : scrollLeft < lastScrollLeft
            ? "rtl"
            : scrollDirection
      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection)
      }
      setLastScrollLeft(scrollLeft)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [lastScrollLeft, scrollDirection])

  return (
    <div className="h-full w-full bg-[#fff] text-black relative p-0">
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 z-20 text-sm sm:text-base -translate-x-1/2 rounded-full border border-black/80 px-2 sm:px-3 pb-0.5 flex items-center justify-center w-8 sm:w-10 tabular-nums">
        <div key={currentSection} className="font-overusedGrotesk">
          {currentSection.toString().padStart(2, "0")}
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-full w-full z-10 bg-[#fff] overflow-x-scroll overflow-y-hidden snap-x snap-mandatory flex mb-4 sm:mb-6"
      >
        <Section delay={0.2} scrollDirection={scrollDirection}>
          <p className={PARAGRAPH_CLASSES}>
            <span>Our </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              object detection systems
            </ContextAwareTextHighlighter>
            <span> identify and locate items in real-time. From </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              facial recognition
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              to product identification, we deliver precision at scale.
            </span>
          </p>

          <p className={PARAGRAPH_CLASSES}>
            <span>Whether it's </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              traffic monitoring
            </ContextAwareTextHighlighter>
            <span> for smart cities or </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              inventory management
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              for retail, our AI distinguishes between people, vehicles, and
              objects with unmatched accuracy.
            </span>
          </p>
        </Section>

        <Section delay={0.3} scrollDirection={scrollDirection}>
          <p className={PARAGRAPH_CLASSES}>
            <span>Advanced </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              video analytics
            </ContextAwareTextHighlighter>
            <span> track movement across frames. Our </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              object tracking algorithms
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              power autonomous vehicles and security systems worldwide.
            </span>
          </p>

          <p className={PARAGRAPH_CLASSES}>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              Scene understanding
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              capabilities analyze spatial relationships and context. From{" "}
            </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              sports performance analysis
            </ContextAwareTextHighlighter>
            <span> to </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              surveillance systems
            </ContextAwareTextHighlighter>
            <span>, we make sense of complex visual data.</span>
          </p>
        </Section>

        <Section delay={0.4} scrollDirection={scrollDirection}>
          <p className={PARAGRAPH_CLASSES}>
            <span>Our </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              OCR technology
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              converts printed and handwritten text to digital format
              instantly.{" "}
            </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              Document automation
            </ContextAwareTextHighlighter>
            <span> streamlines workflows across industries.</span>
          </p>

          <p className={PARAGRAPH_CLASSES}>
            <span>From </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              invoice processing
            </ContextAwareTextHighlighter>
            <span> to </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              accessibility solutions
            </ContextAwareTextHighlighter>
            <span>
              , our text recognition supports multiple languages and formats
              with exceptional accuracy.
            </span>
          </p>
        </Section>

        <Section delay={0.5} scrollDirection={scrollDirection}>
          <p className={PARAGRAPH_CLASSES}>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              3D depth perception
            </ContextAwareTextHighlighter>
            <span> enables precise spatial understanding. Our </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              stereo vision systems
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              power robotic automation and quality control processes.
            </span>
          </p>

          <p className={PARAGRAPH_CLASSES}>
            <span>Advanced </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              augmented reality
            </ContextAwareTextHighlighter>
            <span> and </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              virtual reality applications
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              rely on our depth analysis for immersive, interactive
              experiences.
            </span>
          </p>
        </Section>

        <Section delay={0.6} scrollDirection={scrollDirection}>
          <p className={PARAGRAPH_CLASSES}>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              Image segmentation
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              separates objects with pixel-perfect precision. Our{" "}
            </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              enhancement algorithms
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              restore clarity and remove noise from any visual content.
            </span>
          </p>

          <p className={PARAGRAPH_CLASSES}>
            <span>Generate </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              synthetic training data
            </ContextAwareTextHighlighter>
            <span> and create </span>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              high-resolution imagery
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              for machine learning models and creative applications.
            </span>
          </p>

          <p className={PARAGRAPH_CLASSES}>
            <ContextAwareTextHighlighter highlightColor={HIGHLIGHT_COLOR}>
              Transform your industry
            </ContextAwareTextHighlighter>
            <span>
              {" "}
              with computer vision that sees, understands, and acts on
              visual information like never before.
            </span>
          </p>
        </Section>
      </div>
    </div>
  )
}
