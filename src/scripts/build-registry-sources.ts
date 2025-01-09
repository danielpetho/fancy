// @ts-ignore
const fs = require("fs")
// @ts-ignore
const path = require("path")

// @ts-ignore
const baseDir = path.join(__dirname, "..", "..")
const registryJsonPath = path.join(baseDir, "public", "index.json")

// Single output directory for all registry items
const registryOutputDir = path.join(baseDir, "public/r")

// Ensure output directory exists
if (!fs.existsSync(registryOutputDir)) {
  fs.mkdirSync(registryOutputDir, { recursive: true })
}

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

function processRegistryItem(name: string, item: any) {
  const output: any = {
    name,
    type: item.type,
    dependencies: item.dependencies || [],
    files: []
  }

  // Add registry dependencies URLs if they exist
  if (item.registryDependencies && item.registryDependencies.length > 0) {
    output.registryDependencies = item.registryDependencies.map((dep: string) => {
      const depName = dep.split('/').pop()
      return `https://fancycomponents.dev/r/${depName}.json`
    })
  }

  // Add devDependencies if they exist
  if (item.devDependencies) {
    output.devDependencies = item.devDependencies
  }

  // Add tailwind config if it exists
  if (item.tailwind && Object.keys(item.tailwind.config || {}).length > 0) {
    output.tailwind = item.tailwind
  }

  // Process each file in the registry item
  item.files.forEach((file: any) => {
    let sourceFilePath: string = ""
    
    // Skip files from _helpers folder
    if (file.path.includes('_helpers')) {
      return
    }

    // Get the file name without prefix
    const fileName = file.path.split('/').pop()

    // Determine target path based on file type
    let targetPath = ""
    if (file.type === "registry:hook") {
      const hookPath = file.path.replace('hooks/', '')
      sourceFilePath = path.join(baseDir, "src", "hooks", `${hookPath}.ts`)
      targetPath = `/hooks/${fileName}.ts`
    } else if (file.type === "registry:ui") {
      const componentPath = file.path.replace('fancy/', '')
      sourceFilePath = path.join(baseDir, "src", "fancy", "components", `${componentPath}.tsx`)
      targetPath = `/components/fancy/${fileName}.tsx`
    } else if (file.type === "registry:example") {
      const examplePath = file.path.replace('examples/', '')
      sourceFilePath = path.join(baseDir, "src", "fancy", "examples", `${examplePath}.tsx`)
      targetPath = `/components/fancy/${fileName}.tsx`
    } else if (file.type === "registry:lib") {
      const utilPath = file.path.replace('utils/', '')
      sourceFilePath = path.join(baseDir, "src", "utils", `${utilPath}.ts`)
      targetPath = `/utils/${fileName}.ts`
    }

    if (sourceFilePath !== "") {
      const content = getSourceContent(sourceFilePath)
      // Add appropriate extension based on file type
      const pathWithExt = file.type === "registry:ui" || file.type === "registry:example"
        ? `${file.path}.tsx`
        : `${file.path}.ts`

      output.files.push({
        path: pathWithExt.startsWith('/') ? pathWithExt : `/${pathWithExt}`,
        content,
        type: file.type,
        target: targetPath
      })
    }
  })

  return output
}

function buildSourceFiles() {
  // Read the registry
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"))

  // Process each item in the registry
  Object.entries(registry).forEach(([name, item]: [string, any]) => {
    const sourceFile = processRegistryItem(name, item)
    
    // Write all items to the registry directory
    const outputPath = path.join(registryOutputDir, `${name}.json`)
    fs.writeFileSync(outputPath, JSON.stringify(sourceFile, null, 2))
    console.log(`Generated source file for: ${name}`)
  })

  console.log("Source files generation completed.")
}

buildSourceFiles()