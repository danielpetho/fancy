"use client"

import React from "react"

import AnimatedGradient from "@/fancy/components/background/animated-gradient-with-svg"

interface BentoCardProps {
  title: string
  subtitle?: string
  description?: string
  buttonText?: string
  align?: "left" | "center"
}

const gradientColors = ["#FF0000", "#FF4500", "#FF9900"]

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  align = "left",
}) => (
  <div className="relative overflow-hidden rounded-2xl min-h-[120px] sm:min-h-[180px] h-full w-full flex flex-col justify-between p-4 sm:p-6 font-medium">
    <span className="absolute inset-0 z-0 pointer-events-none bg-[#ff592f]">
      <AnimatedGradient colors={gradientColors} speed={10} blur="medium" />
    </span>
    <div
      className={`relative z-10 flex-1 ${align === "center" ? "items-center text-center" : "items-start text-left"} flex flex-col justify-between w-full h-full`}
    >
      <div>
        <div className="text-white text-xs sm:text-sm md:text-base font-semibold -mb-0.5">
          {title}
        </div>
        {subtitle && (
          <div className="text-white/80 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2">
            {subtitle}
          </div>
        )}
      </div>
      {description && (
        <div className="text-white text-[10px] sm:text-xs mt-auto mb-1 sm:mb-2 text-pretty leading-tight">{description}</div>
      )}
      {buttonText && (
        <button className="mt-2 sm:mt-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white text-white text-[10px] sm:text-xs font-medium transition-colors cursor-pointer">
          {buttonText}
        </button>
      )}
    </div>
  </div>
)

const AnimatedGradientDemo: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background px-20 sm:px-8 py-8 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 w-full max-w-lg">
        {/* Top left card */}
        <div className="sm:col-span-8 h-32 sm:h-48">
          <BentoCard
            title="Animated Bento"
            subtitle="#001"
            description="Using only SVG circles and blur"
          />
        </div>
        {/* Top right card */}
        <div className="h-32 sm:h-48 sm:col-span-4">
          <BentoCard title="Gradients" buttonText="Explore More"  />
        </div>
      </div>
    </div>
  )
}

export default AnimatedGradientDemo
