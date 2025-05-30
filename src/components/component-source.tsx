"use client"

import * as React from "react"
import ReactSyntaxHighlighter from "react-syntax-highlighter"
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"
import { Button } from "./ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { CodeSnippet } from "./code-snippet"

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  expandButtonTitle?: string
}

export function ComponentSource({
  name,
  expandButtonTitle = "Expand",
  children,
  className,
  ...props
}: ComponentSourceProps) {
  const [sourceCode, setSourceCode] = React.useState("")
  const [isOpened, setIsOpened] = React.useState(false)

  React.useEffect(() => {
    async function loadSourceCode() {
      try {
        const mod = await import(`../../public/r/${name}.json`)
        const json = mod.default

        // Find the main component file that matches the name
        const mainFile = json.files.find(
          (file: any) =>
            file.path
              .split("/")
              .pop()
              .replace(/\.(tsx|ts)$/, "") === name
        )

        if (mainFile) {
          setSourceCode(mainFile.content)
        } else {
          console.error(`Could not find main file for ${name}`)
          setSourceCode("")
        }
      } catch (error) {
        console.error(`Failed to load source for ${name}:`, error)
        setSourceCode("")
      }
    }
    loadSourceCode()
  }, [name])

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      data-algolia-ignore
    >
      <div className={cn("relative w-full", className)} {...props}>
        <CollapsibleContent
          forceMount
          className={cn(
            "overflow-auto rounded-lg max-h-[640px]",
            !isOpened && "max-h-40"
          )}
        >
          <CodeSnippet title={name + ".tsx"} code={sourceCode} language="tsx"/>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute flex items-center justify-center bg-linear-to-b p-2 rounded-lg",
            isOpened
              ? "inset-x-0 bottom-0"
              : "inset-0 from-black/30 to-black/60"
          )}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="secondary"
              className="h-8 text-xs bg-white text-black hover:bg-accent"
            >
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  )
}
