// @ts-ignore
const fs = require("fs")
// @ts-ignore
const path = require("path")

// @ts-ignore
const baseDir = path.join(__dirname, "..", "..")
const CONTENT_DIRECTORY = "/src/content/docs/"
const outputDir = path.join(baseDir, "public", "docs")

interface ConversionOptions {
  includeSourceCode?: boolean
  includeInstallInstructions?: boolean
}

interface TocItem {
  text: string
  anchor: string
  level: number
  children: TocItem[]
}

function generateTableOfContents(content: string): string {
  // Extract headings from the markdown content
  const headingRegex = /^(#{2,6})\s+(.+)$/gm
  const headings: { level: number; text: string; anchor: string }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const anchor = generateAnchor(text)
    
    headings.push({ level, text, anchor })
  }

  if (headings.length === 0) {
    return ""
  }

  // Build nested TOC structure
  const tocItems = buildTocStructure(headings)
  
  // Generate TOC markdown
  let toc = "## Table of Contents\n\n"
  toc += generateTocMarkdown(tocItems)
  toc += "\n"
  
  return toc
}

function generateAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

function buildTocStructure(headings: { level: number; text: string; anchor: string }[]): TocItem[] {
  const root: TocItem[] = []
  const stack: TocItem[] = []

  for (const heading of headings) {
    const item: TocItem = {
      text: heading.text,
      anchor: heading.anchor,
      level: heading.level,
      children: []
    }

    // Find the appropriate parent
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      root.push(item)
    } else {
      stack[stack.length - 1].children.push(item)
    }

    stack.push(item)
  }

  return root
}

function generateTocMarkdown(items: TocItem[], depth: number = 0): string {
  let markdown = ""
  const indent = "  ".repeat(depth)

  for (const item of items) {
    markdown += `${indent}- [${item.text}](#${item.anchor})\n`
    if (item.children.length > 0) {
      markdown += generateTocMarkdown(item.children, depth + 1)
    }
  }

  return markdown
}

async function convertMdxToMarkdown(
  slug: string[], 
  options: ConversionOptions = {}
): Promise<string> {
  const { includeSourceCode = true, includeInstallInstructions = true } = options
  
  try {
    // Read the MDX file
    const filePath = path.join(baseDir, CONTENT_DIRECTORY, slug.join("/")) + ".mdx"
    const source = fs.readFileSync(filePath, "utf8")
    
    // Extract frontmatter
    const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/)
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ""
    const content = source.replace(/^---\n[\s\S]*?\n---\n/, "")
    
    // Parse frontmatter
    const title = frontmatter.match(/title:\s*(.+)/)?.[1]?.replace(/['"]/g, "") || ""
    const description = frontmatter.match(/description:\s*(.+)/)?.[1]?.replace(/['"]/g, "") || ""
    
    let markdown = ""
    
    // Add title and description
    if (title) {
      markdown += `# ${title}\n\n`
    }
    if (description) {
      markdown += `> ${description}\n\n`
    }
    
    // Convert MDX components to markdown
    let convertedContent = content
    
    // Convert ComponentPreview to markdown with demo source code
    convertedContent = convertedContent.replace(
      /<ComponentPreview\s+name="([^"]+)"[^>]*\/>/g,
      (match: string, name: string) => {
        try {
          // Try to load the demo source code from the registry
          const registryPath = path.join(baseDir, "public", "r", `${name}.json`)
          if (fs.existsSync(registryPath)) {
            const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
            const mainFile = registry.files.find(
              (file: any) => file.path.split("/").pop().replace(/\.(tsx|ts)$/, "") === name
                        )
            
            if (mainFile) {
              return `Example:\n\n\`\`\`tsx\n${mainFile.content}\n\`\`\`\n`
            }
          }
          // Fallback to link if demo source not found
          return `See the interactive demo at: [${name}](https://fancycomponents.dev/docs/components/${slug.join("/")})\n\n`
        } catch (error) {
          // Fallback to link if error loading demo source
          return `See the interactive demo at: [${name}](https://fancycomponents.dev/docs/components/${slug.join("/")})\n\n`
        }
      }
    )
    
    // Convert Link components to markdown links
    convertedContent = convertLinksToMarkdown(convertedContent)
    
    // Convert ComponentSource to markdown code block
    convertedContent = convertComponentSourceToMarkdown(convertedContent, includeSourceCode)
    
    // Convert InstallTabs to markdown
    convertedContent = convertInstallTabsToMarkdown(convertedContent, includeInstallInstructions)
    
    // Convert CodeSnippet to markdown code blocks
    convertedContent = convertCodeSnippetsToMarkdown(convertedContent)
    
    // Convert custom tables to markdown
    convertedContent = convertTablesToMarkdown(convertedContent)
    
    // Convert Tabs to markdown sections
    convertedContent = convertTabsToMarkdown(convertedContent)
    
    // Clean up any remaining JSX-style components
    convertedContent = cleanupRemainingComponents(convertedContent)
    
    // Generate table of contents
    const toc = generateTableOfContents(convertedContent)
    
    // Combine everything
    markdown += toc + convertedContent
    
    // Add footer
    markdown += `\n\n---\n\n*This documentation is also available in [interactive format](https://fancycomponents.dev/docs/components/${slug.join("/")}).*\n`
    
    return markdown.trim()
    
  } catch (error) {
    console.error("Error converting MDX to markdown:", error)
    throw new Error(`Failed to convert ${slug.join("/")} to markdown`)
  }
}

function convertLinksToMarkdown(content: string): string {
  // Convert Link components to markdown links
  return content.replace(
    /<Link\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/Link>/g,
    (match, href, linkText) => {
      // Clean the link text (remove any nested HTML)
      const cleanText = linkText.replace(/<[^>]*>/g, '').trim()
      
      // Add the base URL if it's a relative path
      let fullUrl = href
      if (href.startsWith('/')) {
        fullUrl = `https://fancycomponents.dev${href}.md`
      }
      
      return `[${cleanText}](${fullUrl})`
    }
  )
}

function convertComponentSourceToMarkdown(content: string, includeSourceCode: boolean): string {
  if (!includeSourceCode) {
    return content.replace(/<ComponentSource[^>]*\/>/g, "")
  }
  
  return content.replace(
    /<ComponentSource\s+name="([^"]+)"[^>]*\/>/g,
    (match, name) => {
      try {
        // Try to load the source code from the registry
        const registryPath = path.join(baseDir, "public", "r", `${name}.json`)
        if (fs.existsSync(registryPath)) {
          const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
          const mainFile = registry.files.find(
            (file: any) => file.path.split("/").pop().replace(/\.(tsx|ts)$/, "") === name
          )
          
          if (mainFile) {
            return `#### ${name}\n\n\`\`\`tsx\n${mainFile.content}\n\`\`\`\n\n`
          }
        }
        return `#### ${name}\n\nSource code for \`${name}\` component.\n\n`
      } catch (error) {
        return `#### ${name}\n\nSource code for \`${name}\` component.\n\n`
      }
    }
  )
}

