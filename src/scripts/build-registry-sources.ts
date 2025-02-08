// @ts-ignore
const fs = require("fs")
// @ts-ignore
const path = require("path")

// @ts-ignore
const baseDir = path.join(__dirname, "..", "..")
const registryJsonPath = path.join(baseDir, "public", "index.json")

// Single output directory for all registry items
const registryOutputDir = path.join(baseDir, "public/r")

 // Get the category from the file path (the directory structure)
 const getCategory = (filePath: string) => {
  const parts = filePath.split('/')
  // Remove the filename and get the parent directory if it exists
  parts.pop()
  return parts.length > 0 ? parts[parts.length - 1] : ''
}


// Ensure output directory exists
if (!fs.existsSync(registryOutputDir)) {
  fs.mkdirSync(registryOutputDir, { recursive: true })
}


// ---------------------------------------------------------------------------
// Helper: Safely read file content
function getSourceContent(filePath: string): string {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File does not exist: ${filePath}`)
      return ""
    }
    return fs.readFileSync(filePath, "utf-8")
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return ""
  }
}

function resolveColorInContent(content: string): string {
  const colorMappings = {
    'primaryRed': '#ff5941',
    'primaryOrange': '#f97316',
    'primaryPink': '#e794da',
    'primaryBlue': '#0015ff',
    'teal': '#1f464d',
    'teal-foreground': '#3bb6ab',
    'yellow': '#eab308',
    'yellow-foreground': '#ffd726'
  }

  // Replace color classes with their hex values
  let newContent = content

  // Handle the container transformation first (before color replacements). this is for v0.
  // Look for the first occurrence of a container with w-full h-full
  const containerRegex = /(<(?:div|section)[^>]*\bclass(?:Name)?=["'](?:[^"']*\s)?)(w-full\s+h-full|h-full\s+w-full)(\s[^"']*["'][^>]*>)/i
  newContent = newContent.replace(containerRegex, (match, prefix, dimensions, suffix) => {
    return `${prefix}w-dv h-dh${suffix}`
  })

  
  // Handle basic color classes (bg-red, text-red, etc.)
  Object.entries(colorMappings).forEach(([color, hex]) => {
    // Match patterns like bg-red, text-red, border-red, etc.
    const regex = new RegExp(`(bg|text|border|ring|outline|fill|stroke)-${color}(?![\\w-])`, 'g')
    newContent = newContent.replace(regex, `$1-[${hex}]`)
  })

  // Handle opacity modifiers (bg-red/50, text-red/75, etc.)
  Object.entries(colorMappings).forEach(([color, hex]) => {
    const opacityRegex = new RegExp(`(bg|text|border|ring|outline|fill|stroke)-${color}/([0-9]+)`, 'g')
    newContent = newContent.replace(opacityRegex, (_, prefix, opacity) => {
      const alpha = parseInt(opacity) / 100
      return `${prefix}-[${hex}${alpha.toString(16).padStart(2, '0')}]`
    })
  })

  return newContent
}

// ---------------------------------------------------------------------------
// "file => { path, content, target }"
function processItemFiles(registryItem: any): any[] {
  const out: any[] = []
  if (!registryItem.files) return out

  registryItem.files.forEach((file: any) => {
    // skip any _helpers folder
    if (file.path.includes('_helpers')) {
      return
    }

    let sourceFilePath = ""
    const fileName = file.path.split('/').pop()

    if (file.type === "registry:hook") {
      const hookPath = file.path.replace('hooks/', '')
      sourceFilePath = path.join(baseDir, "src", "hooks", `${hookPath}.ts`)
    } else if (file.type === "registry:ui") {
      const componentPath = file.path.replace('fancy/', '')
      sourceFilePath = path.join(baseDir, "src", "fancy", "components", `${componentPath}.tsx`)
    } else if (file.type === "registry:block") {
      const examplePath = file.path.replace('examples/', '')
      sourceFilePath = path.join(baseDir, "src", "fancy", "examples", `${examplePath}.tsx`)
    } else if (file.type === "registry:lib") {
      const utilPath = file.path.replace('utils/', '')
      sourceFilePath = path.join(baseDir, "src", "utils", `${utilPath}.ts`)
    }

    if (!sourceFilePath) return

    let content = getSourceContent(sourceFilePath)

    // Add appropriate extension for the path
    let extension = file.type === "registry:ui" || file.type === "registry:block"
      ? ".tsx"
      : ".ts"
    const pathWithExt =
      file.path.startsWith("/") ? file.path + extension : `/${file.path}${extension}`

    // We also compute the "target" path as your original code does
    let targetPath = ""
    if (file.type === "registry:hook") {
      targetPath = `/hooks/${fileName}.ts`
    } else if (file.type === "registry:ui") {
      const category = getCategory(file.path.replace('fancy/', ''))
      targetPath = category
        ? `/fancy/components/${category}/${fileName}.tsx`
        : `/fancy/components/${fileName}.tsx`
    } else if (file.type === "registry:block") {
      const examplePath = file.path.replace('examples/', '')
      const category = getCategory(examplePath)
      targetPath = category
        ? `/fancy/components/${category}/${fileName}.tsx`
        : `/fancy/components/${fileName}.tsx`
    } else if (file.type === "registry:lib") {
      const utilPath = file.path.replace('utils/', '')
      const category = getCategory(utilPath)
      targetPath = category
        ? `/utils/${category}/${fileName}.ts`
        : `/utils/${fileName}.ts`
    }

    // Only resolve colors for block registry items
    if (file.type === "registry:block") {
      content = resolveColorInContent(content)
    }
    

    out.push({
      path: pathWithExt,
      content,
      type: file.type,
      target: targetPath
    })
  })

  return out
}

// ---------------------------------------------------------------------------
// A function to recursively collect *all* files from a given registry
// item name, including that item's own files plus all of its nested
// registryDependencies. We gather them in an array so we can feed them
// into the final "files" for a block.
function gatherAllDependencyFiles(
  itemName: string,
  registry: Record<string, any>,
  visited = new Set<string>()
): any[] {
  if (!registry[itemName]) return []
  // If we've already processed this item, skip to avoid duplicates / loops:
  if (visited.has(itemName)) return []
  visited.add(itemName)

  const item = registry[itemName]
  let allFiles: any[] = []

  // 1) Collect *this* item's own files
  const processedFiles = processItemFiles(item)
  allFiles.push(...processedFiles)

  // 2) Recursively gather sub-dependencies (registryDependencies)
  if (item.registryDependencies) {
    item.registryDependencies.forEach((depUrl: string) => {
      // depUrl is e.g. 'https://fancycomponents.dev/r/gravity.json'
      // we want just "gravity"
      const depName = depUrl.split('/').pop()?.replace('.json', '')
      if (depName && registry[depName]) {
        const subFiles = gatherAllDependencyFiles(depName, registry, visited)
        allFiles.push(...subFiles)
      }
    })
  }

  return allFiles
}

// ---------------------------------------------------------------------------
// Helper to parse import statements from file content.
// We'll match lines like: import foo from "..."
function parseImports(content: string): string[] {
  const regex = /import\s+[^"'\n]+?\s+from\s+['"]([^'"]+)['"]/g
  const imports: string[] = []
  let match
  while ((match = regex.exec(content)) !== null) {
    imports.push(match[1])
  }
  return imports
}

// ---------------------------------------------------------------------------
// This now builds a single item's .json file
function processRegistryItem(name: string, item: any): any {
  const output: any = {
    "$schema": "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: item.type,
    dependencies: item.dependencies || [],
  }

  // Collect direct registryDependencies
  const registryDeps = new Set<string>()
  if (item.registryDependencies) {
    item.registryDependencies.forEach((dep: string) => {
      const fileName = dep.split('/').pop()
      registryDeps.add(`https://fancycomponents.dev/r/${fileName}.json`)
    })
  }

  // Also add hooks/libs from item.files
  item.files.forEach((f: any) => {
    if (f.type === "registry:hook" || f.type === "registry:lib") {
      const fileName = f.path.split('/').pop()
      registryDeps.add(`https://fancycomponents.dev/r/${fileName}.json`)
    }
  })

  // -------------------------------------------------------------------------
  // Gather all *actual* files for this item, including dependencies:
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"))
  let allFiles = gatherAllDependencyFiles(name, registry)

  // -------------------------------------------------------------------------
  // NEW: Detect in-file imports and handle them dynamically:
  allFiles.forEach((file) => {
    const imports = parseImports(file.content)
    imports.forEach((importPath) => {
      // 1) If it's from @/components/ui/... we treat it as shadcn external:
      if (importPath.startsWith("@/components/ui/")) {
        const name = importPath.split("/").pop() || ""
        // Only add if not already present
        if (!registryDeps.has(name)) {
          registryDeps.add(name)
        }
        return
      }

      // 2) If it's a local reference (like @/hooks/... or @/fancy/...), 
      //    see if it corresponds to another known registry item:
      const possibleName = importPath.split("/").pop() || ""
      // For example, importPath: "@/hooks/use-detect-browser" => name: "use-detect-browser"
      // If there's a known registry item with that name, add it to registryDeps:
      if (registry[possibleName]) {
        registryDeps.add(`https://fancycomponents.dev/r/${possibleName}.json`)
      }
    })
  })

  if (registryDeps.size > 0) {
    output.registryDependencies = Array.from(registryDeps)
  }

  // Add devDependencies
  if (item.devDependencies) {
    output.devDependencies = item.devDependencies
  }
  // Add tailwind config
  if (item.tailwind && Object.keys(item.tailwind.config || {}).length > 0) {
    output.tailwind = item.tailwind
  }

  // Remove duplicates by path in allFiles:
  const uniqueMap = new Map<string, any>()
  allFiles.forEach((f) => {
    uniqueMap.set(f.path, f)
  })
  output.files = Array.from(uniqueMap.values())

  // add cssVars for blocks
  if (item.type === "registry:block") {
    output.cssVars = {
      light: {
        red: "#ff5941",
        orange: "#f97316",
        pink: "#e794da",
        blue: "#0015ff",
        teal: "#1f464d",
        "teal-foreground": "#3bb6ab",
        yellow: "#eab308",
        "yellow-foreground": "#ffd726"
      }
    }

    // Merge existing tailwind config with our new colors
    if (!output.tailwind) {
      output.tailwind = { config: { theme: { extend: {} } } }
    }
    if (!output.tailwind.config) {
      output.tailwind.config = { theme: { extend: {} } }
    }
    if (!output.tailwind.config.theme) {
      output.tailwind.config.theme = { extend: {} }
    }
    if (!output.tailwind.config.theme.extend) {
      output.tailwind.config.theme.extend = {}
    }
    
    // Merge colors with existing extend colors if any
    output.tailwind.config.theme.extend = {
      ...output.tailwind.config.theme.extend,
      colors: {
        ...(output.tailwind.config.theme.extend.colors || {}),
        primaryRed: "var(--red)",
        primaryOrange: "var(--orange)",
        primaryPink: "var(--pink)",
        primaryBlue: "var(--blue)",
        teal: {
          DEFAULT: "var(--teal)",
          foreground: "var(--teal-foreground)",
        },
        yellow: {
          DEFAULT: "var(--yellow)",
          foreground: "var(--yellow-foreground)",
        }
      }
    }
  }

  return output
}

// ---------------------------------------------------------------------------
// Build the source files for all items
function buildSourceFiles() {
  // Read the registry
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"))

  // Process items in order: utils -> hooks -> ui -> blocks
  const processItemsByType = (type: string) => {
    Object.entries(registry).forEach(([name, item]: [string, any]) => {
      if (item.type === type) {
        const sourceFile = processRegistryItem(name, item)
        const outputPath = path.join(registryOutputDir, `${name}.json`)
        fs.writeFileSync(outputPath, JSON.stringify(sourceFile, null, 2))
        console.log(`Generated source file for: ${name}`)
      }
    })
  }

  processItemsByType("registry:lib")    // Utils first
  processItemsByType("registry:hook")   // Then hooks
  processItemsByType("registry:ui")     // Then UI components
  processItemsByType("registry:block")  // Finally blocks/demos

  console.log("Source files generation completed.")
}

buildSourceFiles()