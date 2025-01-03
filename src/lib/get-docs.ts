import fs from "node:fs"
import path from "node:path"
import { mdxComponents } from "@/mdx-components"
import { compileMDX } from "next-mdx-remote/rsc"

import { Doc, DocPageProps } from "@/types/types"

import { getTableOfContents } from "./toc"

export const CONTENT_DIRECTORY = "/src/content/docs/"

export async function getDocFromParams({ params }: DocPageProps): Promise<Doc> {
  const source = fs.readFileSync(
    path.join(process.cwd(), CONTENT_DIRECTORY, params.slug.join("/")) + ".mdx",
    "utf8"
  )

  const toc = await getTableOfContents(source)

  // Use the Next.js component mappings
  const components = mdxComponents()

  const { content, frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
    components,
  })

  return {
    slug: params.slug.join("/"),
    slugAsParams: params.slug.join("/"),
    _id: params.slug.join("/"),
    type: "Doc",
    title: String(frontmatter.title),
    description: String(frontmatter.description),
    published: Boolean(frontmatter.published),
    featured: Boolean(frontmatter.featured),
    component: Boolean(frontmatter.component),
    author: String(frontmatter.author),
    toc: toc,
    body: content,
  }
}
