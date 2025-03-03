"use client"

import { motion } from "motion/react"

import Gravity, { MatterBody } from "@/fancy/components/physics/gravity"

const socialLinks = [
  { name: "LinkedIn", x: "30%", y: "10%" },
  { name: "X (Twitter)", x: "30%", y: "30%" },
  { name: "Instagram", x: "40%", y: "20%", angle: 10 },
  { name: "GitHub", x: "75%", y: "10%", angle: -4 },
  { name: "BlueSky", x: "80%", y: "20%", angle: 5 },
]

const stars = ["✱", "✽", "✦", "✸", "✹", "✺"]

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-col relative bg-white font-calendas">
      <p className="pt-4 text-6xl sm:text-7xl md:text-9xl text-primary-blue w-full text-center font-calendas">
        CONTACT
      </p>
      <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
        {socialLinks.map((link) => (
          <MatterBody
            key={link.name}
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x={link.x}
            y={link.y}
            angle={link.angle || 0}
            isDraggable={false}
          >
            <motion.div
              className="text-xl sm:text-2xl md:text-3xl bg-white text-primary-blue border border-primary-blue rounded-full hover:cursor-pointer hover:bg-primary-blue hover:text-white md:px-8 md:py-4 py-3 px-6"
              whileTap={{ scale: 0.9 }}
            >
              {link.name}
            </motion.div>
          </MatterBody>
        ))}

        {stars.map((star, i) => (
          <MatterBody
            key={i}
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x={`${Math.random() * 60 + 20}%`}
            y={`${Math.random() * 20 + 40}%`}
            angle={Math.random() * 360}
          >
            <div
              className={`aspect-square w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-blue text-white rounded-lg text-center`}
            ></div>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  )
}
