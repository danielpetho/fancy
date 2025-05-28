"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"

import { TextHighlighter } from "@/fancy/components/text/text-highlighter"

const HIGHLIGHT_COLOR = "hsl(80, 100%, 50%)"

const DEMO_USE_IN_VIEW_OPTIONS = { once: false, initial: false, amount: 0.1 }
const DEMO_TRANSITION = { type: "spring", duration: 1, delay: 0.4, bounce: 0 }

const SECTION_CLASSES =
  "min-w-full h-full snap-start flex items-center justify-center shrink-0"
const CONTAINER_CLASSES =
  "max-w-[240px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4 sm:px-6"
const PARAGRAPH_CLASSES =
  "text-sm sm:text-base md:text-lg leading-relaxed font-overusedGrotesk mb-3 sm:mb-4 last:mb-0"

function Section({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: "-20%",
    amount: 0.5,
  })

  return (
    <section className={SECTION_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <motion.div
          ref={ref}
          initial={{
            opacity: 0,
            filter: "blur(8px)",
          }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0.3, filter: "blur(6px)" }
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
      </div>
    </section>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className={PARAGRAPH_CLASSES}>{children}</p>
}

export default function TextHighlighterDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(1)
  const [scrollDirection, setScrollDirection] = useState<"ltr" | "rtl">("ltr")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let prevScrollLeft = container.scrollLeft

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth
      const sectionIndex = Math.round(scrollLeft / containerWidth) + 1
      setCurrentSection(Math.min(5, Math.max(1, sectionIndex)))

      const scrollDiff = scrollLeft - prevScrollLeft
      if (Math.abs(scrollDiff) > 5) {
        setScrollDirection(scrollDiff > 0 ? "ltr" : "rtl")
      }
      prevScrollLeft = scrollLeft
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

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
        <Section>
          <Paragraph>
            <span>Our </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              object detection systems
            </TextHighlighter>
            <span> identify and locate items in real-time. From </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              facial recognition
            </TextHighlighter>
            <span>
              {" "}
              to product identification, we deliver precision at scale.
            </span>
          </Paragraph>

          <Paragraph>
            <span>Whether it's </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              traffic monitoring
            </TextHighlighter>
            <span> for smart cities or </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              inventory management
            </TextHighlighter>
            <span>
              {" "}
              for retail, our AI distinguishes between people, vehicles, and
              objects with unmatched accuracy.
            </span>
          </Paragraph>
        </Section>

        <Section>
          <Paragraph>
            <span>Advanced </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              video analytics
            </TextHighlighter>
            <span> track movement across frames. Our </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              object tracking algorithms
            </TextHighlighter>
            <span>
              {" "}
              power autonomous vehicles and security systems worldwide.
            </span>
          </Paragraph>

          <Paragraph>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              Scene understanding
            </TextHighlighter>
            <span>
              {" "}
              capabilities analyze spatial relationships and context. From{` `}
            </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              sports performance analysis
            </TextHighlighter>
            <span> to </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              surveillance systems
            </TextHighlighter>
            <span>, we make sense of complex visual data.</span>
          </Paragraph>
        </Section>

        <Section>
          <Paragraph>
            <span>Our </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              OCR technology
            </TextHighlighter>
            <span>
              {" "}
              converts printed and handwritten text to digital format instantly.{" "}
            </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              Document automation
            </TextHighlighter>
            <span> streamlines workflows across industries.</span>
          </Paragraph>

          <Paragraph>
            <span>From </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              invoice processing
            </TextHighlighter>
            <span> to </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              accessibility solutions
            </TextHighlighter>
            <span>
              , our text recognition supports multiple languages and formats
              with exceptional accuracy.
            </span>
          </Paragraph>
        </Section>

        <Section>
          <Paragraph>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              3D depth perception
            </TextHighlighter>
            <span> enables precise spatial understanding. Our </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              stereo vision systems
            </TextHighlighter>
            <span>
              {" "}
              power robotic automation and quality control processes.
            </span>
          </Paragraph>

          <Paragraph>
            <span>Advanced </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              augmented reality
            </TextHighlighter>
            <span> and </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              virtual reality applications
            </TextHighlighter>
            <span>
              {" "}
              rely on our depth analysis for immersive, interactive experiences.
            </span>
          </Paragraph>
        </Section>

        <Section>
          <Paragraph>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              Image segmentation
            </TextHighlighter>
            <span>
              {" "}
              separates objects with pixel-perfect precision. Our{` `}
            </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              enhancement algorithms
            </TextHighlighter>
            <span>
              {" "}
              restore clarity and remove noise from any visual content.
            </span>
          </Paragraph>

          <Paragraph>
            <span>Generate </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              synthetic training data
            </TextHighlighter>
            <span> and create </span>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              high-resolution imagery
            </TextHighlighter>
            <span> for machine learning models and creative applications.</span>
          </Paragraph>

          <Paragraph>
            <TextHighlighter
              highlightColor={HIGHLIGHT_COLOR}
              direction={scrollDirection}
              useInViewOptions={DEMO_USE_IN_VIEW_OPTIONS}
              transition={DEMO_TRANSITION}
            >
              Transform your industry
            </TextHighlighter>
            <span>
              {" "}
              with computer vision that sees, understands, and acts on visual
              information like never before.
            </span>
          </Paragraph>
        </Section>
      </div>
    </div>
  )
}
