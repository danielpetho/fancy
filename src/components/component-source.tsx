"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { CopyButton } from "./copy-button";
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

  const syntaxHighlighterStyle = React.useMemo(
    () => ({
      borderRadius: "var(--radius) var(--radius)",
      padding: "1rem",
      width: "100%",
      maxWidth: "100%",
    }),
    []
  );

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened} className="w-full">
      <div className={cn("relative w-full", className)} {...props}>
        <CollapsibleContent
          forceMount
          className={cn(
            "overflow-auto rounded-lg max-h-[640px] w-full",
            !isOpened && "max-h-40"
          )}
        >
          {isOpened && (
            <div className="absolute right-4 top-4">
              <CopyButton
                value={sourceCode}
                src={name}
                event={"copy_npm_command"}
              />
            </div>
          )}
          <div className="w-full">
            <ReactSyntaxHighlighter
              language="typescript"
              style={hybrid}
              customStyle={syntaxHighlighterStyle}
            >
              {sourceCode}
            </ReactSyntaxHighlighter>
          </div>
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
            <Button
              variant="secondary"
              className="h-8 text-xs bg-white hover:bg-accent"
            >
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}
