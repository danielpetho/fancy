"use client"

import * as React from "react"
import ReactSyntaxHighlighter from "react-syntax-highlighter"
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { cn } from "@/lib/utils"

import { CodeSnippet } from "./code-snippet"
import { CopyButton } from "./copy-button"
import { Button } from "./ui/button"

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
}

export function ComponentSource({
  name,
  children,
  className,
  ...props
}: ComponentSourceProps) {
  const [sourceCode, setSourceCode] = React.useState("")

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

  return <CodeSnippet title={name + ".tsx"} code={sourceCode} language="tsx" />
}
