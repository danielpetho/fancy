"use client"

import * as React from "react"
import ReactSyntaxHighlighter from "react-syntax-highlighter"
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

import { CopyButton } from "./copy-button"

interface InstallBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  packageName?: string
  isShadcnCli?: boolean
}

export function InstallBlockWrapper({
  packageName,
  isShadcnCli = false,
  className,
  ...props
}: InstallBlockProps) {
  const [selectedPM, setSelectedPM] = React.useState("pnpm")
  const codeString = React.useMemo(() => {
    if (isShadcnCli) {
      return `${selectedPM} dlx shadcn-ui@latest add ${packageName}`
    }
    return `${selectedPM} add ${packageName}`
  }, [selectedPM, packageName, isShadcnCli])

  const packageManagers = ["pnpm", "npm", "yarn", "bun"]

  return (
    <div className={cn("relative", className)} {...props}>
      <Tabs defaultValue="pnpm" onValueChange={setSelectedPM}>
        <TabsList className="mb-2">
          {packageManagers.map((pm) => (
            <TabsTrigger key={pm} value={pm} className="min-w-[60px]">
              {pm}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="relative">
          <div className="absolute right-3 top-3">
            <CopyButton value={codeString} src="install-block" />
          </div>
          <ReactSyntaxHighlighter
            language="bash"
            style={hybrid}
            customStyle={{
              borderRadius: "var(--radius)",
              padding: "1rem",
              width: "100%",
            }}
          >
            {codeString}
          </ReactSyntaxHighlighter>
        </div>
      </Tabs>
    </div>
  )
}