function convertInstallTabsToMarkdown(content: string, includeInstructions: boolean): string {
  if (!includeInstructions) {
    return content.replace(/<InstallTabs[^>]*\/>/g, "")
  }
  
  return content.replace(
    /<InstallTabs\s+command="([^"]+)"[^>]*\/>/g,
    (match, command) => {
      const decodedCommand = command.replace(/&quot;/g, '"')
      return `\`\`\`bash\n${decodedCommand}\n\`\`\`\n\n`
    }
  )
}

function convertCodeSnippetsToMarkdown(content: string): string {
  // Convert CodeSnippet components to regular markdown code blocks
  return content.replace(
    /<CodeSnippet\s+title="([^"]*)"[^>]*>\s*```(\w+)?\n([\s\S]*?)\n```\s*<\/CodeSnippet>/g,
    (match, title, language, code) => {
      const lang = language || "typescript"
      return `${title ? `### ${title}\n\n` : ""}\`\`\`${lang}\n${code}\n\`\`\`\n\n`
    }
  )
}

function convertTablesToMarkdown(content: string): string {
  // Convert JSX tables to proper markdown tables
  let result = content
  
  // Process each table block
  result = result.replace(/<Table[^>]*>[\s\S]*?<\/Table>/g, (tableBlock) => {
    // Extract header content
    const headerMatch = tableBlock.match(/<TableHeader[^>]*>([\s\S]*?)<\/TableHeader>/)
    const bodyMatch = tableBlock.match(/<TableBody[^>]*>([\s\S]*?)<\/TableBody>/)
    
    if (!headerMatch || !bodyMatch) {
      return tableBlock // Return original if can't parse
    }
    
    // Extract header cells
    const headerContent = headerMatch[1]
    const headerCells = extractTableCells(headerContent, 'TableHead')
    
    // Extract body rows
    const bodyContent = bodyMatch[1]
    const bodyRows = extractTableRows(bodyContent)
    
    if (headerCells.length === 0) {
      return tableBlock // Return original if no headers
    }
    
    // Build markdown table
    let markdownTable = ''
    
    // Header row
    markdownTable += '| ' + headerCells.join(' | ') + ' |\n'
    
    // Separator row
    markdownTable += '|' + headerCells.map(() => '----------|').join('') + '\n'
    
    // Body rows
    bodyRows.forEach(row => {
      if (row.length > 0) {
        // Pad row to match header length
        while (row.length < headerCells.length) {
          row.push('')
        }
        markdownTable += '| ' + row.join(' | ') + ' |\n'
      }
    })
    
    return markdownTable + '\n'
  })
  
  return result
}

function extractTableCells(content: string, cellType: string): string[] {
  const cellRegex = new RegExp(`<${cellType}[^>]*>([\\s\\S]*?)<\\/${cellType}>`, 'g')
  const cells: string[] = []
  let match
  
  while ((match = cellRegex.exec(content)) !== null) {
    // Clean the cell content
    let cellContent = match[1]
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
    
    cells.push(cellContent)
  }
  
  return cells
}

