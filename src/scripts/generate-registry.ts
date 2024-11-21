const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, "..", "fancy");
const componentsDir = path.join(baseDir, "components");
const examplesDir = path.join(baseDir, "examples");

interface RegistryItem {
  name: string;
  type: "components:fancy" | "components:example";
  files: string[];
  component?: string;
}

function generateRegistryItem(
  filePath: string,
  isExample: boolean
): RegistryItem | null {
  // Get the relative path from the components or examples directory
  const relativePath = isExample 
    ? path.relative(examplesDir, filePath)
    : path.relative(componentsDir, filePath);

  const name = path
    .basename(filePath, path.extname(filePath))
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  // Construct the import path with the correct directory structure
  const basePath = isExample ? "@/fancy/examples/" : "@/fancy/components/";
  const importPath = `${basePath}${relativePath}`.replace(/\\/g, "/");
  const importPathWithoutExt = importPath.replace(/\.tsx?$/, "");

  const item: RegistryItem = {
    name,
    type: isExample ? "components:example" : "components:fancy",
    files: [importPath],
    component: `React.lazy(\n      () => import('${importPathWithoutExt}') \n)`
  };

  return item;
}

function traverseDirectory(
  dir: string,
  isExample: boolean
): Record<string, RegistryItem> {
  const registry: Record<string, RegistryItem> = {};

  function traverse(currentDir: string) {
    const files = fs.readdirSync(currentDir);

    files.forEach((file: string) => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverse(filePath);
      } else if (file.match(/\.(tsx|jsx)$/) && !file.includes("index.")) {
        const registryItem = generateRegistryItem(filePath, isExample);
        if (registryItem) {
          registry[registryItem.name] = registryItem;
        }
      }
    });
  }

  traverse(dir);
  return registry;
}

// Generate both registries
const fancy = traverseDirectory(componentsDir, false);
const example = traverseDirectory(examplesDir, true);

// Generate the final index.ts content
const content = `import * as React from "react";
import { Registry } from "@/fancy/schema";

const fancy: Registry = ${JSON.stringify(fancy, null, 2)};

const example: Registry = ${JSON.stringify(example, null, 2)};

export const registry = {
  ...fancy,
  ...example,
};
`;

// Replace double quotes with single quotes and fix the React.lazy imports
const formattedContent = content
  .replace(/"component": "(.*?)"/g, "component: $1")
  .replace(/\\n/g, "\n")
  .replace(/\s+\)/g, ")")
  .replace(/"\{/g, "{")
  .replace(/\}"/g, "}")
  .replace(/\\"/g, '"');

// Write the file
fs.writeFileSync(path.join(baseDir, "index.ts"), formattedContent);
console.log("Registry file generated successfully!");

// Generate the source files
const _baseDir = path.join(__dirname, '..', '..', 'src/fancy');
const dirsToProcess = ['components', 'examples'];
const outputDir = path.join(__dirname, '..', '..', '.component-sources');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function processFile(filePath: string) {
  const fileName = path.basename(filePath);
  const fileExt = path.extname(fileName);

  // Skip index.ts and schema.ts files
  if (fileName === 'index.ts' || fileName === 'schema.ts') {
    return;
  }

  if (fileExt === '.tsx' || fileExt === '.jsx' || fileExt === '.ts' || fileExt === '.js') {
    const componentName = path.basename(fileName, fileExt);
    const sourceCode = fs.readFileSync(filePath, 'utf-8');
    const outputPath = path.join(outputDir, `${componentName}.json`);

    const jsonContent = JSON.stringify({ sourceCode });
    fs.writeFileSync(outputPath, jsonContent);
    console.log(`Generated source file for: ${componentName}`);
  }
}

function readComponentFiles(dir: string) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      readComponentFiles(filePath);
    } else {
      processFile(filePath);
    }
  });
}

dirsToProcess.forEach(dir => {
  const fullDir = path.join(_baseDir, dir);
  if (fs.existsSync(fullDir)) {
    console.log(`Processing directory: ${fullDir}`);
    readComponentFiles(fullDir);
  } else {
    console.warn(`Directory not found: ${fullDir}`);
  }
});

console.log('Source files generation process completed.');