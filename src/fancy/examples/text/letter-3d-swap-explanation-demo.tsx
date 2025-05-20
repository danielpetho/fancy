"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface AxisHelperProps {
  axisLength: number
}

export const AxisHelper = ({ axisLength }: AxisHelperProps) => {
  // Arrowhead size
  const arrowSize = 12

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transform-3d ">
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
  const totalSteps = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev === totalSteps - 1) {
          // Wait longer on the last step
          return 0
        }
        return prev + 1
      })
    }, step === totalSteps - 1 ? 4000 : 2000) // 4 seconds for last step, 2 seconds for others

    return () => clearInterval(interval)
  }, [step])

  const getTransform = () => {
    switch (step) {
      case 0:
        return "translateX(30%) rotateY(90deg) translateX(50%) rotateY(-90deg)"
      case 1:
        return "translateX(30%) rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%)"
      case 2:
        return "translateX(30%) rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg)"
      case 3:
        return "translateX(30%) rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(-50%)"
      default:
        return ""
    }
  }

  const getDisplayTransform = () => {
    switch (step) {
      case 0:
        return [""]
      case 1:
        return ["translateX(50%)"]
      case 2:
        return ["translateX(50%)", "rotateY(-90deg)"]
      case 3:
        return ["translateX(50%)", "rotateY(-90deg)", "translateX(-50%)"]
      default:
        return []
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center max-w-2xl">
        <div className="transform-3d perspective-1000">
          <motion.div
            className="text-9xl transform-3d relative"
            style={{ transform: "rotateX(-25deg) rotateY(-45deg)" }}
          >
            {/* Axes helper */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-3d">
              <AxisHelper axisLength={200} />
            </div>

            {/* Front face */}
            <div
              className="relative border border-black h-[1lh] bg-gray-200"
              style={{
                transform:
                  "translateX(30%) rotateY(90deg) translateX(50%) rotateY(-90deg) translateZ(0.001lh)",
              }}
            >
              A
            </div>

            {/* Second face */}
            <motion.div
              className="absolute top-0 left-0 border border-black opacity-60 h-[1lh] bg-gray-200"
              animate={{ transform: getTransform() }}
              transition={{
                ease: "easeInOut",
                duration: 1,
              }}
            >
              A
            </motion.div>
          </motion.div>
        </div>

        {/* Transform display */}
        <motion.div
          layout
          className="font-mono text-sm absolute bottom-1/5 text-muted-foreground flex items-center gap-2 w-1/2"
        >
          {getDisplayTransform().map((transform, index) => (
            <motion.span
              key={transform}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              layout
            >
              {transform}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