function extractTableRows(content: string): string[][] {
  const rowRegex = /<TableRow[^>]*>([\s\S]*?)<\/TableRow>/g
  const rows: string[][] = []
  let match
  
  while ((match = rowRegex.exec(content)) !== null) {
    const rowContent = match[1]
    const cells = extractTableCells(rowContent, 'TableCell')
    if (cells.length > 0) {
      rows.push(cells)
    }
  }
  
  return rows
}

function convertTabsToMarkdown(content: string): string {
  // Convert Tabs to markdown sections
  let result = content
  
  // Replace entire Tabs blocks with converted content
  result = result.replace(/<Tabs[^>]*>[\s\S]*?<\/Tabs>/g, (tabsBlock) => {
    // Extract TabsContent sections from this specific tabs block
    const tabsContentMatches = tabsBlock.match(/<TabsContent[^>]*value="([^"]+)"[^>]*>([\s\S]*?)<\/TabsContent>/g)
    
    if (!tabsContentMatches) return ''
    
    return tabsContentMatches.map(tabMatch => {
      const valueMatch = tabMatch.match(/value="([^"]+)"/)
      const contentMatch = tabMatch.match(/<TabsContent[^>]*>([\s\S]*?)<\/TabsContent>/)
      
      if (!valueMatch || !contentMatch) return ''
      
      const value = valueMatch[1]
      const content = contentMatch[1].trim()
      
      // Capitalize the first letter of the tab value
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1)
      
      return `### ${capitalizedValue}\n\n${content}\n\n`
    }).join('')
  })
  
  return result
}

function cleanupRemainingComponents(content: string): string {
  // Remove specific MDX components that don't have markdown equivalents
  // But preserve JSX components inside code blocks
  let result = content
  
  // Remove ExplanationDemo components
  result = result.replace(/<ExplanationDemo[^>]*\/>/g, "")
  
  // Split content by code blocks to avoid cleaning inside them
  const codeBlockRegex = /(```[\s\S]*?```)/g
  const parts = result.split(codeBlockRegex)
  
  // Clean up only the parts that are NOT code blocks (odd indices are code blocks)
  for (let i = 0; i < parts.length; i += 2) {
    // Only clean non-code-block parts
    if (parts[i]) {
      // Remove other known MDX components that we might have missed
      parts[i] = parts[i]
        .replace(/<Balancer[^>]*>/g, "")
        .replace(/<\/Balancer>/g, "")
        .replace(/<Link[^>]*>/g, "")
        .replace(/<\/Link>/g, "")
        .replace(/<TabsTrigger[^>]*>/g, "")
        .replace(/<\/TabsTrigger>/g, "")
        .replace(/<TabsList[^>]*>/g, "")
        .replace(/<\/TabsList>/g, "")
        // Clean up any remaining tab-related tags
        .replace(/<TabsContent[^>]*>/g, "")
        .replace(/<\/TabsContent>/g, "")
        
        // Clean up any remaining unknown single-tag components
        .replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, "")
    }
  }
  
  result = parts.join("")
  
  // Clean up extra whitespace
  result = result.replace(/\n\n\n+/g, "\n\n").trim()
  
  return result
}

function getAllMdxFiles(): string[][] {
  const contentDir = path.join(baseDir, CONTENT_DIRECTORY)
  const allFiles: string[][] = []
  
  function traverseDirectory(dir: string, currentPath: string[] = []) {
    const files = fs.readdirSync(dir)
    
    files.forEach((file: string) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        traverseDirectory(filePath, [...currentPath, file])
      } else if (file.endsWith('.mdx')) {
        const fileName = file.replace('.mdx', '')
        allFiles.push([...currentPath, fileName])
      }
    })
  }
  
  traverseDirectory(contentDir)
  return allFiles
}

async function buildMarkdownDocs() {
  console.log("Building markdown documentation...")
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // Get all MDX files
  const allMdxFiles = getAllMdxFiles()
  
  for (const slug of allMdxFiles) {
    try {
      console.log(`Converting: ${slug.join("/")}`)
      
      // Convert to markdown
      const markdown = await convertMdxToMarkdown(slug)
      
      // Create output directory structure
      const outputPath = path.join(outputDir, ...slug)
      const outputFileDir = path.dirname(outputPath)
      
      if (!fs.existsSync(outputFileDir)) {
        fs.mkdirSync(outputFileDir, { recursive: true })
      }
      
      // Write markdown file
      fs.writeFileSync(`${outputPath}.md`, markdown)
      
      console.log(`✓ Generated: ${slug.join("/")}.md`)
      
    } catch (error) {
      console.error(`✗ Failed to convert ${slug.join("/")}:`, error)
    }
  }
  
  console.log("Markdown documentation build completed!")
}

buildMarkdownDocs()