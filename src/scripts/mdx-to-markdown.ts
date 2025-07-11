import fs from "node:fs"
import path from "node:path"
import { CONTENT_DIRECTORY } from "../lib/get-docs"

interface ConversionOptions {
  includeSourceCode?: boolean
  includeInstallInstructions?: boolean
}

export async function convertMdxToMarkdown(
  slug: string[], 
  options: ConversionOptions = {}
): Promise<string> {
  const { includeSourceCode = true, includeInstallInstructions = true } = options
  
  try {
    // Read the MDX file
    const filePath = path.join(process.cwd(), CONTENT_DIRECTORY, slug.join("/")) + ".mdx"
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
      markdown += `${description}\n\n`
    }
    
    // Convert MDX components to markdown
    let convertedContent = content
    
    // Convert ComponentPreview to markdown
    convertedContent = convertedContent.replace(
      /<ComponentPreview\s+name="([^"]+)"[^>]*\/>/g,
      (match, name) => {
        return `## Demo\n\nSee the interactive demo at: [${name}](https://fancycomponents.dev/docs/components/${slug.join("/")})\n\n`
      }
    )
    
    // Convert ComponentSource to markdown code block
    convertedContent = await convertComponentSourceToMarkdown(convertedContent, includeSourceCode)
    
    // Convert InstallTabs to markdown
    convertedContent = convertInstallTabsToMarkdown(convertedContent, includeInstallInstructions)
    
    // Convert CodeSnippet to markdown code blocks
    convertedContent = convertCodeSnippetsToMarkdown(convertedContent)
    
    // Convert custom tables (they're already mostly markdown compatible)
    convertedContent = convertTablesToMarkdown(convertedContent)
    
    // Convert Tabs to markdown sections
    convertedContent = convertTabsToMarkdown(convertedContent)
    
    // Clean up any remaining JSX-style components
    convertedContent = cleanupRemainingComponents(convertedContent)
    
    markdown += convertedContent
    
    // Add footer
    markdown += `\n\n---\n\n*This documentation is also available in [interactive format](https://fancycomponents.dev/docs/components/${slug.join("/")}).*\n`
    
    return markdown.trim()
    
  } catch (error) {
    console.error("Error converting MDX to markdown:", error)
    throw new Error(`Failed to convert ${slug.join("/")} to markdown`)
  }
}

async function convertComponentSourceToMarkdown(content: string, includeSourceCode: boolean): Promise<string> {
  if (!includeSourceCode) {
    return content.replace(/<ComponentSource[^>]*\/>/g, "")
  }
  
  return content.replace(
    /<ComponentSource\s+name="([^"]+)"[^>]*\/>/g,
    async (match, name) => {
      try {
        // Try to load the source code from the registry
        const registryPath = path.join(process.cwd(), "public", "r", `${name}.json`)
        if (fs.existsSync(registryPath)) {
          const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
          const mainFile = registry.files.find(
            (file: any) => file.path.split("/").pop().replace(".tsx", "") === name
          )
          
          if (mainFile) {
            return `## Source Code\n\n\`\`\`tsx\n${mainFile.content}\n\`\`\`\n\n`
          }
        }
        return `## Source Code\n\nSource code for \`${name}\` component.\n\n`
      } catch (error) {
        return `## Source Code\n\nSource code for \`${name}\` component.\n\n`
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
      return `## Installation\n\n\`\`\`bash\n${decodedCommand}\n\`\`\`\n\n`
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
  // Tables are mostly already markdown compatible, just clean up any JSX attributes
  return content
    .replace(/<Table[^>]*>/g, "")
    .replace(/<\/Table>/g, "")
    .replace(/<TableHeader[^>]*>/g, "")
    .replace(/<\/TableHeader>/g, "")
    .replace(/<TableBody[^>]*>/g, "")
    .replace(/<\/TableBody>/g, "")
    .replace(/<TableRow[^>]*>/g, "|")
    .replace(/<\/TableRow>/g, "|\n")
    .replace(/<TableHead[^>]*>/g, " ")
    .replace(/<\/TableHead>/g, " |")
    .replace(/<TableCell[^>]*>/g, " ")
    .replace(/<\/TableCell>/g, " |")
}

function convertTabsToMarkdown(content: string): string {
  // Convert Tabs to markdown sections
  let result = content
  
  // Remove Tabs wrapper
  result = result.replace(/<Tabs[^>]*>/g, "")
  result = result.replace(/<\/Tabs>/g, "")
  
  // Convert TabsList and TabsTrigger to section headers
  result = result.replace(/<TabsList[^>]*>/g, "")
  result = result.replace(/<\/TabsList>/g, "")
  result = result.replace(/<TabsTrigger[^>]*value="([^"]+)"[^>]*>(.*?)<\/TabsTrigger>/g, "")
  
  // Convert TabsContent to sections
  result = result.replace(/<TabsContent[^>]*value="([^"]+)"[^>]*>/g, "### $1\n\n")
  result = result.replace(/<\/TabsContent>/g, "\n\n")
  
  return result
}

function cleanupRemainingComponents(content: string): string {
  // Remove any remaining JSX-style components that don't have markdown equivalents
  return content
    .replace(/<ExplanationDemo[^>]*\/>/g, "")
    .replace(/<[A-Z][^>]*>/g, "")
    .replace(/<\/[A-Z][^>]*>/g, "")
    // Clean up extra whitespace
    .replace(/\n\n\n+/g, "\n\n")
}