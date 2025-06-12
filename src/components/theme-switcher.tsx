"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      className="flex items-center justify-center w-8 h-8 hover:bg-transparent text-foreground relative group"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      variant={"ghost"}
    >
      <Sun className="absolute h-[19px] w-[19px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:[stroke-width:3px] duration-300 ease-out" />
      <Moon className="absolute h-[19px] w-[19px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:[stroke-width:3px] duration-300 ease-out" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeSwitcher
