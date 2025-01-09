"use client"

import React, { useEffect, useRef, useState } from "react"
import cn from "clsx"
import {
  motion,
  useAnimationControls,
  ValueAnimationTransition,
} from "motion/react"

interface GoesOutComesInUnderlineProps {
  label: string
  direction?: "left" | "right"
  className?: string
  onClick?: () => void
  underlineHeightRatio?: number
  underlinePaddingRatio?: number
  transition?: ValueAnimationTransition
}

const GoesOutComesInUnderline: React.FC<GoesOutComesInUnderlineProps> = ({
  label,
  direction = "left",
  className,
  onClick,
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  transition = {
    duration: 0.5,
    ease: "easeOut",
  },
  ...props
}) => {
  const controls = useAnimationControls()
  const [blocked, setBlocked] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)

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

  const animate = async () => {
    if (blocked) return

    setBlocked(true)

    await controls.start({
      width: 0,
      transition,
      transitionEnd: {
        left: direction === "left" ? "auto" : 0,
        right: direction === "left" ? 0 : "auto",
      },
    })

    await controls.start({
      width: "100%",
      transition,
      transitionEnd: {
        left: direction === "left" ? 0 : "",
        right: direction === "left" ? "" : 0,
      },
    })

    setBlocked(false)
  }

  return (
    <motion.span
      className={cn("relative inline-block cursor-pointer", className)}
      onHoverStart={animate}
      onClick={onClick}
      ref={textRef}
      {...props}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{label}</span>
      <motion.span
        className={cn("absolute bg-current", {
          "left-0": direction === "left",
          "right-0": direction === "right",
        })}
        style={{
          height: "var(--underline-height)",
          bottom: "calc(-1 * var(--underline-padding))",
          width: "100%",
        }}
        animate={controls}
        aria-hidden="true"
      />
    </motion.span>
  )
}

export default GoesOutComesInUnderline
