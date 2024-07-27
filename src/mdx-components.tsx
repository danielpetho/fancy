import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentSource } from "@/components/component-source";
import { CodeBlockWrapper } from "./components/code-block-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { cn } from "./lib/utils";
import { CopyButton, CopyNpmCommandButton } from "./components/copy-button";
import { NpmCommands } from "./types/types";
import { Event } from "./lib/events";

export function mdxComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
      <h1
        className={cn(
          "scroll-m-24 text-5xl  font-calendas tracking-tight py-2",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
      <div className="flex flex-col gap-y-4 my-4 ">
        <h2
          className={cn("scroll-m-20 text-4xl tracking-tight mt-8", className)}
          {...props}
        />
        <hr className="" />
      </div>
    ),
    h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn("scroll-m-24 text-3xl  tracking-tight py-4", className)}
        {...props}
      />
    ),
    h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
      <h4
        className={cn("scroll-m-20 text-2xl tracking-tight py-4", className)}
        {...props}
      />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h5
        className={cn("mt-8 scroll-m-20 text-xl  tracking-tight", className)}
        {...props}
      />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h6
        className={cn("mt-8 scroll-m-20 text-xl tracking-tight", className)}
        {...props}
      />
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
          "leading-7 [&:not(:first-child)]:mt-6 text-xl",
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={cn("my-6 ml-6 list-disc text-xl", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol
        className={cn("my-6 ml-6 list-decimal text-xl", className)}
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
      <hr className="my-4 md:my-8" {...props} />
    ),
    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn("w-full", className)} {...props} />
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
      __rawString__?: string;
      __withMeta__?: boolean;
      __src__?: string;
      __event__?: Event["name"];
    } & NpmCommands) => {
      return (
        <div className="relative">
          <pre
            className={cn(
              "p-4 mb-4 mt-6 max-h-[650px] overflow-x-auto border rounded-lg text-[#c5c8c6] bg-[#1d1f21] py-4 dark:bg-zinc-900",
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
      );
    },
    ComponentPreview,
    ComponentSource,
    CodeBlockWrapper: ({ ...props }) => (
      <CodeBlockWrapper className="rounded-md border" {...props} />
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
        className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
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
  };
}
