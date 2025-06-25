"use client"

import React, { ElementType, useMemo, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

// handy function to extract text from children
const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string") return children

  if (React.isValidElement(children)) {
    const childText = children.props.children
    if (typeof childText === "string") return childText
    if (React.isValidElement(childText)) {
      return extractTextFromChildren(childText)
    }
  }

  throw new Error(
    "ScrollAndSwapText: Children must be a string or a React element containing a string. " +
      "Complex nested structures are not supported."
  )
}

interface ScrollAndSwapTextProps {
  /**
   * The content to be displayed and animated
   */
  children: React.ReactNode

  /**
   * HTML Tag to render the component as
   * @default "span"
   */
  as?: ElementType

  /**
   * Reference to the container element for scroll tracking
   */
  containerRef: React.RefObject<HTMLElement>

  /**
   * Offset configuration for when the animation should start and end relative to the scroll container. Check motion documentation for more details.
   * @default ["0 0", "0 1"]
   */
  offset?: [string, string]

  /**
   * Additional CSS classes for styling the component
   */
  className?: string

  /**
   * Spring animation configuration for smoothing the scroll-based animation
   * @default { stiffness: 200, damping: 30 }
   */
  springConfig?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
}

/**
 * ScrollAndSwapText creates a scroll-triggered text animation where text slides vertically
 * based on scroll progress.
 */
const ScrollAndSwapText = ({
  children,
  as = "span",
  offset = ["0 0", "0 1"],
  className,
  containerRef,
  springConfig = { stiffness: 200, damping: 30 },
  ...props
}: ScrollAndSwapTextProps) => {
  const ref = useRef<HTMLElement>(null)

  // Convert children to string for processing with error handling
  const text = useMemo(() => {
    try {
      return extractTextFromChildren(children)
    } catch (error) {
      console.error(error)
      return ""
    }
  }, [children])

  // Track scroll progress within the specified container and target element
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    offset: offset as any, // framer motion doesnt export the type, so we have to cast it, sorry :/
    layoutEffect: false,
  })

  // Apply spring physics to smooth the scroll-based animation
  const springScrollYProgress = useSpring(scrollYProgress, springConfig)

  // Transform scroll progress into vertical translation values
  // Original text moves from 0% to -100% (slides up and out)
  const top = useTransform(springScrollYProgress, [0, 1], ["0%", "-100%"])
  // Replacement text moves from 100% to 0% (slides up from below)
  const bottom = useTransform(springScrollYProgress, [0, 1], ["100%", "0%"])

  const ElementTag = as

  return (
    <ElementTag
      className={cn("flex overflow-hidden relative items-center justify-center p-0", className)}
      ref={ref}
      {...props}
    >

      <span className="relative text-transparent" aria-hidden="true">
        {text}
      </span>
      
      <motion.span className="absolute" style={{ top: top }}>
        {text}
      </motion.span>
      
      <motion.span
        className="absolute"
        style={{ top: bottom }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </ElementTag>
  )
}

ScrollAndSwapText.displayName = "ScrollAndSwapText"

export default ScrollAndSwapText
