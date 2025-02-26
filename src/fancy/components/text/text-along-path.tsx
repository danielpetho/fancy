import { RefObject, useEffect, useMemo, useRef, useState } from "react"
import { MotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react"

interface AnimatedPathTextProps {
  // Path properties
  path: string
  pathId?: string
  pathClassName?: string

  // SVG properties
  width?: string | number
  height?: string | number
  viewBox?: string
  svgClassName?: string

  // Text properties
  text: string
  textClassName?: string
  textAnchor?: "start" | "middle" | "end"
  side?: "inside" | "outside"

  // Animation properties
  animationType?: "auto" | "scroll"

  // Animation properties if animationType is auto
  duration?: number
  repeatCount?: number | "indefinite"
  from?: string
  to?: string
  easingFunction?: {
    calcMode?: string
    keyTimes?: string
    keySplines?: string
  }

  // Scroll animation properties if animationType is scroll
  scrollContainer?: RefObject<HTMLElement>
  scrollOffset?: [string, string]
  scrollTransformValues?: [number, number]
}

const AnimatedPathText = ({
  // Path defaults
  path,
  pathId = "animated-path",
  pathClassName,

  // SVG defaults
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  svgClassName,

  // Text defaults
  text,
  textClassName,
  textAnchor = "middle",
  side = "outside",

  // Animation type
  animationType = "auto",

  // Animation defaults
  duration = 4,
  repeatCount = "indefinite",
  from = "0%",
  to = "100%",

  easingFunction = {},

  // Scroll animation defaults
  scrollContainer,
  scrollOffset = ["start end", "end end"],
  scrollTransformValues = [0, 100],
  
}: AnimatedPathTextProps) => {
  const transform = side === "inside" ? "scale(1, -1)" : undefined

  const container = useRef<HTMLDivElement>(null)
  const textPathRefs = useRef<SVGTextPathElement[]>([])

  const { scrollYProgress } = useScroll({
    target: scrollContainer || container,
    container: scrollContainer || container,
    offset: ["start end", "end end"],
  })

  const t = useTransform(scrollYProgress, [0, 1], scrollTransformValues)

  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      textPathRefs.current.forEach((textPath, i) => {
        textPath.setAttribute("startOffset", `${t.get()}%`)
      })
    })
  }, [])

  const animationProps =
    animationType === "auto"
      ? {
          from: from,
          to: to,
          begin: "0s",
          dur: `${duration}s`,
          repeatCount: repeatCount,
          ...(easingFunction && easingFunction),
        }
      : null

  return (
    <svg
      className={svgClassName}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
    >
      <path id={pathId} className={pathClassName} d={path} fill="none" />

      {/* First text element */}
      <text textAnchor={textAnchor} transform={transform} fill="currentColor">
        <textPath
          className={textClassName}
          href={`#${pathId}`}
          startOffset={"0%"}
          ref={(ref) => (textPathRefs.current[0] = ref as SVGTextPathElement)}
        >
          {animationType === "auto" && (
            <animate attributeName="startOffset" {...animationProps} />
          )}
          {text}
        </textPath>
      </text>

      {/* Second text element (offset to hide the jump) */}
      {animationType === "auto" && (
        <text textAnchor={textAnchor} transform={transform} fill="currentColor">
          <textPath
            className={textClassName}
            href={`#${pathId}`}
            startOffset={"-100%"}
            ref={(ref) => (textPathRefs.current[1] = ref as SVGTextPathElement)}
          >
            {animationType === "auto" && (
              <animate
                attributeName="startOffset"
                {...animationProps}
                from="-100%"
                to="0%"
              />
            )}
            {text}
          </textPath>
        </text>
      )}
    </svg>
  )
}

export default AnimatedPathText
