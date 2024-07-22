"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyButton } from "./copy-button";
import { Icons } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { registry } from "@/fancy/index"
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";

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

  const [sourceCode, setSourceCode] = React.useState('');

  React.useEffect(() => {
    async function loadSourceCode() {
      try {
        const module = await import(`../../.component-sources/${name}.json`);
        const sourceCodeJSON = module.default;
        setSourceCode(sourceCodeJSON.sourceCode);
      } catch (error) {
        console.error(`Failed to load source for ${name}:`, error);
        setSourceCode('');
      }
    }
    loadSourceCode();
  }, [name]);

  const Preview = React.useMemo(() => {
    const Component = registry[name]?.component

    if (!Component) {
      return (
        <p className="text text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
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
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center  justify-between">
          <TabsList className="w-full justify-start rounded-none p-0 h-14 bg-transparent">
            <TabsTrigger
              value="preview"
              className="relative h-14 text-xl  rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative text-xl h-14 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative border border-black-500 rounded-lg">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
            <CopyButton
                value={sourceCode}
                variant="outline"
                className="h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:size-3.5"
              />
            </div>
          </div>
          <div
            className={cn(
              "preview flex min-h-[350px] w-full justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              }
            )}
          >
            <React.Suspense
              fallback={
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto rounded-lg">
              <SyntaxHighlighter language="javascript" style={hybrid} customStyle={{ borderRadius: "var(--radius)", padding: "1rem", backgroundColor: "#000000" }}>
                {sourceCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
