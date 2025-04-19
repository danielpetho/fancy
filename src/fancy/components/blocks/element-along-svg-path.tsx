import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  motion,
  MotionValue,
  useMotionValue,
  useScroll,
  UseScrollOptions,
  useSpring,
  useTime,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

type PreserveAspectRatioAlign =
  | "none"
  | "xMinYMin"
  | "xMidYMin"
  | "xMaxYMin"
  | "xMinYMid"
  | "xMidYMid"
  | "xMaxYMid"
  | "xMinYMax"
  | "xMidYMax"
  | "xMaxYMax"

type PreserveAspectRatioMeetOrSlice = "meet" | "slice"

type PreserveAspectRatio =
  | PreserveAspectRatioAlign
  | `${Exclude<PreserveAspectRatioAlign, "none">} ${PreserveAspectRatioMeetOrSlice}`

interface ElementAlongPathProps {
  // Path properties
  path: string
  pathId?: string
  className?: string
  preserveAspectRatio?: PreserveAspectRatio
  showPath?: boolean
  direction?: "normal" | "reverse"

  // SVG properties
  width?: string | number
  height?: string | number
  viewBox?: string

  // Animation properties
  animationType?: "auto" | "scroll"

  // Animation properties if animationType is auto
  duration?: number
  transition?: any

  // Scroll animation properties if animationType is scroll
  scrollContainer?: RefObject<HTMLElement>
  scrollOffset?: UseScrollOptions["offset"]
  scrollTransformValues?: [number, number]

  // Children
  children?: React.ReactNode
}

interface ElementAlongPathItemProps {
  children: React.ReactNode
  className?: string
  startOffset?: number // 0-100 percentage
  transition?: any // Override parent transition
}

// Create context
const ElementAlongPathContext = createContext<{
  path: string
  animationType: "auto" | "scroll"
  direction: "normal" | "reverse" // Add direction to context
  progress: MotionValue<number>
  scrollYProgress: MotionValue<number>
  scrollTransformValues: [number, number]
  transition: any
  setHovered: (isHovered: boolean) => void
} | null>(null)

// Context hook
export const useElementAlongPathContext = () => {
  const context = useContext(ElementAlongPathContext)
  if (!context) {
    throw new Error("ElementAlongPathItem must be used within ElementAlongPath")
  }
  return context
}

// Item component
export const ElementAlongPathItem = ({
  children,
  className,
  startOffset = 0,
  transition: itemTransition,
}: ElementAlongPathItemProps) => {
  const {
    path,
    animationType,
    progress,
    scrollYProgress,
    scrollTransformValues,
    direction,
    transition: parentTransition,
    setHovered,
  } = useElementAlongPathContext()

  // Use item transition if provided, otherwise use parent transition
  const transition = itemTransition || parentTransition

  const initialOffset =
    direction === "normal" ? `${startOffset}%` : `${100 - startOffset}%`
  const animateOffset = direction === "normal" ? "100%" : "0%"

  const scp = useTransform(
    scrollYProgress,
    [0, 1],
    [scrollTransformValues[0], scrollTransformValues[1]]
  )

  return (
    <motion.div
      className={cn("absolute top-0 left-0", className)}
      initial={{ offsetDistance: initialOffset }}
      animate={{
        offsetDistance: animationType === "auto" ? animateOffset : undefined,
      }}
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance: animationType === "scroll" ? scp : undefined,
      }}
      transition={transition}
      // onHoverStart={() => setHovered(true)}
      // onHoverEnd={() => setHovered(false)}
    >
      {children}
    </motion.div>
  )
}

const ElementAlongPath = ({
  children,
  // Path defaults
  path,
  pathId,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,
  className,

  // SVG defaults
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",

  // Animation type
  animationType = "auto",
  direction = "normal",

  // Animation defaults
  duration = 4,
  transition = { duration: 4, repeat: Infinity, ease: "linear" },

  // Scroll animation defaults
  scrollContainer,
  scrollOffset = ["start end", "end end"],
  scrollTransformValues = [0, 100],
}: ElementAlongPathProps) => {
  const container = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Create a time scale factor that changes based on hover state
  const timeScale = useMotionValue(1)

  // Update time scale when hover state changes
  useEffect(() => {
    timeScale.set(isHovered ? 0.3 : 1) // Slow down to 30% speed when hovered
  }, [isHovered, timeScale])

  // Create a spring-based time scale for smooth transitions
  const smoothTimeScale = useSpring(timeScale, {
    stiffness: 100,
    damping: 30,
  })

  const t = useTime()
  const scaledTime = useTransform(t, (time) => time * smoothTimeScale.get())

  const progress = useTransform(
    scaledTime,
    [0, duration],
    direction === "normal" ? [0, 100] : [100, 0]
  )
  // naive id for the path. you should rather use yours :)
  const id =
    pathId || `animated-path-${Math.random().toString(36).substring(7)}`

  const { scrollYProgress } = useScroll({
    container: scrollContainer || container,
    offset: scrollOffset,
  })

  // Adjust scroll progress based on direction
  const scrollProgressValues =
    direction === "normal"
      ? [scrollTransformValues[0], scrollTransformValues[1]]
      : [scrollTransformValues[1], scrollTransformValues[0]]

  const scrollProgress = useTransform(
    scrollYProgress,
    [0, 1],
    scrollProgressValues
  )

  // Create the progress value based on animation type
  const finalProgress = animationType === "auto" ? progress : scrollProgress

  return (
    <ElementAlongPathContext.Provider
      value={{
        path,
        animationType,
        direction,
        progress: finalProgress,
        scrollYProgress,
        scrollTransformValues,
        transition: {
          ...transition,
        },
        setHovered: setIsHovered,
      }}
    >
      <div
        ref={container}
        className={cn("relative", className)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          width={width}
          height={height}
          preserveAspectRatio={preserveAspectRatio}
          className="w-full h-full"
        >
          <motion.path
            id={id}
            d={path}
            // initial={{ pathLength: 0.001 }}
            // animate={{ pathLength: 1 }}
            stroke={showPath ? "currentColor" : "none"}
            fill="none"
            transition={transition}
          />
        </svg>
        {children}
      </div>
    </ElementAlongPathContext.Provider>
  )
}

export default ElementAlongPath
