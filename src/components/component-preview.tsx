"use client"

import * as React from "react"
import { Repeat } from "lucide-react"

import { absoluteUrl, cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { registry } from "@/fancy/index"

import { CodeSnippet } from "./code-snippet"
import { OpenInV0Button } from "./open-in-v0"
import { RestartButton } from "./restart-button"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  framerLink?: string
  description?: string
}

export function ComponentPreview({
  name,
  children,
  className,
  framerLink,
  extractClassname,
  extractedClassNames,
  align = "center",
  description,
  ...props
}: ComponentPreviewProps) {
  const [sourceCode, setSourceCode] = React.useState("")
  const [previewKey, setPreviewKey] = React.useState(0)
  const [showRestartButton, setShowRestartButton] = React.useState(true)

  React.useEffect(() => {
    async function loadSourceCode() {
      try {
        const mod = await import(`../../public/r/${name}.json`)
        const json = mod.default

        // Find the main component file that matches the name
        const mainFile = json.files.find(
          (file: any) => file.path.split("/").pop().replace(".tsx", "") === name
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

  const handleRestart = React.useCallback(() => {
    setPreviewKey((prev) => prev + 1)
  }, [])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "r" || event.key === "R") {
        handleRestart()
      }
      // Toggle restart button visibility with Cmd+D
      if ((event.metaKey || event.ctrlKey) && event.key === "1") {
        event.preventDefault()
        setShowRestartButton((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleRestart])

  const Preview = React.useMemo(() => {
    const Component = registry[name]?.component

    if (!Component) {
      return (
        <p
          data-algolia-ignore
          className="text text-muted-foreground justify-center items-center flex w-full h-full whitespace-pre"
        >
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm whitespace-pre">
            {name}
          </code>{" "}
          not found.
        </p>
      )
    }

    return <Component />
  }, [name])

  return (
    <div
      data-algolia-ignore
      className={cn(
        "group relative flex flex-col h-full w-full ",
        className
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between">
          <TabsList className="w-full justify-start rounded-none p-0 h-14 bg-transparent">
            <TabsTrigger
              value="preview"
              className="relative h-14 text-xl rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Demo
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative text-xl h-14 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="preview"
          className="border border-black-500 flex rounded-2xl"
        >
          <div className="w-full flex items-center justify-center rounded-2xl min-h-[530px] overflow-hidden relative max-h-[530px]">
            {/* <div className="absolute top-4 right-4 rounded-full border">

            </div> */}
            <React.Suspense
              fallback={
                <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {showRestartButton && (
                <div className="absolute right-4 top-4 z-50 flex gap-2 flex-row">
                  {framerLink ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 items-center flex justify-center"
                        >
                          <Repeat className="mr-2 h-4 w-4" />
                          Remix
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <OpenInV0Button
                            variant="ghost"
                            className="justify-start  text-left px-0 h-6 gap-1  flex w-full border-none"
                            url={`https://fancycomponents.dev/r/${name}.json`}
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            variant="ghost"
                            className="justify-start  text-left px-0 h-6 gap-1  flex w-full border-none"
                            onClick={() => window.open(framerLink, "_blank")}
                          >
                            Remix in Framer
                            <Icons.framer className="ml-2 h-3 w-3" />
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <OpenInV0Button
                      url={`https://fancycomponents.dev/r/${name}.json`}
                    />
                  )}
                  <RestartButton onRestart={handleRestart} />
                </div>
              )}
              <React.Fragment key={previewKey}>{Preview}</React.Fragment>
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <CodeSnippet
            title={name + ".tsx"}
            code={sourceCode}
            language="typescript"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
