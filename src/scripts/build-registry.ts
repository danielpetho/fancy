// @ts-ignore
const fs = require("fs")
// @ts-ignore
const path = require("path")

const baseDir = path.join(__dirname, "..", "fancy")
const componentsDir = path.join(baseDir, "components")
const examplesDir = path.join(baseDir, "examples")
const hooksDir = path.join(__dirname, "..", "hooks")

type RegistryType = "registry:ui" | "registry:example" | "registry:hook"

interface RegistryFile {
  path: string
  type: RegistryType
}

interface RegistryItem {
  name: string
  type: RegistryType
  files: RegistryFile[]
  registryDependencies?: string[]
  dependencies?: string[]
  component?: string
}

function findHookImports(sourceCode: string): string[] {
  // Only match imports from @/hooks/
  const hookImportRegex = /import\s+{[^}]*}\s+from\s+['"]@\/hooks\/([^'"]+)['"]/g
  const hooks: string[] = []
  let match

  while ((match = hookImportRegex.exec(sourceCode)) !== null) {
    // Get the hook name from the file path
    // e.g., "use-dimensions" from "@/hooks/use-dimensions"
    const hookName = match[1].replace(/\.(ts|tsx)$/, '')
    hooks.push(hookName)
  }

  return hooks
}

function findComponentImports(sourceCode: string): string[] {
  // Match imports from @/fancy/components/ or @/fancy/examples/
  const componentImportRegex = /import\s+{?[^}]*}?\s+from\s+['"]@\/fancy\/(components|examples)\/([^'"]+)['"]/g
  const components: string[] = []
  let match

  while ((match = componentImportRegex.exec(sourceCode)) !== null) {
    const [_, type, componentPath] = match
    // Get the component name from the path and convert to kebab case
    const componentName = componentPath
      .replace(/\.(ts|tsx)$/, '')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '')
    
    components.push(`fancy/${componentName}`)
  }

  return components
}

function findExternalDependencies(sourceCode: string): string[] {
  // Match all imports that:
  // - Don't start with @/
  // - Don't start with react (ignore react, react-dom etc)
  // - Don't start with ./ or ../
  const externalImportRegex = /from\s+['"]([^'"@\./][^'"]+)['"]/g
  const dependencies = new Set<string>()
  let match

  while ((match = externalImportRegex.exec(sourceCode)) !== null) {
    const [_, importPath] = match
    // Get the package name (everything before any / character)
    const packageName = importPath.split('/')[0]
    
    // Skip react-related packages
    if (!packageName.startsWith('react')) {
      dependencies.add(packageName)
    }
  }

  return Array.from(dependencies)
}

