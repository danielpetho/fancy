const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', '..', 'src/fancy');
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
  const fullDir = path.join(baseDir, dir);
  if (fs.existsSync(fullDir)) {
    console.log(`Processing directory: ${fullDir}`);
    readComponentFiles(fullDir);
  } else {
    console.warn(`Directory not found: ${fullDir}`);
  }
});

console.log('Source files generation process completed.');