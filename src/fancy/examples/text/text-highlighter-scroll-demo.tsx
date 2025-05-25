"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

import { TextHighlighter } from "@/fancy/components/text/text-highlighter"

const HIGHLIGHT_COLOR = "hsl(80, 100%, 50%)"

function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: false,
    margin: "-10%",
    amount: 0.3
  })
  const [_, setHighlightedWords] = useState<number[]>([])

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const wordCount = React.Children.count(children)
        const numToHighlight = Math.floor(Math.random() * 3) + 2
        const indices = Array.from({ length: numToHighlight }, () => 
          Math.floor(Math.random() * wordCount)
        )
        setHighlightedWords(indices)
      }, 800 + delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, children, delay])

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        //y: 30,
        filter: "blur(8px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              //y: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0.3,
              //y: isInView === false ? -20 : 30,
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
  )
}

export default function TextHighlighterDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(1)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth
      const sectionIndex = Math.round(scrollLeft / containerWidth) + 1
      setCurrentSection(Math.min(5, Math.max(1, sectionIndex)))
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="h-full w-full bg-[#fff] relative p-0">
      {/* Sticky section counter */}
      <div className="absolute bottom-20 left-1/2 z-20 text-base -translate-x-1/2 rounded-full border border-foreground/80 px-3 pb-0.5 flex items-center justify-center w-10 tabular-nums">
        <div
          key={currentSection}
          className="font-overusedGrotesk"
        >
          {currentSection.toString().padStart(2, '0')}
        </div>
      </div>

      <div 
        ref={containerRef}
        className="h-full w-full z-10 bg-[#fff] overflow-y-scroll snap-x snap-mandatory flex mb-6"
      >
        
        <section className="min-w-full h-full snap-start flex items-center justify-center shrink-0">
          <div className="max-w-lg mx-auto px-6">
            <AnimatedSection delay={0.2}>
              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <span>Our </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>object detection systems</TextHighlighter>
                <span> identify and locate items in real-time. From </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>facial recognition</TextHighlighter>
                <span> to product identification, we deliver precision at scale.</span>
              </p>

              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <span>Whether it's </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>traffic monitoring</TextHighlighter>
                <span> for smart cities or </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>inventory management</TextHighlighter>
                <span> for retail, our AI distinguishes between people, vehicles, and objects with unmatched accuracy.</span>
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="min-w-full h-full snap-start flex items-center justify-center shrink-0">
          <div className="max-w-lg mx-auto px-6">
            <AnimatedSection delay={0.3}>
              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <span>Advanced </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>video analytics</TextHighlighter>
                <span> track movement across frames. Our </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>object tracking algorithms</TextHighlighter>
                <span> power autonomous vehicles and security systems worldwide.</span>
              </p>

              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>Scene understanding</TextHighlighter>
                <span> capabilities analyze spatial relationships and context. From </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>sports performance analysis</TextHighlighter>
                <span> to </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>surveillance systems</TextHighlighter>
                <span>, we make sense of complex visual data.</span>
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="min-w-full h-full snap-start flex items-center justify-center shrink-0">
          <div className="max-w-lg mx-auto px-6">
            <AnimatedSection delay={0.4}>
              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <span>Our </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>OCR technology</TextHighlighter>
                <span> converts printed and handwritten text to digital format instantly. </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>Document automation</TextHighlighter>
                <span> streamlines workflows across industries.</span>
              </p>

              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <span>From </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>invoice processing</TextHighlighter>
                <span> to </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>accessibility solutions</TextHighlighter>
                <span>, our text recognition supports multiple languages and formats with exceptional accuracy.</span>
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="min-w-full h-full snap-start flex items-center justify-center shrink-0">
          <div className="max-w-lg mx-auto px-6">
            <AnimatedSection delay={0.5}>
              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>3D depth perception</TextHighlighter>
                <span> enables precise spatial understanding. Our </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>stereo vision systems</TextHighlighter>
                <span> power robotic automation and quality control processes.</span>
              </p>

              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <span>Advanced </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>augmented reality</TextHighlighter>
                <span> and </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>virtual reality applications</TextHighlighter>
                <span> rely on our depth analysis for immersive, interactive experiences.</span>
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="min-w-full h-full snap-start flex items-center justify-center shrink-0">
          <div className="max-w-lg mx-auto px-6">
            <AnimatedSection delay={0.6}>
              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>Image segmentation</TextHighlighter>
                <span> separates objects with pixel-perfect precision. Our </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>enhancement algorithms</TextHighlighter>
                <span> restore clarity and remove noise from any visual content.</span>
              </p>

              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <span>Generate </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>synthetic training data</TextHighlighter>
                <span> and create </span>
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>high-resolution imagery</TextHighlighter>
                <span> for machine learning models and creative applications.</span>
              </p>

              <p className="text-lg leading-relaxed font-overusedGrotesk">
                <TextHighlighter highlightColor={HIGHLIGHT_COLOR}>Transform your industry</TextHighlighter>
                <span> with computer vision that sees, understands, and acts on visual information like never before.</span>
              </p>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  )
}
