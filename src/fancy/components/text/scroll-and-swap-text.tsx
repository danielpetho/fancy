"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

interface TextProps {
  label: string
  containerRef: React.RefObject<HTMLElement>
  offset?: [string, string]
  className?: string
}

const ScrollAndSwapText = ({
  label,
  offset = ["0 0", "0 1"],
  className,
  containerRef,
  ...props
}: TextProps) => {
  const ref = useRef<HTMLSpanElement>(null)

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    offset: offset as any, // framer motion doesnt export the type, so we have to cast it, sorry :/
    layoutEffect: false,
  })

  const top = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  const bottom = useTransform(scrollYProgress, [0, 1], ["100%", "0%"])

  return (
    <span
      className={`flex overflow-hidden relative items-center justify-center p-0 
      ${className}`}
      ref={ref}
      {...props}
    >
      <span className="relative text-transparent" aria-hidden="true">{label}</span>
      <motion.span className="absolute " style={{ top: top }} >
        {label}
      </motion.span>
      <motion.span
        className="absolute "
        style={{ top: bottom }}
        aria-hidden="true"
      >
        {label}
      </motion.span>
    </span>
  )
}

export default ScrollAndSwapText
