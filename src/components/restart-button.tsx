"use client"

import { RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export function RestartButton({ onRestart }: { onRestart: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onRestart}
      className="h-8 w-8"
    >
      <RotateCw className="h-4 w-4" />
    </Button>
  )
}
