"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      className="flex items-center justify-center w-8 h-8 hover:bg-transparent text-foreground relative"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      variant={"ghost"}
    >
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeSwitcher
