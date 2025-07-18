"use client"

import React, { useState } from "react"
import { Copy, FileText, MoreHorizontal, Check, ChevronDown, CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { motion, Variants } from 'motion/react'

interface CopyPageMenuProps {
  title: string
  content: string // The main content to copy
  currentUrl: string // Current page URL for markdown link generation
}

const copyIconVariants: Variants = {
  idle: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copying: { 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copied: { 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeOut" }
  }
}

const checkIconVariants: Variants = {
  idle: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copying: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copied: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  }
}

const checkPathVariants: Variants = {
  idle: { 
    pathLength: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copying: { 
    pathLength: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copied: { 
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

export function CopyPageMenu({ title, content, currentUrl }: CopyPageMenuProps) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied">("idle")

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
      throw error
    }
  }

  const handleCopyAsMarkdown = async () => {
    if (status !== "idle") return
    
    setStatus("copying")
    
    try {
      // Create markdown content optimized for LLMs
      const markdownContent = `# ${title}\n\n${content}\n\n---\n\nSource: ${currentUrl}`
      await copyToClipboard(markdownContent)
      
      setTimeout(() => {
        setStatus("copied")
      }, 100)
      
      setTimeout(() => {
        setStatus("idle")
      }, 2000)
    } catch (error) {
      setStatus("idle")
    }
  }

  const handleViewAsMarkdown = () => {
    const markdownUrl = `${currentUrl}.md`
    window.open(markdownUrl, "_blank")
  }

  const handleOpenInChatGPT = () => {
    const prompt = `Please help me understand this documentation: ${currentUrl}.md`
    const chatGPTUrl = `https://chat.openai.com/?model=gpt-4&q=${encodeURIComponent(prompt)}`
    window.open(chatGPTUrl, "_blank")
  }

  const handleOpenInClaude = () => {
    const prompt = `Please help me understand this documentation: ${currentUrl}.md`
    const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
    window.open(claudeUrl, "_blank")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm cursor-pointer font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
          //whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="relative w-4 h-4">
            {/* Copy Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={status}
              variants={copyIconVariants}
            >
              <CopyIcon className="w-4 h-4" />
            </motion.div>
            
            {/* Check Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={status}
              variants={checkIconVariants}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M4 12 9 17L20 6"
                  animate={status}
                  variants={checkPathVariants}
                />
              </svg>
            </motion.div>
          </div>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="justify-start text-left px-0 h-6 gap-2 flex w-full border-none"
            onClick={handleCopyAsMarkdown}
          >
            {status === "copied" ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            Copy page as Markdown for LLMs
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="justify-start text-left px-0 h-6 gap-2 flex w-full border-none"
            onClick={handleViewAsMarkdown}
          >
            <FileText className="h-4 w-4" />
            View as Markdown
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="justify-start text-left px-0 h-6 gap-2 flex w-full border-none"
            onClick={handleOpenInChatGPT}
          >
            <Icons.openai className="h-4 w-4" />
            Open in ChatGPT
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="justify-start text-left px-0 h-6 gap-2 flex w-full border-none"
            onClick={handleOpenInClaude}
          >
            <Icons.anthropic className="h-4 w-4" />
            Open in Claude
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 