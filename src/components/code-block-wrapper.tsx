"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyButton } from "./copy-button";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
  language?: string;
}

export function CodeBlockWrapper({
  expandButtonTitle = "Expand",
  language = "typescript",
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false);
  const codeString = React.Children.toArray(children)[0]?.toString() || "";
  const lineCount = codeString.split("\n").length;

  const syntaxHighlighterStyle = React.useMemo(
    () => ({
      borderRadius: "var(--radius) var(--radius)",
      padding: "1rem",
      width: "100%",
      maxWidth: "100%",
    }),
    []
  );

  if (lineCount < 20) {
    return (
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <div
          className={cn(
            "absolute",
            lineCount === 1 ? "right-3 top-3" : "right-4 top-4"
          )}
        >
          <CopyButton value={codeString} src="code-block" />
        </div>
        <ReactSyntaxHighlighter
          language={language}
          style={hybrid}
          customStyle={syntaxHighlighterStyle}
          wrapLongLines={true}
        >
          {codeString}
        </ReactSyntaxHighlighter>
      </div>
    );
  }

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
          {isOpened && (
            <div
              className={cn(
                "absolute",
                lineCount === 1 ? "right-3 top-3" : "right-4 top-4"
              )}
            >
              <CopyButton value={codeString} src="code-block" />
            </div>
          )}
          <ReactSyntaxHighlighter
            language={language}
            style={hybrid}
            customStyle={syntaxHighlighterStyle}
          >
            {codeString}
          </ReactSyntaxHighlighter>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute flex items-center justify-center bg-gradient-to-b p-2 rounded-lg",
            isOpened
              ? "inset-x-0 bottom-0"
              : "inset-0 from-black/30 to-black/60"
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant="secondary" className="h-8 text-xs bg-white hover:bg-accent">
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
