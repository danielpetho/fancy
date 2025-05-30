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
import { ExplanationDemo } from "@/components/explanation-demo"
import { InstallTabs } from "@/components/install-tabs"
import { ExternalLinkIcon } from "lucide-react"
import { CodeSnippet } from "@/components/code-snippet"
import { Children } from "react"

export function mdxComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ className, children, ...props }: React.ComponentProps<"h1">) => (
      <h1
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn(
          "text-[44px] font-calendas tracking-tighter text-pretty leading-tight pb-12",
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
          className={cn("text-4xl font-medium pt-6 pb-0 mb-2", className)}
          {...props}
        >
          {children}
        </h2>
        <hr className="mt-0 border-border" />
      </>
    ),
    h3: ({ className, children, ...props }: React.ComponentProps<"h3">) => (
      <h3
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn("text-2xl font-medium pt-6", className)}
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ className, children, ...props }: React.ComponentProps<"h4">) => (
      <h4
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
        className={cn("text-xl font-medium pt-6", className)}
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
          "font-medium text-lg text-blue hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500 duration-300 ease-out transition inline-flex items-center leading-0",
          className
        )}
        {...props}
      >
        {children}
        <ExternalLinkIcon
          className="ml-1 pt-px mt-px"
          size={13}
          strokeWidth={2.5}
        />
      </a>
    ),
    p: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className={cn("text-lg text-pretty", className)} {...props} />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul
        className={cn("list-disc text-base ml-6 list-outside space-y-3", className)}
        {...props}
      />
    ),
    math: ({ children }) => (
      <BlockMath>{children}</BlockMath>
    ),
    inlineMath: ({ children }) => (
      <InlineMath>{children}</InlineMath>
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol
        className={cn(
          "list-outside list-decimal mb-[1em] mt-[1em] ml-6 space-y-3",
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <li className={cn("marker:text-sm text-lg first:mt-3", className)} {...props} />
    ),
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
      <ImageComponent src={props.src as string} alt={alt as string} caption={true} className={className} {...props} />
    ),
    hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
      <hr className="" {...props} />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className={cn(
          "font-fira-mono text-[13px] px-1.5 py-0.5 border border-border rounded-md leading-6 bg-muted ",
          className
        )}
        {...props}
      />
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
      const isNpmCommand =
        __npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__

      // if (isNpmCommand) {
      //   return (
      //     <CodeBlockCommand
      //       __npmCommand__={__npmCommand__}
      //       __yarnCommand__={__yarnCommand__}
      //       __pnpmCommand__={__pnpmCommand__}
      //       __bunCommand__={__bunCommand__}
      //     />
      //   )
      // }

      return (
        <pre
          className={cn(
            "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg bg-zinc-950 dark:bg-zinc-900",
            className
          )}
          {...props}
        />
      )
    },
    InstallTabs,
    CodeSnippet: ({
      className,
      title,
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement> & {
      title?: string;
    }) => {
      // Extract code content and language from children
      const preElement = Children.toArray(children)[0] as React.ReactElement;

      //@ts-ignore
      const codeElement = preElement?.props?.children as React.ReactElement<{
        className?: string;
        children?: string;
      }>;

      if (!codeElement) return null;

      const code = codeElement.props.children || "";
      const language =
        codeElement.props.className?.replace("language-", "") || "typescript";

      return (
        <CodeSnippet
          title={title}
          code={code}
          language={language}
          {...props}
        />
      );
    },
    ComponentPreview,
    ComponentSource,
    ExplanationDemo,
    CodeBlockWrapper: ({ ...props }) => (
      <CodeBlockWrapper className="rounded-md border mt-4" {...props} />
    ),
    Table: ({ className, ...props }: React.ComponentProps<typeof Table>) => (
      <Table className={cn("h-full text-xs", className)} {...props} />
    ),
    TableHeader: ({
      className,
      ...props
    }: React.ComponentProps<typeof TableHeader>) => (
      <TableHeader
        className={cn(
          "bg-zinc-100 dark:bg-zinc-800 font-bold text-secondary",
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
        className={cn("font-azeret-mono font-light text-xs", className)}
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
      <TableCell
        className={cn("font-azeret-mono text-xs **:text-xs", className)}
        {...props}
      />
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
          "w-full justify-start rounded-none bg-transparent p-0",
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
          "relative text-lg h-9 rounded-none bg-transparent px-2 pb-3 pt-2 font-normal text-muted-foreground shadow-none transition-none data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:shadow-none",
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
