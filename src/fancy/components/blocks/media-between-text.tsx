"use client"

import { ElementType, forwardRef, useImperativeHandle, useRef, useState } from "react"
import { motion, useInView, UseInViewOptions, Variants } from "motion/react"

import { cn } from "@/lib/utils"

interface MediaBetweenTextProps {
  /**
   * The text to display before the media
   */
  firstText: string

  /**
   * The text to display after the media
   */
  secondText: string

  /**
   * URL of the media (image or video) to display
   */
  mediaUrl: string

  /**
   * Type of media to display
   */
  mediaType: "image" | "video"

  /**
   * Optional class name for the media container
   */
  mediaContainerClassName?: string

  /**
   * Fallback URL for video poster or image loading
   */
  fallbackUrl?: string

  /**
   * HTML Tag to render the text elements as
   * @default p
   */
  as?: ElementType

  /**
   * Whether video should autoplay
   * @default true
   */
  autoPlay?: boolean

  /**
   * Whether video should loop
   * @default true
   */
  loop?: boolean

  /**
   * Whether video should be muted
   * @default true
   */
  muted?: boolean

  /**
   * Whether video should play inline
   * @default true
   */
  playsInline?: boolean

  /**
   * Alt text for image
   */
  alt?: string

  /**
   * Type of animation trigger
   * @default "hover"
   */
  triggerType?: "hover" | "ref" | "inView"

  /**
   * Reference to container element for inView trigger
   */
  containerRef?: React.RefObject<HTMLDivElement | null>

  /**
   * Options for useInView hook
   */
  useInViewOptionsProp?: UseInViewOptions

  /**
   * Custom animation variants
   */
  animationVariants?: {
    initial: Variants["initial"]
    animate: Variants["animate"]
  }

  /**
   * Optional class name for the root element
   */
  className?: string

  /**
   * Optional class name for the left text element
   */
  leftTextClassName?: string

  /**
   * Optional class name for the right text element
   */
  rightTextClassName?: string
}

export type MediaBetweenTextRef = {
  animate: () => void
  reset: () => void
}

export const MediaBetweenText = forwardRef<
  MediaBetweenTextRef,
  MediaBetweenTextProps
>(
  (
    {
      firstText,
      secondText,
      mediaUrl,
      mediaType,
      mediaContainerClassName,
      fallbackUrl,
      as = "p",
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
        initial: { width: 0, opacity: 1 },
        animate: {
          width: "auto",
          opacity: 1,
          transition: { duration: 0.4, type: "spring", bounce: 0 },
        },
      },
      className,
      leftTextClassName,
      rightTextClassName,
    },
    ref
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    const isInView =
      triggerType === "inView"
        ? useInView(componentRef || containerRef, useInViewOptionsProp)
        : false
    const [isHovered, setIsHovered] = useState(false)

    useImperativeHandle(ref, () => ({
      animate: () => setIsAnimating(true),
      reset: () => setIsAnimating(false),
    }))

    const shouldAnimate =
      triggerType === "hover"
        ? isHovered
        : triggerType === "inView"
          ? isInView
          : triggerType === "ref"
            ? isAnimating
            : false

    const TextComponent = motion.create(as)

    return (
      <div
        className={cn("flex", className)}
        ref={componentRef}
        onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
        onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
      >
        <TextComponent layout className={leftTextClassName}>
          {firstText}
        </TextComponent>
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
        <TextComponent layout className={rightTextClassName}>
          {secondText}
        </TextComponent>
      </div>
    )
  }
)

MediaBetweenText.displayName = "MediaBetweenText"

export default MediaBetweenText
