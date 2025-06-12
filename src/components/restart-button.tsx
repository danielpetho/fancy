"use client"

import { RotateCw } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"

const MotionIcon = motion.create(RotateCw)

export function RestartButton({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div whileHover="hover" whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="icon"
        onClick={onRestart}
        className="h-8 w-8"
        aria-label="Restart demo"
      >
        <MotionIcon 
          className="h-4 w-4"
          variants={{
            hover: {
              rotate: 35,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }
          }}
        />
      </Button>
    </motion.div>
  )
}
