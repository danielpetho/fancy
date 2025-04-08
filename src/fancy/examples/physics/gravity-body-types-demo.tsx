import {
  Atom,
  AudioLines,
  BatteryCharging,
  Brain,
  Cloud,
  Cog,
  Cpu,
  Cuboid,
  Earth,
  Eye,
  Globe,
  HandMetal,
  Heart,
  Laptop,
  Layers,
  MessageCircle,
  Microscope,
  Move,
  PaintRoller,
  PersonStanding,
  Pyramid,
  Regex,
  Rocket,
  Satellite,
  Save,
  ScanFace,
  Settings,
  Sigma,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react"

import Gravity, { MatterBody } from "@/fancy/components/physics/gravity"

export default function Preview() {
  const icons = [
    { icon: Atom, size: 24 },
    { icon: Brain, size: 24 },
    { icon: Cog, size: 24 },
    { icon: Cpu, size: 24 },
    { icon: TrendingUp, size: 24 },
    { icon: Globe, size: 24 },
    { icon: Laptop, size: 24 },
    { icon: Microscope, size: 24 },
    { icon: Pyramid, size: 24 },
    { icon: Rocket, size: 24 },
    { icon: PaintRoller, size: 24 },
    { icon: Eye, size: 24 },
    { icon: ScanFace, size: 24 },
    { icon: PersonStanding, size: 24 },
    { icon: Sun, size: 24 },
    { icon: Sparkles, size: 24 },
    { icon: Regex, size: 24 },
    { icon: Cloud, size: 24 },
    { icon: Settings, size: 24 },
    { icon: MessageCircle, size: 24 },
    { icon: Cuboid, size: 24 },
    { icon: Atom, size: 24 },
    { icon: Brain, size: 24 },
    { icon: AudioLines, size: 24 },
    { icon: BatteryCharging, size: 24 },
    { icon: Satellite, size: 24 },
    { icon: Move, size: 24 },
    { icon: Star, size: 24 },
    { icon: HandMetal, size: 24 },
    { icon: Heart, size: 24 },
    { icon: Save, size: 24 },
    { icon: Layers, size: 24 },
    { icon: Earth, size: 24 },
    { icon: Zap, size: 24 },
    { icon: Sigma, size: 24 },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center relative bg-white">
      <h2 className=" text-black pt-24 text-xl ponter-events-none">
        icons from lucide.dev
      </h2>
      <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
        {icons.map((IconData, index) => {
          const Icon = IconData.icon
          const randomX = Math.random() * 60 + 20 // Random x between 20-80%
          const randomY = Math.random() * 20 + 5 // Random y between 5-25%
          const bodyType = Math.random() > 0.7 ? "rectangle" : "circle"

          return (
            <MatterBody
              key={index}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              bodyType={bodyType}
              x={`${randomX}%`}
              y={`${randomY}%`}
            >
              <div
                className={`p-4 ${
                  bodyType === "circle" ? "rounded-full" : "rounded-md"
                } bg-white border border-border shadow-md text-foreground dark:text-muted`}
              >
                <Icon size={IconData.size} />
              </div>
            </MatterBody>
          )
        })}
      </Gravity>
    </div>
  )
}
