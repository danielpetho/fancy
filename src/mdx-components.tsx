import type { MDXComponents } from "mdx/types"

import { NpmCommands } from "@/types/types"
import { Event } from "@/lib/events"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlockWrapper } from "@/components/code-block-wrapper"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { CopyButton, CopyNpmCommandButton } from "@/components/copy-button"

export function mdxComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ className, children, ...props }: React.ComponentProps<"h1">) => (
      <h1
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn(
          "scroll-m-24 text-5xl  font-calendas tracking-tight py-2",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ className, children, ...props }: React.ComponentProps<"h2">) => (
      <div className="flex flex-col gap-y-4 mt-4 ">
        <h2
          id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
          className={cn(
            "scroll-m-20 text-4xl tracking-tight pt-6 pb-0",
            className
          )}
          {...props}
        >
          {children}
        </h2>
        <hr className="" />
      </div>
    ),
    h3: ({ className, children, ...props }: React.ComponentProps<"h3">) => (
      <h3
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn(
          "scroll-m-24 text-3xl  tracking-tight pt-10 pb-2",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ className, children, ...props }: React.ComponentProps<"h4">) => (
      <h4
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn(
          "scroll-m-20 text-2xl tracking-tight pt-10 pb-2",
          className
        )}
        {...props}
      >
        {children}
      </h4>
    ),
    h5: ({
      className,
      children,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h5
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn(
          "scroll-m-20 text-xl  tracking-tight pt-10 pb-4",
          className
        )}
        {...props}
      >
        {children}
      </h5>
    ),
    h6: ({
      className,
      children,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h6
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn(
          "scroll-m-20 text-xl tracking-tight pt-10 pb-4",
          className
        )}
        {...props}
      >
        {children}
      </h6>
    ),
    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={cn(" underline underline-offset-4", className)}
        {...props}
      />
    ),
    p: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={cn(
          "leading-7 [&:not(:first-child)]:mt-3 text-lg",
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={cn("my-6 ml-6 list-disc text-lg", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol
        className={cn("my-6 ml-6 list-decimal text-lg", className)}
        {...props}
      />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLElement>) => (
      <blockquote
        className={cn("mt-6 border-l-2 pl-6 italic", className)}
        {...props}
      />
    ),
    img: ({
      className,
      alt,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={cn("rounded-md", className)} alt={alt} {...props} />
    ),
    hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
      <hr className="my-1 md:my-1" {...props} />
    ),
    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto bg-red-200">
        <table />
      </div>
    ),
    tr: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr
        className={cn("m-0 border-t p-0 even:bg-muted", className)}
        {...props}
      />
    ),
    th: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <th
        className={cn(
          "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    td: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <td
        className={cn(
          "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    pre: ({
      className,
      __rawString__,
      __npmCommand__,
      __yarnCommand__,
      __pnpmCommand__,
      __bunCommand__,
      __withMeta__,
      __src__,
      __event__,
      ...props
    }: React.HTMLAttributes<HTMLPreElement> & {
      __rawString__?: string
      __withMeta__?: boolean
      __src__?: string
      __event__?: Event["name"]
    } & NpmCommands) => {
      return (
        <div className="relative flex h-full">
          <pre
            className={cn(
              "p-4 mb-4 mt-6 max-h-[640px] overflow-hidden border rounded-lg text-[#c5c8c6] bg-[#1d1f21] py-4 dark:bg-zinc-900",
              className
            )}
            {...props}
          />
          {__rawString__ && !__npmCommand__ && (
            <CopyButton
              value={__rawString__}
              src={__src__}
              event={__event__}
              className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
            />
          )}
          {__npmCommand__ &&
            __yarnCommand__ &&
            __pnpmCommand__ &&
            __bunCommand__ && (
              <CopyNpmCommandButton
                commands={{
                  __npmCommand__,
                  __yarnCommand__,
                  __pnpmCommand__,
                  __bunCommand__,
                }}
                className={cn(
                  "absolute right-4 top-4",
                  __withMeta__ && "top-16"
                )}
              />
            )}
        </div>
      )
    },
    code: ({ children, className, ...props }: React.ComponentProps<"code">) => (
      <code
        className={cn("font-azeretMono text-xs p-1 bg-zinc-100", className)}
        {...props}
      >
        {children}
      </code>
    ),
    ComponentPreview,
    ComponentSource,
    CodeBlockWrapper: ({ ...props }) => (
      <CodeBlockWrapper className="rounded-md border" {...props} />
    ),
    Table: ({ className, ...props }: React.ComponentProps<typeof Table>) => (
      <Table className={cn("h-full text-xs", className)} {...props} />
    ),
    TableHeader: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableHeader>) => (
      <TableHeader
        className={cn("bg-zinc-100 font-bold text-black", className)}
        {...props}
      />
    ),
    TableBody: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableBody>) => (
      <TableBody
        className={cn("font-azeretMono font-light text-xs", className)}
        {...props}
      />
    ),
    TableRow: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableRow>) => (
      <TableRow className={cn(className)} {...props} />
    ),
    TableCell: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableCell>) => (
      <TableCell className={cn(className)} {...props} />
    ),
    TableHead: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableHead>) => (
      <TableHead className={cn(className)} {...props} />
    ),
    Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn(
          "font-heading mt-8 mb-4 scroll-m-20 text-xl font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    Steps: ({ ...props }) => (
      <div
        className="[&>h3]:step steps mb-12 [counter-reset:step]"
        {...props}
      />
    ),
    Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
      <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
    ),
    TabsList: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsList>) => (
      <TabsList
        className={cn(
          "w-full justify-start rounded-none border-b bg-transparent p-0",
          className
        )}
        {...props}
      />
    ),
    TabsTrigger: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsTrigger>) => (
      <TabsTrigger
        className={cn(
          "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
          className
        )}
        {...props}
      />
    ),
    TabsContent: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent
        className={cn(
          "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
          className
        )}
        {...props}
      />
    ),
    ...components,
  }
}
