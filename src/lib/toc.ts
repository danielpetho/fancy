// @ts-nocheck
// TODO: I'll fix this later.

import { toc } from "mdast-util-toc"
import { remark } from "remark"
import { visit } from "unist-util-visit"

const textTypes = ["text", "emphasis", "strong", "inlineCode"]

function flattenNode(node) {
  const p = []
  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return
    p.push(node.value)
  })
  return p.join(``)
}

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

function getItems(node, current): Items {
  if (!node) {
    return {}
  }

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = item.url
        current.title = flattenNode(node)
      }

      if (item.type === "text") {
        current.title = flattenNode(node)
      }
    })

    return current
  }

  if (node.type === "list") {
    current.items = node.children.map((i) => getItems(i, {}))

    return current
  } else if (node.type === "listItem") {
    const heading = getItems(node.children[0], {})

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

const getToc = () => (node, file) => {
  const table = toc(node)
  if (!table.map) return // Add this check
  const items = getItems(table.map, {})

  // Change this to data.toc to match remark's expectations
  file.data = { toc: items }
}

function preprocessContentForToc(content: string): string {
  // Remove frontmatter section
  let processed = content.replace(/^---[\s\S]*?---\n/, "")
  
  // Remove JSX components that break markdown parsing
  // Remove CodeSnippet components and their content
  processed = processed.replace(/<CodeSnippet[^>]*>[\s\S]*?<\/CodeSnippet>/g, "")
  
  // Remove Table components and their content  
  processed = processed.replace(/<Table>[\s\S]*?<\/Table>/g, "")
  
  // Remove other JSX components but keep their content if they're inline
  processed = processed.replace(/<ComponentPreview[^>]*\/>/g, "")
  processed = processed.replace(/<ComponentSource[^>]*\/>/g, "")
  processed = processed.replace(/<InstallTabs[^>]*\/>/g, "")
  processed = processed.replace(/<Tabs[^>]*>[\s\S]*?<\/Tabs>/g, "")
  
  // Remove self-closing JSX tags
  processed = processed.replace(/<[A-Z][^>]*\/>/g, "")
  
  // Remove opening/closing JSX tags but keep content
  processed = processed.replace(/<\/?[A-Z][^>]*>/g, "")
  
  return processed
}

export type TableOfContents = Items

export async function getTableOfContents(
  content: any
): Promise<TableOfContents> {
  const markdownContent =
    typeof content === "string" ? content : content?.props?.children || ""

  // Preprocess content to remove JSX components that break markdown parsing
  const cleanedContent = preprocessContentForToc(markdownContent)

  try {
    const processedContent = await remark()
      .use(() => (node, file) => {
        const table = toc(node)
        if (!table.map) return
        const items = getItems(table.map, {})
        file.data = { toc: items }
      })
      .process(cleanedContent)

    return processedContent.data.toc || {}
  } catch (error) {
    console.error("Error generating table of contents:", error)
    return {}
  }
}
