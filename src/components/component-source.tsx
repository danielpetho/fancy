"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "./copy-button";
import { Icons } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { registry } from "@/fancy/index";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  expandButtonTitle?: string;
}

export function ComponentSource({
  name,
  expandButtonTitle = "Expand",
  children,
  className,
  ...props
}: ComponentSourceProps) {
  const [sourceCode, setSourceCode] = React.useState("");
  const [isOpened, setIsOpened] = React.useState(false);

  React.useEffect(() => {
    async function loadSourceCode() {
      try {
        const module = await import(`../../.component-sources/${name}.json`);
        const sourceCodeJSON = module.default;
        setSourceCode(sourceCodeJSON.sourceCode);
      } catch (error) {
        console.error(`Failed to load source for ${name}:`, error);
        setSourceCode("");
      }
    }
    loadSourceCode();
  }, [name]);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <CollapsibleContent
          forceMount
          className={cn("overflow-hidden", !isOpened && "max-h-32")}
        >
          <div
            className={cn(
              "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
              !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]"
            )}
          >
            <SyntaxHighlighter language="javascript" style={hybrid} customStyle={{ borderRadius: "var(--radius)", padding: "1rem", backgroundColor: "#000000" }}>
              {sourceCode}
            </SyntaxHighlighter>
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute flex items-center justify-center bg-gradient-to-b from-zinc-700/30 to-zinc-950/90 p-2",
            isOpened ? "inset-x-0 bottom-0 h-12" : "inset-0"
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant="secondary" className="h-8 text-xs">
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
