const fs = require("fs");
const path = require("path");

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