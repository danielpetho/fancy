"use client"

import * as React from "react"
import ReactSyntaxHighlighter, {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter"
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { registry } from "@/fancy/index"

import { CopyButton } from "./copy-button"
import { RestartButton } from "./restart-button"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
}

export function ComponentPreview({
  name,
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = "center",
  description,
  ...props
}: ComponentPreviewProps) {
  const [sourceCode, setSourceCode] = React.useState("")
  const [previewKey, setPreviewKey] = React.useState(0)

  React.useEffect(() => {
    async function loadSourceCode() {
      try {
        const mod = await import(`../../public/r/${name}.json`)
        const json = mod.default
        
        // Find the main component file that matches the name
        const mainFile = json.files.find(
          (file: any) => file.path.split('/').pop().replace('.tsx', '') === name
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

  const syntaxHighlighterStyle = React.useMemo(
    () => ({
      borderRadius: "var(--radius) var(--radius)",
      padding: "1rem",
      width: "100%",
      maxWidth: "100%",
    }),
    []
  )
  const handleRestart = React.useCallback(() => {
    setPreviewKey((prev) => prev + 1)
  }, [])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "r" || event.key === "R") {
        handleRestart()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleRestart])

  const Preview = React.useMemo(() => {
    const Component = registry[name]?.component

    if (!Component) {
      return (
        <p className="text text-muted-foreground justify-center items-center flex w-full h-full whitespace-pre">
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
      className={cn(
        "group relative my-4 flex flex-col space-y-2 h-full",
        className
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center  justify-between">
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
          className="border border-black-500 flex rounded-lg"
        >
          <div className="w-full flex items-center justify-center rounded-lg min-h-[540px] overflow-hidden relative max-h-[620px]">
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
              <div className="absolute right-4 top-4 z-50">
                <RestartButton onRestart={handleRestart} />
              </div>
              <React.Fragment key={previewKey}>{Preview}</React.Fragment>
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto relative rounded-lg">
              <div className="absolute right-4 top-4">
                <CopyButton
                  value={sourceCode}
                  src={name}
                  event={"copy_npm_command"}
                />
              </div>
              <ReactSyntaxHighlighter
                language="typescript"
                style={hybrid}
                customStyle={syntaxHighlighterStyle}
                wrapLongLines={true}
              >
                {sourceCode}
              </ReactSyntaxHighlighter>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
