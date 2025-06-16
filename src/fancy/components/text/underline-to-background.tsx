"use client"

import { ElementType, useEffect, useMemo, useRef } from "react"
import { motion, ValueAnimationTransition } from "motion/react"

import { cn } from "@/lib/utils"

interface UnderlineProps {
  /**
   * The content to be displayed and animated
   */
  children: React.ReactNode

  /**
   * HTML Tag to render the component as
   * @default span
   */
  as?: ElementType

  /**
   * Optional class name for styling
   */
  className?: string

  /**
   * Animation transition configuration
   * @default { type: "spring", damping: 30, stiffness: 300 }
   */
  transition?: ValueAnimationTransition

  /**
   * The color that the text will animate to on hover
   */
  targetTextColor: string

  /**
   * Height of the underline as a ratio of font size
   * @default 0.1
   */
  underlineHeightRatio?: number

  /**
   * Padding of the underline as a ratio of font size
   * @default 0.01
   */
  underlinePaddingRatio?: number
}

const UnderlineToBackground = ({
  children,
  as,
  className,
  transition = { type: "spring", damping: 30, stiffness: 300 },
  underlineHeightRatio = 0.1, // Default to 10% of font size
  underlinePaddingRatio = 0.01, // Default to 1% of font size
  targetTextColor = "#fef",
  ...props
}: UnderlineProps) => {
  const textRef = useRef<HTMLSpanElement>(null)

  // Create custom motion component based on the 'as' prop
  const MotionComponent = useMemo(() => motion.create(as ?? "span"), [as])

  // Update CSS custom properties based on font size
  useEffect(() => {
    const updateUnderlineStyles = () => {
      if (textRef.current) {
        const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize)
        const underlineHeight = fontSize * underlineHeightRatio
        const underlinePadding = fontSize * underlinePaddingRatio
        textRef.current.style.setProperty(
          "--underline-height",
          `${underlineHeight}px`
        )
        textRef.current.style.setProperty(
          "--underline-padding",
          `${underlinePadding}px`
        )
      }
    }

    updateUnderlineStyles()
    window.addEventListener("resize", updateUnderlineStyles)

    return () => window.removeEventListener("resize", updateUnderlineStyles)
  }, [underlineHeightRatio, underlinePaddingRatio])

  // Animation variants for the underline background
  const underlineVariants = {
    initial: {
      height: "var(--underline-height)",
    },
    target: {
      height: "100%",
      transition: transition,
    },
  }

  // Animation variants for the text color
  const textVariants = {
    initial: {
      color: "currentColor",
    },
    target: {
      color: targetTextColor,
      transition: transition,
    },
  }

  return (
    <MotionComponent
      className={cn("relative inline-block cursor-pointer", className)}
      whileHover="target"
      ref={textRef}
      {...props}
    >
      <motion.div
        className="absolute bg-current w-full"
        style={{
          height: "var(--underline-height)",
          bottom: "calc(-1 * var(--underline-padding))",
        }}
        variants={underlineVariants}
        aria-hidden="true"
      />
      <motion.span variants={textVariants} className="text-current relative">
        {children}
      </motion.span>
    </MotionComponent>
  )
}

UnderlineToBackground.displayName = "UnderlineToBackground"

export default UnderlineToBackground
