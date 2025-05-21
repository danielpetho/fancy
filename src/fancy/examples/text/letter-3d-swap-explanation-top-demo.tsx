/*
 * If you're reading this file, you're probably looking for the explanation demo.
 * Keep in my mind this demo contains some extra transforms that are only needed
 * for making the animation prettier, and not necessary for the actual functionality.
 * There is a lot of messy code here, so I advise you not to try learn from it.
 * Please refer to the actual documentation for more details.
 */
"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

interface AxisHelperProps {
  axisLength: number
}

export const AxisHelper = ({ axisLength }: AxisHelperProps) => {
  // Arrowhead size
  const arrowSize = 12

  return (
    <div
      className="pointer-events-none transform-3d"
      style={{
        transform: "translateY(-100px) translateZ(-100px) translateX(-100px)",
      }}
    >
      {/* X axis (red, right) */}
      <svg
        width={axisLength + arrowSize}
        height={arrowSize * 2}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translateY(-${arrowSize}px)`,
        }}
      >
        <line
          x1={0}
          y1={arrowSize}
          x2={axisLength}
          y2={arrowSize}
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth={2}
          strokeDasharray="6,4"
        />
        <polygon
          points={`
              ${axisLength},${arrowSize}
              ${axisLength - arrowSize},${arrowSize - 5}
              ${axisLength - arrowSize},${arrowSize + 5}
            `}
          fill="currentColor"
        />
      </svg>

      {/* Y axis (green, up) */}
      <svg
        width={arrowSize * 10}
        height={axisLength + arrowSize}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translateX(-${arrowSize}px) translateY(-${axisLength}px)`,
        }}
      >
        <line
          x1={arrowSize}
          y1={axisLength}
          x2={arrowSize}
          y2={0}
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth={2}
          strokeDasharray="6,4"
        />
        <polygon
          points={`
              ${arrowSize},0
              ${arrowSize - 5},${arrowSize}
              ${arrowSize + 5},${arrowSize}
            `}
          fill="currentColor"
        />
      </svg>

      <svg
        width={arrowSize * 2}
        height={axisLength + arrowSize}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translateX(-${arrowSize * 1.8}px) translateY(-${axisLength}px) rotateX(90deg) rotateY(90deg) translateX(${axisLength / 2}px) rotateX(180deg) translateY(-${axisLength / 2 - arrowSize * 1}px)`,
        }}
      >
        <line
          x1={arrowSize}
          y1={axisLength}
          x2={arrowSize}
          y2={0}
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth={2}
          strokeDasharray="6,4"
        />
        <polygon
          points={`
              ${arrowSize},0
              ${arrowSize - 5},${arrowSize}
              ${arrowSize + 5},${arrowSize}
            `}
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
export default function Preview() {
  const [step, setStep] = useState(0)
  const totalSteps = 5

  useEffect(() => {
    const interval = setInterval(
      () => {
        setStep((prev) => {
          if (prev === totalSteps - 1) {
            // Wait longer on the last step
            return 0
          }
          return prev + 1
        })
      },
      step === totalSteps - 1 ? 5000 : 3000
    ) // 4 seconds for last step, 2 seconds for others

    return () => clearInterval(interval)
  }, [step])

  const getSecondFaceTransform = () => {
    switch (step) {
      case 0:
        return `rotateX(0deg)`
      case 1:
        return `rotateX(0deg)`
      case 2:
        return "rotateX(90deg)"
      case 3:
        return "rotateX(90deg) translateZ(0.5lh)"
      case 4:
        return "rotateX(90deg) translateZ(0.5lh)"
      default:
        return "rotateX(0deg)"
    }
  }

  const getFirstFaceTransform = () => {
    switch (step) {
      case 0:
        return "translateZ(0lh)"
      case 1:
        return "translateZ(0.5lh)"
      case 2:
        return "translateZ(0.5lh)"
      case 3:
        return "translateZ(0.5lh)"
      case 4:
        return "translateZ(0.5lh)"
      default:
        return "translateZ(0lh)"
    }
  }

  const getContainerTransform = () => {
    switch (step) {
      case 0:
        return "translateZ(0)"
      case 1:
        return "translateZ(0)"
      case 2:
        return "translateZ(0)"
      case 3:
        return "translateZ(0)"
      case 4:
        return "translateZ(-0.5lh)"
      default:
        return "translateZ(0)"
    }
  }

  const getDisplayTransform = () => {
    switch (step) {
      case 0:
        return [" ", " "]
      case 1:
        return ["1st face:", "translateZ(0.5lh)"]
      case 2:
        return ["2nd face:", "rotateX(90deg)"]
      case 3:
        return ["2nd face:", "rotateX(90deg) translateZ(0.5lh)"]
      case 4:
        return ["container:", "translateZ(-0.5lh)"]
      default:
        return [" ", " "]
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center max-w-2xl">
        <motion.div
          className="text-9xl transform-3d perspective-1000"
          style={{ transform: "rotateX(-25deg) rotateY(-45deg)" }}
        >
          {/* Axes helper */}
          <div className="absolute top-[150%] left-1/2 -translate-x-1/2 -translate-y-1/2 transform-3d">
            <AxisHelper axisLength={200} />
          </div>

          <motion.div
            className="transform-3d relative z-20 backface-hidden"
            animate={{ transform: getContainerTransform() }}
            transition={{
              ease: "easeInOut",
              duration: 1,
            }}
          >
            {/* Front face */}
            <motion.div
              className="border border-foreground h-[1lh] dark:bg-neutral-800 opacity-80 bg-gray-200 text-foreground"
              animate={{ transform: getFirstFaceTransform() }}
              transition={{
                ease: "easeInOut",
                duration: 1,
              }}
            >
              A
            </motion.div>

            {/* Second face */}
            <motion.div
              className="absolute top-0 left-0 border border-foreground opacity-60 h-[1lh] bg-gray-200 dark:bg-neutral-800 text-foreground"
              animate={{ transform: getSecondFaceTransform() }}
              transition={{
                ease: "easeInOut",
                duration: 1,
              }}
            >
              A
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Transform display */}
        <div className="absolute bottom-1/6 flex items-center h-[1lh] w-full px-16 sm:px-0 sm:w-64">
          <div className="flex w-1/3  min-w-12 min-h-[1lh]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={getDisplayTransform()[0]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: 0, ease: "easeOut" }}
                className="font-overusedGrotesk text-muted-foreground  w-full text-end"
              >
                {getDisplayTransform()[0]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex w-2/3 min-w-12 min-h-[1lh]">
            <AnimatePresence mode="wait">
              <motion.span
                key={getDisplayTransform()[1]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: 0, ease: "easeOut" }}
                className="pl-8 font-mono w-full text-muted-foreground  "
              >
                {getDisplayTransform()[1]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
