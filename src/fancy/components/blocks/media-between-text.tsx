"use client"

import { useRef, useState, forwardRef, useImperativeHandle } from "react"
import { motion,  useInView, UseInViewOptions, Variants } from "motion/react"
import { cn } from "@/lib/utils"

type MediaBetweenTextProps = {
  firstText: string
  secondText: string
  // Media props
  mediaUrl: string
  mediaType: "image" | "video"
  mediaContainerClassName?: string
  fallbackUrl?: string
  // Video props
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  // Image props
  alt?: string
  // Animation props
  triggerType?: "hover" | "ref" | "inView"
  containerRef?: React.RefObject<HTMLDivElement>
  useInViewOptionsProp?: UseInViewOptions
  animationVariants?: {
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
  firstText,
  secondText,
  mediaUrl,
  mediaType,
  mediaContainerClassName,
  fallbackUrl,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  alt,
  triggerType = "hover",
  containerRef,
  useInViewOptionsProp = {
    once: true,
    amount: 0.5,
    root: containerRef,
  },
  animationVariants = {
    initial: { width: 0, opacity: 1},
    animate: { width: "auto", opacity: 1, transition: { duration: 0.4, type: "spring", bounce: 0 }  },
  },
  className,
  leftTextClassName,
  rightTextClassName
}, ref) => {
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
      <motion.p layout className={leftTextClassName}>{firstText}</motion.p>
      <motion.div
        className={mediaContainerClassName}
        variants={animationVariants}
        initial="initial"
        animate={shouldAnimate ? "animate" : "initial"}
      >
        {mediaType === "video" ? (
          <video
            className="w-full h-full object-cover"
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            poster={fallbackUrl}
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt={alt || `${firstText} ${secondText}`}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
      <motion.p layout className={rightTextClassName}>{secondText}</motion.p>
    </div>
  )
})

MediaBetweenText.displayName = "MediaBetweenText"

export default MediaBetweenText
