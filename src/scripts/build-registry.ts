const fs = require("fs")
const path = require("path")

const baseDir = path.join(__dirname, "..", "fancy")
const componentsDir = path.join(baseDir, "components")
const examplesDir = path.join(baseDir, "examples")
const hooksDir = path.join(__dirname, "..", "hooks")

type RegistryType = "registry:ui" | "registry:example" | "registry:hook"

interface RegistryItem {
  name: string
  type: RegistryType
  files: string[]
  component?: string
}

function generateRegistryItem(
  filePath: string,
  type: "ui" | "example" | "hook" // Modified to accept type parameter
): RegistryItem | null {
  // Get the relative path from the components or examples directory
  const baseDirectory =
    type === "hook"
      ? hooksDir
      : type === "example"
        ? examplesDir
        : componentsDir

  const relativePath = path.relative(baseDirectory, filePath)

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

  const item: RegistryItem = {
    name,
    type:
      type === "hook"
        ? "registry:hook"
        : type === "example"
          ? "registry:example"
          : "registry:ui",
    files: [importPath],
    // Only add lazy loading for components and examples, not for hooks
    ...(type !== "hook" && {
      component: `React.lazy(\n      () => import('${importPathWithoutExt}') \n)`,
    }),
  }

  return item
}

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
      } else if (file.match(/\.(ts|js|tsx|jsx)$/) && !file.includes("index.")) {
        const registryItem = generateRegistryItem(filePath, type)
        if (registryItem) {
          registry[registryItem.name] = registryItem
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

// Generate the source files
const _baseDir = path.join(__dirname, "..", "..") // Adjust base directory to handle hooks
const dirsToProcess = ["components", "examples", "hooks"]

const componentsOutputDir = path.join(__dirname, "..", "..", "public/c")
const hooksOutputDir = path.join(__dirname, "..", "..", "public/h")

// Ensure both output directories exist
;[componentsOutputDir, hooksOutputDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

function processFile(filePath: string, isHook: boolean) {
  const fileName = path.basename(filePath)
  const fileExt = path.extname(fileName)

  // Skip index.ts and schema.ts files
  if (fileName === "index.ts" || fileName === "schema.ts") {
    return
  }

  if (
    fileExt === ".tsx" ||
    fileExt === ".jsx" ||
    fileExt === ".ts" ||
    fileExt === ".js"
  ) {
    const componentName = path.basename(fileName, fileExt)
    const sourceCode = fs.readFileSync(filePath, "utf-8")
    const outputPath = path.join(
      isHook ? hooksOutputDir : componentsOutputDir,
      `${componentName}.json`
    )

    const jsonContent = JSON.stringify({ sourceCode })
    fs.writeFileSync(outputPath, jsonContent)
    console.log(`Generated source file for: ${componentName}`)
  }
}

function readComponentFiles(dir: string, isHook: boolean) {
  const files = fs.readdirSync(dir)

  files.forEach((file: string) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      readComponentFiles(filePath, isHook)
    } else {
      processFile(filePath, isHook)
    }
  })
}

dirsToProcess.forEach((dir) => {
  const isHook = dir === "hooks"
  const fullDir = isHook
    ? path.join(_baseDir, "src/hooks")
    : path.join(_baseDir, "src/fancy", dir)

  if (fs.existsSync(fullDir)) {
    console.log(`Processing directory: ${fullDir}`)
    readComponentFiles(fullDir, isHook)
  } else {
    console.warn(`Directory not found: ${fullDir}`)
  }
})

console.log("Source files generation process completed.")
