import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";
import { useMDXComponents } from "@/mdx-components";
import { Doc } from "@/types/types";
import { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";

const CONTENT_DIRECTORY = "/src/content/docs/";

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [siteConfig.ogImage],
      creator: "@shadcn",
    },
  }
}


interface DocPageProps {
  params: {
    slug: string[]
  }
}

export function generateStaticParams() {
  const targets = fs.readdirSync(path.join(process.cwd(), CONTENT_DIRECTORY), {
    // Read nested directories and files
    recursive: true,
  });

  const files = [];

  for (const target of targets) {
    // Skip directories
    if (
      fs
        .lstatSync(
          path.join(process.cwd(), CONTENT_DIRECTORY, target.toString()),
        )
        .isDirectory()
    ) {
      continue;
    }

    // Add files as valid paths
    files.push(target);
  }

  // Return the list of files we want to match with, removing the `.mdx` suffix and breaking them up by directory.
  return files.map((file) => ({
    slug: file.toString().replace(".mdx", "").split("/"),
  }));
}

export async function getDocFromParams({ params }: DocPageProps): Promise<Doc> {
  const source = fs.readFileSync(
    path.join(process.cwd(), CONTENT_DIRECTORY, params.slug.join("/")) + ".mdx",
    "utf8",
  );

  // Use the Next.js component mappings
  const components = useMDXComponents();

  const { content, frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
    components,
  });

  // Ensure the returned object conforms to the Doc type
  return {
    ...frontmatter,
    content,
    slug: params.slug.join("/"),
    slugAsParams: params.slug.join("/"),
    type: 'Doc',
    published: frontmatter.published || false,
    featured: frontmatter.featured || false,
    component: frontmatter.component || false,
    toc: frontmatter.toc || false,
    body: content // Assuming body is equivalent to content here
  }
}

export default async function DocPage({ params }: DocPageProps) {

  const { body } = await getDocFromParams({ params })

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div>
            {body}
          </div>
        </div>
      </div>
    </main>
  )
}
