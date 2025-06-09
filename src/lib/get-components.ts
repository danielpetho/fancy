import fs from "node:fs"
import path from "node:path"

export const COMPONENTS_DIRECTORY = "/src/content/docs/components/"

export interface Component {
  name: string
  category: string
  thumbnail: {
    url: string
  }
  demo: {
    url: string
  }
}

export function getAllComponentNames(): string[] {
  const componentsPath = path.join(process.cwd(), COMPONENTS_DIRECTORY)
  const categories = fs.readdirSync(componentsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const componentNames: string[] = []

  for (const category of categories) {
    const categoryPath = path.join(componentsPath, category)
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''))

    componentNames.push(...files)
  }

  return componentNames
}

export function getAllComponents(): Component[] {
  const componentsPath = path.join(process.cwd(), COMPONENTS_DIRECTORY)
  const categories = fs.readdirSync(componentsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const components: Component[] = []

  for (const category of categories) {
    const categoryPath = path.join(componentsPath, category)
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''))

    for (const componentName of files) {
      components.push({
        name: componentName,
        category: category,
        thumbnail: {
          url: `${process.env.BUNNY_CDN_URL}/thumbnails/${componentName}.jpg`
        },
        demo: {
          url: `${process.env.BUNNY_CDN_URL}/demos/${componentName}.mp4`
        }
      })
    }
  }

  return components
}

export function getComponentByName(name: string): Component | undefined {
  const componentsPath = path.join(process.cwd(), COMPONENTS_DIRECTORY)
  const categories = fs.readdirSync(componentsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const category of categories) {
    const categoryPath = path.join(componentsPath, category)
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''))

    if (files.includes(name)) {
      return {
        name: name,
        category: category,
        thumbnail: {
          url: `${process.env.BUNNY_CDN_URL}/thumbnails/${name}.jpg`
        },
        demo: {
          url: `${process.env.BUNNY_CDN_URL}/demos/${name}.mp4`
        }
      }
    }
  }

  return undefined
}

