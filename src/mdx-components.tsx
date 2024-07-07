import type { MDXComponents } from 'mdx/types'
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { CodeBlockWrapper } from './components/code-block-wrapper'
 
export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ComponentPreview,
    ComponentSource,
    CodeBlockWrapper: ({ ...props }) => (
      <CodeBlockWrapper className="rounded-md border" {...props} />
    ),   
    ...components,
  }
}