import type { MDXComponents } from 'mdx/types'
import { ComponentPreview } from "@/components/component-preview"
 
export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ComponentPreview,   
    ...components,
  }
}