function generateRegistryItem(
  filePath: string,
  type: "ui" | "example" | "hook",
  allHooks: Record<string, string>
): RegistryItem | null {
  // Get the relative path from the components or examples directory
  const baseDirectory =
    type === "hook"
      ? hooksDir
      : type === "example"
        ? examplesDir
        : componentsDir

  const relativePath = path.relative(baseDirectory, filePath)
  const sourceCode = fs.readFileSync(filePath, "utf-8")

  const name = path
    .basename(filePath, path.extname(filePath))
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "")

  // Construct the import path with the correct directory structure
  const basePath =
    type === "hook"
      ? "@/hooks/"
      : type === "example"
        ? "@/fancy/examples/"
        : "@/fancy/components/"
  const importPath = `${basePath}${relativePath}`.replace(/\\/g, "/")
  const importPathWithoutExt = importPath.replace(/\.tsx?$/, "")

  const getSimplifiedPath = (
    originalPath: string,
    itemType: "ui" | "example" | "hook"
  ) => {
    const fileName = path.basename(originalPath, path.extname(originalPath))
    switch (itemType) {
      case "hook":
        return `hooks/${fileName}`
      case "example":
        return `examples/${fileName}`
      case "ui":
        return `fancy/${fileName}`
    }
  }

  const files: RegistryFile[] = [
    {
      path: getSimplifiedPath(filePath, type),
      type:
        type === "hook"
          ? "registry:hook"
          : type === "example"
            ? "registry:example"
            : "registry:ui",
    },
  ]

  if (type !== "hook") {
    // Add associated hooks to files array
    const usedHooks = findHookImports(sourceCode)
    usedHooks.forEach((hookName) => {
      files.push({
        path: `hooks/${hookName}`,
        type: "registry:hook",
      })
    })
  }

  // Find component dependencies
  const componentDeps = findComponentImports(sourceCode)
  const externalDeps = new Set(findExternalDependencies(sourceCode))

  // If this is not a hook, add dependencies from hook dependencies
  if (type !== "hook") {
    const usedHooks = findHookImports(sourceCode)
    usedHooks.forEach((hookName) => {
      const hookPath = path.join(hooksDir, `${hookName}.ts`)
      if (fs.existsSync(hookPath)) {
        const hookCode = fs.readFileSync(hookPath, "utf-8")
        const hookDeps = findExternalDependencies(hookCode)
        hookDeps.forEach(dep => externalDeps.add(dep))
      }
    })
  }
  
  const item: RegistryItem = {
    name,
    type:
      type === "hook"
        ? "registry:hook"
        : type === "example"
          ? "registry:example"
          : "registry:ui",
    files,
    ...(componentDeps.length > 0 && {
      registryDependencies: componentDeps
    }),
    ...(externalDeps.size > 0 && {
      dependencies: Array.from(externalDeps)
    }),
    ...(type !== "hook" && {
      component: `React.lazy(\n      () => import('${importPathWithoutExt}') \n)`,
    }),
  }

  return item
}

function buildHooksMap(): Record<string, string> {
  const hooksMap: Record<string, string> = {}

  function traverseHooks(dir: string) {
    const files = fs.readdirSync(dir)

    files.forEach((file: any) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        traverseHooks(filePath)
      } else if (file.match(/\.(ts|tsx)$/)) {
        const hookName = path.basename(file, path.extname(file))
        hooksMap[hookName] = `hooks/${hookName}` // Simplified hook path
      }
    })
  }

  traverseHooks(hooksDir)
  return hooksMap
}

const hooksMap = buildHooksMap()

function traverseDirectory(
  dir: string,
  type: "ui" | "example" | "hook"
): Record<string, RegistryItem> {
  const registry: Record<string, RegistryItem> = {}

  function traverse(currentDir: string) {
    const files = fs.readdirSync(currentDir)

    files.forEach((file: string) => {
      const filePath = path.join(currentDir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        traverse(filePath)
      } else if (file.match(/\.(tsx|ts)$/)) {
        const item = generateRegistryItem(filePath, type, hooksMap)
        if (item) {
          registry[item.name] = item
        }
      }
    })
  }

  traverse(dir)
  return registry
}

// Generate both registries
const fancy = traverseDirectory(componentsDir, "ui")
const example = traverseDirectory(examplesDir, "example")
const hooks = traverseDirectory(hooksDir, "hook")

// Generate the final index.ts content
const content = `import * as React from "react";
import { Registry } from "@/fancy/schema";

// This file is generated automatically. Do not edit it manually.

const fancy: Registry = ${JSON.stringify(fancy, null, 2)};

const example: Registry = ${JSON.stringify(example, null, 2)};

const hooks: Registry = ${JSON.stringify(hooks, null, 2)};

export const registry = {
  ...fancy,
  ...example,
  ...hooks,
};
`

// Replace double quotes with single quotes and fix the React.lazy imports
const formattedContent = content
  .replace(/"component": "(.*?)"/g, "component: $1")
  .replace(/\\n/g, "\n")
  .replace(/\s+\)/g, ")")
  .replace(/"\{/g, "{")
  .replace(/\}"/g, "}")
  .replace(/\\"/g, '"')

// Write the file
fs.writeFileSync(path.join(baseDir, "index.ts"), formattedContent)
console.log("Registry file generated successfully!")
