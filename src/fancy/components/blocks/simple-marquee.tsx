import { RefObject, useEffect, useRef, useState } from "react"
import {
  motion,
  PanInfo,
  SpringOptions,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

// Custom wrap function to replace the one from @motionone/utils
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

interface SimpleMarqueeProps {
  children: React.ReactNode
  className?: string
  direction?: "left" | "right" | "up" | "down"
  baseVelocity?: number
  slowdownOnHover?: boolean
  slowDownFactor?: number
  slowDownSpringConfig?: SpringOptions
  useScrollVelocity?: boolean
  scrollAwareDirection?: boolean
  scrollSpringConfig?: SpringOptions
  scrollContainer?: RefObject<HTMLElement> | HTMLElement | null
  repeat?: number
  draggable?: boolean
  easing?: (value: number) => number
  delay?: number
}

const SimpleMarquee = ({
  children,
  className,
  direction = "right",
  baseVelocity = 5, // pixels per second
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,
  repeat = 3,
  draggable = false,
  easing,
  delay = 0,
}: SimpleMarqueeProps) => {
  const innterContainer = useRef<HTMLDivElement>(null)
  const baseX = useMotionValue(0)
  const baseY = useMotionValue(0)

  const lastCycleTime = useRef(0)
  const isPaused = useRef(false)
  
  const { scrollY } = useScroll({
    container: scrollContainer as RefObject<HTMLDivElement> || innterContainer.current,
  })

  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig)

  const hoverFactorValue = useMotionValue(1)
  const defaultVelocity = useMotionValue(1)

  const [animationStarted, setAnimationStarted] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, delay * 1000); // Convert delay from seconds to milliseconds
    
    return () => clearTimeout(timer);
  }, [delay]);

  // Track if user is currently dragging
  const isDragging = useRef(false)
  // Store last drag position for calculating drag velocity
  const lastDragPosition = useRef({ x: 0, y: 0 })
  // Store drag velocity
  const dragVelocity = useRef(0)

  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig)

  // Transform scroll velocity into a factor that affects marquee speed
  const velocityFactor = useTransform(
    useScrollVelocity ? smoothVelocity : defaultVelocity,
    [0, 1000],
    [0, 5],
    {
      clamp: false,
    }
  )

  // Determine if movement is horizontal or vertical
  const isHorizontal = direction === "left" || direction === "right"

  // Convert baseVelocity to the correct direction
  const actualBaseVelocity =
    direction === "left" || direction === "up" ? -baseVelocity : baseVelocity

  // Reference to track if mouse is hovering
  const isHovered = useRef(false)

  // Direction factor for changing direction based on scroll
  const directionFactor = useRef(1)

  // Transform baseX/baseY into a percentage for the transform
  // The wrap function ensures the value stays between the specified range
  const x = useTransform(baseX, (v) => {
    // Apply easing if provided, otherwise use linear (v directly)
    const wrappedValue = wrap(0, -100, v)
    return `${easing ? easing(wrappedValue / -100) * -100 : wrappedValue}%`
  })
  const y = useTransform(baseY, (v) => {
    // Apply easing if provided, otherwise use linear (v directly)
    const wrappedValue = wrap(0, -100, v)
    return `${easing ? easing(wrappedValue / -100) * -100 : wrappedValue}%`
  })

  useAnimationFrame((t, delta) => {
    if (!animationStarted) return;

    // // Check if we're in a pause state
    // if (isPaused.current) {
    //   // Check if pause duration has elapsed
    //   if (t - lastCycleTime.current >= delay * 1000) {
    //     isPaused.current = false;
    //   } else {
    //     // Still in pause, don't animate
    //     return;
    //   }
    // }

    // // Check if we've completed a cycle (when baseX or baseY crosses a multiple of 100)
    // const currentPosition = isHorizontal ? baseX.get() : baseY.get();
    // if (Math.abs(currentPosition) % 100 < (delta / 1000) * Math.abs(actualBaseVelocity) * 2) {
    //   // We're crossing a cycle boundary
    //   if (delay > 0) {
    //     isPaused.current = true;
    //     lastCycleTime.current = t;
    //     return;
    //   }
    // }

    //console.log(isDragging.current, draggable)
    // if (isDragging.current && draggable) {
    //   if (isHorizontal) {
    //     baseX.set(baseX.get() + dragVelocity.current)
    //   } else {
    //     baseY.set(baseY.get() + dragVelocity.current)
    //   }

    //   // Add decay to dragVelocity when not moving
    //   // This will gradually reduce the velocity to zero when the pointer isn't moving
    //   dragVelocity.current *= 0.9

    //   // Stop completely if velocity is very small
    //   if (Math.abs(dragVelocity.current) < 0.01) {
    //     dragVelocity.current = 0
    //   }

    //   return
    // }

    // Update hover factor
    if (isHovered.current) {
      hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1)
    } else {
      hoverFactorValue.set(1)
    }

    // Calculate regular movement
    let moveBy =
      directionFactor.current *
      actualBaseVelocity *
      (delta / 1000) *
      smoothHoverFactor.get()

    // Adjust movement based on scroll velocity if scrollAwareDirection is enabled
    if (scrollAwareDirection) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    if (isHorizontal) {
      baseX.set(baseX.get() + moveBy)
    } else {
      baseY.set(baseY.get() + moveBy)
    }
  })

  const startPointerPosition = useRef({ x: 0, y: 0 })
  const lastPointerPosition = useRef({ x: 0, y: 0 })

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable)
      return // Capture the pointer to receive events even when pointer moves outside
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)

    isDragging.current = true
    startPointerPosition.current = { x: e.clientX, y: e.clientY }
    lastPointerPosition.current = { x: e.clientX, y: e.clientY }

    // Pause automatic animation by setting velocity to 0
    dragVelocity.current = 0
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggable || !isDragging.current) return

    const currentPosition = { x: e.clientX, y: e.clientY }

    // Calculate delta from last position
    const deltaX = currentPosition.x - lastPointerPosition.current.x
    const deltaY = currentPosition.y - lastPointerPosition.current.y

    // Update drag velocity based on movement
    if (isHorizontal) {
      dragVelocity.current = deltaX * 0.2
    } else {
      dragVelocity.current = deltaY * 0.2
    }

    console.log(dragVelocity.current)

    // Update last position
    lastPointerPosition.current = currentPosition
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggable) return // Release pointer capture
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)

    isDragging.current = false
    // Keep the drag velocity for smooth transition
    // It will decay naturally in the animation frame
  }

  return (
    <motion.div
      className={cn(
        " flex",
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
      onHoverStart={() => (isHovered.current = true)}
      onHoverEnd={() => (isHovered.current = false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      ref={innterContainer}
    >
      {Array.from({ length: repeat }, (_, i) => i).map((i) => (
        <motion.div
          key={i}
          className={cn(
            "shrink-0",
            isHorizontal && "flex",
            draggable && "cursor-grab",
            isDragging.current && "cursor-grabbing"
          )}
          style={isHorizontal ? { x } : { y }}
        >
          {children}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default SimpleMarquee
