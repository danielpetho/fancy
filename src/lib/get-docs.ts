import { mdxComponents } from "@/mdx-components";
import { Doc, DocPageProps } from "@/types/types";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs";
import path from "node:path";

export const CONTENT_DIRECTORY = "/src/content/docs/";

export async function getDocFromParams({ params }: DocPageProps): Promise<Doc> {
  const source = fs.readFileSync(
    path.join(process.cwd(), CONTENT_DIRECTORY, params.slug.join("/")) + ".mdx",
    "utf8"
  );

  // Use the Next.js component mappings
  const components = mdxComponents();

  const { content, frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
    components,
  });

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
    toc: Boolean(frontmatter.toc),
    body: content,
  };
}
