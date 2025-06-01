"use client"

import React from 'react';
import { CopyButton } from './copy-button';
import { Highlight, PrismTheme } from 'prism-react-renderer';
import theme from '@/styles/prism-theme.json';

interface CodeSnippetProps {
  title?: string;
  code: string;
  language?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  title,
  code,
  language = 'typescript',
}) => {
  const lines = code.trim().split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  return (
    <div className="border border-editor-border rounded-2xl overflow-hidden pointer-events-auto">
      {title ? (
        <div className="flex items-center justify-between pl-4 pr-3 py-2 border-b border-editor-border bg-editor-background h-11">
          <h3 className="text-white text-sm font-medium">{title}</h3>
          <CopyButton onCopy={handleCopy} />
        </div>
      ) : null}
      <div className="bg-editor-background py-4 relative overflow-y-auto max-h-[calc(530px-44px)] ">
        {!title && (
          <div className={`absolute ${
            lines.length === 1 
              ? "top-1/2 -translate-y-1/2 right-3" 
              : "top-4 right-3"
          }`}>
            <CopyButton
              onCopy={handleCopy}
            />
          </div>
        )}
        <Highlight
          theme={theme as PrismTheme}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} text-[13px] overflow-x-auto font-mono font-medium`} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex items-center hover:bg-editor-border py-px px-4">
                  <span className="mr-4 select-none text-muted-foreground text-right text-[10px] items-center flex">
                    {i + 1}
                  </span>
                  <span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};