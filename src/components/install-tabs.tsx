"use client"

import React, { useState } from "react"
import { Highlight, PrismTheme } from "prism-react-renderer"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import theme from "@/styles/prism-theme.json"

import { CopyButton } from "./copy-button"

interface InstallTabsProps {
  command: string
  npx?: boolean
}

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

const packageManagers: Array<{ id: PackageManager; label: string }> = [
  { id: "pnpm", label: "pnpm" },
  { id: "npm", label: "npm" },
  { id: "yarn", label: "yarn" },
  { id: "bun", label: "bun" },
]

export const InstallTabs: React.FC<InstallTabsProps> = ({
  command,
  npx = false,
}) => {
  const [activeTab, setActiveTab] = useState<PackageManager>("pnpm")

  const getCommandPrefix = (pm: PackageManager): string => {
    if (npx) {
      switch (pm) {
        case "pnpm":
          return "pnpm dlx"
        case "npm":
          return "npx"
        case "yarn":
          return "npx"
        case "bun":
          return "bunx --bun"
        default:
          return "npx"
      }
    } else {
      switch (pm) {
        case "pnpm":
          return "pnpm add"
        case "npm":
          return "npm install"
        case "yarn":
          return "yarn add"
        case "bun":
          return "bun add"
        default:
          return "npm install"
      }
    }
  }

  const getFullCommand = (pm: PackageManager): string => {
    const prefix = getCommandPrefix(pm)
    return `${prefix} ${command}`
  }

  const handleCopy = async () => {
    const fullCommand = getFullCommand(activeTab)
    try {
      await navigator.clipboard.writeText(fullCommand)
    } catch (err) {
      console.warn("Copy failed:", err)
    }
  }

  return (
    <div className="border border-editor-border rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between pl-4 pr-3 py-2 border-b border-editor-border bg-editor-background h-11">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as PackageManager)}
          className="flex-1"
        >
          <TabsList className="bg-transparent h-auto p-0">
            {packageManagers.map((pm) => (
              <TabsTrigger
                key={pm.id}
                value={pm.id}
                className="text hover:text-white duration-300 ease-out transition px-2 py-1 h-auto data-[state=active]:bg-editor-background data-[state=active]:text-white text-muted-foreground cursor-pointer"
                aria-label={pm.label}
              >
                {pm.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <CopyButton onCopy={handleCopy} />
      </div>
      <div className="bg-editor-background py-4">
        <Highlight
          theme={theme as PrismTheme}
          code={getFullCommand(activeTab)}
          language="js"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} text-[13px] overflow-x-auto font-mono font-medium`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="flex items-center hover:bg-editor-border py-px px-4"
                >
                  <span className="mr-4 select-none text-muted-foreground text-right text-[10px] items-center flex">
                    1
                  </span>
                  <span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}
