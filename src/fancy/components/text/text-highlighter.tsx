"use client"

import {
  ElementType,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { motion, useInView, UseInViewOptions, Variants } from "motion/react"

import { cn } from "@/lib/utils"

type TextHighlighterProps = {
  /**
   * The text content to be highlighted
   */
  children: React.ReactNode

  /**
   * HTML element to render as
   * @default "p"
   */
  as?: ElementType

  /**
   * How to trigger the animation
   * @default "inView"
   */
  triggerType?: "hover" | "ref" | "inView"

  /**
   * Animation transition configuration
   * @default { duration: 0.4, type: "spring", bounce: 0 }
   */
  transition?: {
    duration?: number
    type?: string
    bounce?: number
    [key: string]: any
  }

  /**
   * Options for useInView hook when triggerType is "inView"
   */
  useInViewOptions?: UseInViewOptions

  /**
   * Class name for the container element
   */
  className?: string

  /**
   * Highlight color (CSS color string)
   * @default 'hsl(60, 90%, 50%)' (yellow)
   */
  highlightColor?: string
}

export type TextHighlighterRef = {
  /**
   * Trigger the highlight animation
   */
  animate: () => void

  /**
   * Reset the highlight animation
   */
  reset: () => void
}

export const TextHighlighter = forwardRef<TextHighlighterRef, TextHighlighterProps>(
  (
    {
      children,
      as = "span",
      triggerType = "inView",
      transition = { type: "spring", duration: 1., delay: 0.4, bounce: 0 },
      useInViewOptions = {
        once: false,
        initial: false,
        amount: 0.5
      },
      className,
      highlightColor = 'hsl(25, 90%, 80%)',
    },
    ref
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const isInView =
      triggerType === "inView"
        ? useInView(componentRef, useInViewOptions)
        : false

    useImperativeHandle(ref, () => ({
      animate: () => setIsAnimating(true),
      reset: () => setIsAnimating(false),
    }))

    const shouldAnimate =
      triggerType === "hover"
        ? isHovered
        : triggerType === "inView"
          ? isInView
          : triggerType === "ref"
            ? isAnimating
            : false

    const ElementTag = as || "span"

    // Highlight style
    const highlightStyle = {
      backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: shouldAnimate ? '100% 100%' : '0% 100%',
      boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone',
      borderRadius: '0.3em',
    } as React.CSSProperties

    return (
      <ElementTag
        ref={componentRef}
        className={cn("", className)}
        onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
        onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
      >
        <motion.span
          style={highlightStyle}
          animate={{ backgroundSize: shouldAnimate ? '100% 100%' : '0% 100%' }}
          initial={{ backgroundSize: '0% 100%' }}
          transition={transition}
          className="inline z-0 px-1"
        >
          {children}
        </motion.span>
      </ElementTag>
    )
  }
)

TextHighlighter.displayName = "TextHighlighter"

export default TextHighlighter
