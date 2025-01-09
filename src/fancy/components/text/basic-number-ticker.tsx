"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"
import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
  useTransform,
  ValueAnimationTransition,
} from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps {
  from: number // Starting value of the animation
  target: number // End value of the animation
  transition?: ValueAnimationTransition // Animation configuration, refer to motion docs for more details
  className?: string // additionl CSS classes for styling
  onStart?: () => void // Callback function when animation starts
  onComplete?: () => void // Callback function when animation completes
  autoStart?: boolean // Whether to start the animation automatically
}

// Ref interface to allow external control of the animation
export interface NumberTickerRef {
  startAnimation: () => void
}

const NumberTicker = forwardRef<NumberTickerRef, NumberTickerProps>(
  (
    {
      from = 0,
      target = 100,
      transition = {
        duration: 3,
        type: "tween",
        ease: "easeInOut",
      },
      className,
      onStart,
      onComplete,
      autoStart = true,
      ...props
    },
    ref
  ) => {
    const count = useMotionValue(from)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const [controls, setControls] = useState<AnimationPlaybackControls | null>(
      null
    )

    // Function to start the animation
    const startAnimation = useCallback(() => {
      if (controls) controls.stop()
      onStart?.()

      count.set(from)

      const newControls = animate(count, target, {
        ...transition,
        onComplete: () => {
          onComplete?.()
        },
      })
      setControls(newControls)
    }, [])

    // Expose the startAnimation function via ref
    useImperativeHandle(ref, () => ({
      startAnimation,
    }))

    useEffect(() => {
      if (autoStart) {
        startAnimation()
      }
      return () => controls?.stop()
    }, [autoStart])

    return (
      <motion.span className={cn(className)} {...props}>
        {rounded}
      </motion.span>
    )
  }
)

NumberTicker.displayName = "NumberTicker"

export default NumberTicker

// Usage example:
// To start the animation from outside the component:
// 1. Create a ref:
//    const tickerRef = useRef<NumberTickerRef>(null);
// 2. Pass the ref to the NumberTicker component:
//    <NumberTicker ref={tickerRef} from={0} target={100} autoStart={false} />
// 3. Call the startAnimation function:
//    tickerRef.current?.startAnimation();
