"use client"

import { useEffect, useRef } from "react"
import {
  Activity,
  ArrowDownRight,
  DollarSign,
  LucideIcon,
  TrendingUp,
  Zap,
} from "lucide-react"
import { motion, useInView } from "motion/react"

import NumberTicker, {
  NumberTickerRef,
} from "@/fancy/components/text/basic-number-ticker"

const cards = [
  {
    title: "Revenue",
    icon: DollarSign,
    from: 0,
    target: 1250321,
    prefix: "$",
    suffix: "",
    gradient: "from-gray-100 to-blue-400",
    size: "large",
  },
  {
    title: "Conversion Rate",
    icon: TrendingUp,
    from: 0,
    target: 12.5,
    prefix: "",
    suffix: "%",
    gradient: "from-gray-100 to-purple-200",
    size: "small",
  },
  {
    title: "Bounce Rate",
    icon: ArrowDownRight,
    from: 100,
    target: 35.8,
    prefix: "",
    suffix: "%",
    gradient: "from-gray-100 to-orange-200",
    size: "small",
  },
  {
    title: "Avg. Session Duration",
    icon: Zap,
    from: 0,
    target: 245,
    prefix: "",
    suffix: "s",
    gradient: "from-gray-100 to-purple-200",
    size: "small",
  },
  {
    title: "New Users",
    icon: TrendingUp,
    from: 0,
    target: 15420,
    prefix: "",
    suffix: "",
    gradient: "from-gray-100 to-orange-200",
    size: "small",
  },
  {
    title: "Active Users",
    icon: Activity,
    from: 0,
    target: 8750,
    prefix: "",
    suffix: "",
    gradient: "from-gray-100 to-blue-200",
    size: "small",
  },
]

interface CardProps {
  title: string
  icon: LucideIcon
  from: number
  target: number
  prefix: string
  suffix: string
  gradient: string
  size: string
}

const Card = ({ card, index }: { card: CardProps; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<NumberTickerRef>(null)
  const inView = useInView(cardRef, { once: false })

  useEffect(() => {
    if (inView) {
      tickerRef.current?.startAnimation()
    }
  }, [inView])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-6 bg-linear-to-b from-50% to-130% flex justify-between flex-col text-foreground dark:text-muted ${
        card.gradient
      } ${card.size === "large" ? "col-span-2 row-span-2" : ""}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs md:text-sm">{card.title}</h3>
        <card.icon className={`h-4 w-4`} />
      </div>
      <div
        className={`${card.size === "large" ? "text-2xl md:text-5xl" : "text-xl md:text-3xl"}`}
      >
        {card.prefix}
        <NumberTicker
          ref={tickerRef}
          from={card.from}
          target={card.target}
          transition={{
            duration: 3,
            ease: "easeInOut",
            type: "tween",
            delay: index * 0.2,
          }}
          className="tabular-nums"
          autoStart={false}
        />
        {card.suffix}
      </div>
    </motion.div>
  )
}

export default function FancyNumberTickerDemo() {
  return (
    <div className="w-full h-full font-azeret-mono bg-white">
      <div className="grid grid-cols-3 grid-rows-2 h-full">
        {cards.map((card, index) => (
          <Card key={index} card={card} index={index} />
        ))}
      </div>
    </div>
  )
}
