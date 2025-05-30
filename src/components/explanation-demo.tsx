"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { registry } from "@/fancy/index"

interface ExplanationDemoProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  framerLink?: string
  description?: string
}

export function ExplanationDemo({
  name,
  children,
  className,
  framerLink,
  extractClassname,
  extractedClassNames,
  align = "center",
  description,
  ...props
}: ExplanationDemoProps) {
  const [previewKey, setPreviewKey] = React.useState(0)

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
        "group relative my-8 flex flex-col h-full w-full",
        className
      )}
      {...props}
    >
      <div className="border border-border flex rounded-2xl">
        <div className="w-full flex items-center justify-center rounded-2xl min-h-[530px] overflow-hidden relative max-h-[620px]">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            }
          >
            <React.Fragment key={previewKey}>{Preview}</React.Fragment>
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}
