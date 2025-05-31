import { Children } from "react"
import { ExternalLinkIcon } from "lucide-react"
import type { MDXComponents } from "mdx/types"

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
import { CodeSnippet } from "@/components/code-snippet"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { ExplanationDemo } from "@/components/explanation-demo"
import { InstallTabs } from "@/components/install-tabs"

import "katex/dist/katex.min.css"

import Link from "next/link"
import { BlockMath, InlineMath } from "react-katex"

export function mdxComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ className, children, ...props }: React.ComponentProps<"h1">) => (
      <h1
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn(
          "text-[44px] font-calendas tracking-tighter text-pretty leading-tight",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ className, children, ...props }: React.ComponentProps<"h2">) => (
      <>
        <h2
          id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
          className={cn("text-3xl md:text-4xl font-medium mb-0 py-0 mt-14 tracking-tight", className)}
          {...props}
        >
          {children}
        </h2>
        <hr className="mt-2.5" />
      </>
    ),
    h3: ({ className, children, ...props }: React.ComponentProps<"h3">) => (
      <h3
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn("text-xl md:text-2xl font-medium py-0 mt-12 [h2+hr+&]:mt-0 tracking-tight", className)}
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ className, children, ...props }: React.ComponentProps<"h4">) => (
      <h4
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn("text-lg md:text-xl font-medium py-0 mt-10 [h3+&]:mt-0 tracking-tight", className)}
        {...props}
      >
        {children}
      </h4>
    ),
    a: ({
      className,
      children,
      ...props
    }: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={cn(
          "font-medium text-base md:text-lg  text-blue hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500 duration-300 ease-out transition inline-flex items-center leading-0",
          className
        )}
        {...props}
      >
        {children}
        <ExternalLinkIcon className="ml-1 mt-0.5" size={14} strokeWidth={2.5} />
      </a>
    ),
    Link: ({
      className,
      href,
      children,
      ...props
    }: React.ComponentProps<typeof Link>) => (
      <Link
        href={href}
        className={cn(
          "font-medium text-base md:text-lg text-blue hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500 duration-300 ease-out transition inline-flex items-center leading-0",
          className
        )}
        {...props}
      >
        {children}
      </Link>
    ),
    p: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className={cn("text-base md:text-lg text-pretty", className)} {...props} />
    ),
    strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <strong className={cn("font-semibold", className)} {...props} />
    ),
    em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <em
        className={cn(className)}
        style={{ fontVariationSettings: "'slnt' -10" }}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul
        className={cn("list-disc ml-3 list-outside space-y-3", className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol
        className={cn("list-outside list-decimal ml-6 space-y-3", className)}
        {...props}
      />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <li
        className={cn(
          "marker:text-sm [&>ul]:marker:text-[10px] [&>ol]:marker:text-base text-base md:text-lg first:mt-2 last:pb-4",
          className
        )}
        {...props}
      />
    ),
    math: ({ children }) => <BlockMath>{children}</BlockMath>,
    inlineMath: ({ children }) => <InlineMath>{children}</InlineMath>,
    blockquote: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLElement>) => (
      <blockquote
        className={cn("mt-2 border-l-1 pl-0 px-6", className)}
        style={{ fontVariationSettings: "'slnt' -10" }}
        {...props}
      />
    ),
    img: ({
      className,
      alt,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      //@ts-expect-error img src expects a Blob or string
      <ImageComponent
        src={props.src as string}
        alt={alt as string}
        caption={true}
        className={className}
        {...props}
      />
    ),
    hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
      <hr className="" {...props} />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className={cn(
          "font-fira-mono text-xs md:text-sm px-0.5 py-px md:px-1 md:py-0.5 border border-border rounded-md leading-6 bg-muted whitespace-pre",
          className
        )}
        {...props}
      />
    ),
    InstallTabs,
    CodeSnippet: ({
      className,
      title,
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement> & {
      title?: string
    }) => {
      // Extract code content and language from children
      const preElement = Children.toArray(children)[0] as React.ReactElement

      //@ts-ignore
      const codeElement = preElement?.props?.children as React.ReactElement<{
        className?: string
        children?: string
      }>

      if (!codeElement) return null

      const code = codeElement.props.children || ""
      const language =
        codeElement.props.className?.replace("language-", "") || "typescript"

      return (
        <CodeSnippet title={title} code={code} language={language} {...props} />
      )
    },
    ComponentPreview,
    ComponentSource,
    ExplanationDemo,
    Table: ({ className, ...props }: React.ComponentProps<typeof Table>) => (
      <div className="rounded-2xl overflow-hidden border border-border w-full">
        <Table className={cn("h-full w-full text-xs", className)} {...props} />
      </div>
    ),
    TableHeader: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableHeader>) => (
      <TableHeader
        className={cn(
          "bg-muted dark:bg-background text-sm font-normal text-foreground",
          className
        )}
        {...props}
      />
    ),
    TableBody: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableBody>) => (
      <TableBody
        className={cn("font-mono text-xs", className)}
        {...props}
      />
    ),
    TableRow: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableRow>) => (
      <TableRow className={cn("hover:bg-transparent", className)} {...props} />
    ),
    TableCell: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableCell>) => (
      <TableCell
        className={cn("font-mono text-xs [&_*]:!text-xs [&_code]:!text-xs [&_code]:whitespace-pre-wrap [&_code]:box-decoration-clone", className)}
        {...props}
      />
    ),
    TableHead: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableHead>) => (
      <TableHead className={cn(className)} {...props} />
    ),
    Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
      <Tabs className={cn("relative w-full", className)} {...props} />
    ),
    TabsList: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsList>) => (
      <TabsList
        className={cn(
          "w-full justify-start rounded-none bg-transparent p-0 space-x-3 px-3",
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
          "relative text-base h-9 rounded-none bg-transparent px-0 pb-2 pt-2 font-medium text-muted-foreground shadow-none data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:shadow-none hover:font-semibold hover:text-foreground duration-300 ease-out transition",
          className
        )}
        {...props}
      />
    ),
    TabsContent: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent className={cn("space-y-5",className)} {...props} />
    ),
    ...components,
  }
}
