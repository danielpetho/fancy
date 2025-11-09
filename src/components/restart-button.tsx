"use client"

import { RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export function RestartButton({ onRestart }: { onRestart: () => void }) {
  return (
      <Button
        variant="outline"
        size="icon"
        onClick={onRestart}
        className="h-8 w-8 active:scale-95 duration-300 ease-out transition-[scale,background-color,opacity] group/restart-button"
        aria-label="Restart demo"
      >
        <RotateCw
          className="h-4 w-4 group-hover/restart-button:rotate-45 duration-300 ease-out transition-transform"
        />
      </Button>
  )
}
