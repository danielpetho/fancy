"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import ReactSyntaxHighlighter, { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyButton } from "./copy-button";
import { Icons } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { registry } from "@/fancy/index";
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { obsidian } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { obsidian as obi } from "react-syntax-highlighter/dist/esm/styles/hljs";


interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  extractClassname?: boolean;
  extractedClassNames?: string;
  align?: "center" | "start" | "end";
  description?: string;
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
  const [sourceCode, setSourceCode] = React.useState("");

  React.useEffect(() => {
    async function loadSourceCode() {
      try {
        const mod = await import(`../../.component-sources/${name}.json`);
        const sourceCodeJSON = mod.default;
        setSourceCode(sourceCodeJSON.sourceCode);
      } catch (error) {
        console.error(`Failed to load source for ${name}:`, error);
        setSourceCode("");
      }
    }
    loadSourceCode();
  }, [name]);

  const Preview = React.useMemo(() => {
    const Component = registry[name]?.component;

    if (!Component) {
      return (
        <p className="text text-muted-foreground justify-center items-center flex w-full h-full whitespace-pre">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm whitespace-pre">
            {name}
          </code>{" "}
          not found.
        </p>
      );
    }

    return <Component />;
  }, [name]);

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
        <TabsContent
          value="preview"
          className="relative border border-black-500 min-h-[420px]  rounded-lg  "
        >
          <div className="w-full h-full flex items-center justify-between min-h-[420px]">
            <React.Suspense
              fallback={
                <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
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
            <div className="w-full [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto relative rounded-lg">
              <div className="absolute right-4 top-4">
                <CopyButton
                  value={sourceCode}
                  src={name}
                  event={"copy_npm_command"}
                />
              </div>
              <ReactSyntaxHighlighter
                language="javascript"
                style={hybrid}
                customStyle={{
                  borderRadius: "var(--radius)",
                  padding: "1rem",
                  //backgroundColor: "#000000",
                }}
              >
                {sourceCode}
              </ReactSyntaxHighlighter>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
