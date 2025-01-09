// @ts-ignore
const fs = require("fs")
// @ts-ignore
const path = require("path")

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

function buildSourceFiles() {
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
}

buildSourceFiles() 