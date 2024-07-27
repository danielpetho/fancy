"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "./copy-button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy } from "lucide-react";

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

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened} className="">
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <CollapsibleContent
          forceMount
          className={cn(
            "overflow-scroll rounded-lg max-h-[640px]",
            !isOpened && "max-h-40"
          )}
        >
          { isOpened && <div className="absolute right-4 top-4">
            <CopyButton
              value={sourceCode}
              src={name}
              event={"copy_npm_command"}
            />
          </div>}
          <SyntaxHighlighter
            language="javascript"
            style={hybrid}
            customStyle={{
              borderRadius: "var(--radius) var(--radius)",
              padding: "1rem",
              backgroundColor: "#000000",
            }}
          >
            {sourceCode}
          </SyntaxHighlighter>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute flex items-center justify-center bg-gradient-to-b  p-2 rounded-lg",
            isOpened
              ? "inset-x-0 bottom-0"
              : "inset-0 from-black/30 to-black/60"
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
