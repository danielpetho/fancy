import { RefObject, useRef } from "react"
import {
  motion,
  SpringOptions,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

// Custom wrap function
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

interface SimpleMarqueeProps {
  children: React.ReactNode // The elements to be scrolled
  className?: string // Additional CSS classes for the container
  direction?: "left" | "right" | "up" | "down" // The direction of the marquee
  baseVelocity?: number // The base velocity of the marquee in pixels per second
  easing?: (value: number) => number // The easing function for the animation
  slowdownOnHover?: boolean // Whether to slow down the animation on hover
  slowDownFactor?: number // The factor to slow down the animation on hover
  slowDownSpringConfig?: SpringOptions // The spring config for the slow down animation
  useScrollVelocity?: boolean // Whether to use the scroll velocity to control the marquee speed
  scrollAwareDirection?: boolean // Whether to adjust the direction based on the scroll direction
  scrollSpringConfig?: SpringOptions // The spring config for the scroll velocity-based direction adjustment
  scrollContainer?: RefObject<HTMLElement> | HTMLElement | null // The container to use for the scroll velocity
  repeat?: number // The number of times to repeat the children.
  draggable?: boolean // Whether to allow dragging of the marquee
  dragSensitivity?: number // The sensitivity of the drag movement
  dragVelocityDecay?: number // The decay of the drag velocity. This means how fast the velocity will gradually reduce to baseVelocity when we release the drag
  dragAwareDirection?: boolean // Whether to adjust the direction based on the drag velocity
  dragAngle?: number // The angle of the drag movement in degrees. This is useful if you eg. rotating your marquee by 45 degrees
  grabCursor?: boolean // Whether to change the cursor to grabbing when dragging
}

const SimpleMarquee = ({
  children,
  className,
  direction = "right",
  baseVelocity = 5,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,
  repeat = 3,
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  dragAngle = 0,
  grabCursor = false,
  easing,
}: SimpleMarqueeProps) => {
  const innerContainer = useRef<HTMLDivElement>(null)
  const baseX = useMotionValue(0)
  const baseY = useMotionValue(0)

  const { scrollY } = useScroll({
    container:
      (scrollContainer as RefObject<HTMLDivElement>) || innerContainer.current,
  })

  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig)

  const hoverFactorValue = useMotionValue(1)
  const defaultVelocity = useMotionValue(1)

  // Track if user is currently dragging
  const isDragging = useRef(false)

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

  // Determine if movement is horizontal or vertical.
  const isHorizontal = direction === "left" || direction === "right"

  // Convert baseVelocity to the correct direction
  const actualBaseVelocity =
    direction === "left" || direction === "up" ? -baseVelocity : baseVelocity

  // Reference to track if mouse is hovering
  const isHovered = useRef(false)

  // Direction factor for changing direction based on scroll or drag
  const directionFactor = useRef(1)

  // Transform baseX/baseY into a percentage for the transform
  // The wrap function ensures the value stays between 0 and -100
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
    if (isDragging.current && draggable) {
      if (isHorizontal) {
        baseX.set(baseX.get() + dragVelocity.current)
      } else {
        baseY.set(baseY.get() + dragVelocity.current)
      }

      // Add decay to dragVelocity when not moving
      // This will gradually reduce the velocity to zero when the pointer isn't moving
      dragVelocity.current *= 0.9

      // Stop completely if velocity is very small
      if (Math.abs(dragVelocity.current) < 0.01) {
        dragVelocity.current = 0
      }

      return
    }

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
    if (scrollAwareDirection && !isDragging.current) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    if (draggable) {
      moveBy += dragVelocity.current

      // Update direction based on drag direction if dragAwareDirection is true
      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        // If dragging in negative direction, set directionFactor to -1
        // If dragging in positive direction, set directionFactor to 1
        directionFactor.current = Math.sign(dragVelocity.current)
      }

      // Gradually decay drag velocity back to zero
      if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) {
        dragVelocity.current *= dragVelocityDecay
      } else if (!isDragging.current) {
        dragVelocity.current = 0
      }
    }

    if (isHorizontal) {
      baseX.set(baseX.get() + moveBy)
    } else {
      baseY.set(baseY.get() + moveBy)
    }
  })

  const lastPointerPosition = useRef({ x: 0, y: 0 })

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable)
      return // Capture the pointer to receive events even when pointer moves outside
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)

    if (grabCursor) {
      ;(e.currentTarget as HTMLElement).style.cursor = "grabbing"
    }

    isDragging.current = true
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

    // Convert dragAngle from degrees to radians
    const angleInRadians = (dragAngle * Math.PI) / 180

    // Calculate the projection of the movement along the angle direction
    // Using the dot product of the movement vector and the direction vector
    const directionX = Math.cos(angleInRadians)
    const directionY = Math.sin(angleInRadians)

    // Project the movement onto the angle direction
    const projectedDelta = deltaX * directionX + deltaY * directionY

    // Update drag velocity based on the projected movement
    dragVelocity.current = projectedDelta * dragSensitivity

    // Update last position
    lastPointerPosition.current = currentPosition
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggable) return // Release pointer capture
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)

    isDragging.current = false
  }

  return (
    <motion.div
      className={cn("flex", isHorizontal ? "flex-row" : "flex-col", className)}
      onHoverStart={() => (isHovered.current = true)}
      onHoverEnd={() => (isHovered.current = false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      ref={innerContainer}
    >
      {Array.from({ length: repeat }, (_, i) => i).map((i) => (
        <motion.div
          key={i}
          className={cn(
            "shrink-0",
            isHorizontal && "flex",
            draggable && grabCursor && "cursor-grab"
          )}
          style={isHorizontal ? { x } : { y }}
          aria-hidden={i > 0}
        >
          {children}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default SimpleMarquee