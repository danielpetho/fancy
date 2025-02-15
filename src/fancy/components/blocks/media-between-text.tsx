"use client"

import { useRef, useState, forwardRef, useImperativeHandle } from "react"
import { motion,  useInView, UseInViewOptions, Variants } from "motion/react"
import { cn } from "@/lib/utils"

type MediaBetweenTextProps = {
  firstWord: string
  secondWord: string
  // Media props
  mediaUrl: string
  mediaType: "image" | "video"
  mediaContainerClassName?: string
  fallbackUrl?: string
  // Animation props
  triggerType?: "hover" | "ref" | "inView"
  containerRef?: React.RefObject<HTMLDivElement>
  useInViewOptionsProp?: UseInViewOptions
  cursorAnimationVariants?: {
    initial: Variants["initial"]
    animate: Variants["animate"]
  }
  className?: string
  // Text styling
  leftTextClassName?: string
  rightTextClassName?: string
}

export type MediaBetweenTextRef = {
  animate: () => void
  reset: () => void
}

export const MediaBetweenText = forwardRef<MediaBetweenTextRef, MediaBetweenTextProps>(({
  firstWord,
  secondWord,
  mediaUrl,
  mediaType,
  mediaContainerClassName,
  fallbackUrl,
  triggerType = "hover",
  containerRef,
  useInViewOptionsProp = {
    once: true,
    amount: 0.5,
    root: containerRef,
  },
  cursorAnimationVariants = {
    initial: { width: 0, opacity: 1},
    animate: { width: "auto", opacity: 1, transition: { duration: 0.4, type: "spring", bounce: 0 }  },
  },
  className,
  leftTextClassName,
  rightTextClassName
}, ref) => {
  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const isInView = triggerType === "inView" ? useInView(componentRef || containerRef, useInViewOptionsProp) : false
  const [isHovered, setIsHovered] = useState(false)

  useImperativeHandle(ref, () => ({
    animate: () => setIsAnimating(true),
    reset: () => setIsAnimating(false)
  }))

  const shouldAnimate = 
    triggerType === "hover" ? isHovered :
    triggerType === "inView" ? isInView :
    triggerType === "ref" ? isAnimating :
    false

  return (
    <div
      className={cn("flex", className)}
      ref={componentRef}
      onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
      onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
    >
      <motion.p layout className={leftTextClassName}>{firstWord}</motion.p>
      <motion.div
        className={mediaContainerClassName}
        variants={cursorAnimationVariants}
        initial="initial"
        animate={shouldAnimate ? "animate" : "initial"}
      >
        {mediaType === "video" ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            poster={fallbackUrl}
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt={`${firstWord} ${secondWord}`}
            className="w-full h-full object-cover"
            ref={mediaRef as React.RefObject<HTMLImageElement>}
          />
        )}
      </motion.div>
      <motion.p layout className={rightTextClassName}>{secondWord}</motion.p>
    </div>
  )
})

MediaBetweenText.displayName = "MediaBetweenText"

export default MediaBetweenText
