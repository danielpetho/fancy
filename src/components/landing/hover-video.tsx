import { useState } from "react"
import { motion } from "framer-motion"

interface HoverVideoProps {
  thumbnail: string // URL for the image
  videoSrc: string // URL for the video
  className?: string // Optional additional styling
  delay?: number // Optional delay for the animation
}

const HoverVideo: React.FC<HoverVideoProps> = ({
  thumbnail,
  videoSrc,
  className,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: delay }}
    >
      {/* Thumbnail */}
      <motion.img
        src={thumbnail}
        alt="Thumbnail"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0 }}
      />
      {/* Video */}
      <motion.video
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        poster={thumbnail}
        playsInline
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0 }}
      />
    </motion.div>
  )
}

export default HoverVideo
