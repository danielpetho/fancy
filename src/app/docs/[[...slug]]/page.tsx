import { DocsPager } from "@/components/doc-pager";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, cn } from "@/lib/utils";
import { useMDXComponents } from "@/mdx-components";
import { Doc } from "@/types/types";
import { ChevronRightIcon } from "lucide-react";
import { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs";
import path from "node:path";
import Balancer from "react-wrap-balancer";

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
      creator: "@nonzeroexitcode",
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

/* export async function getDocFromParams({ params }: DocPageProps): Promise<Doc> {
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

  return {
    slug: params.slug.join("/"),
    slugAsParams: params.slug.join("/"),
    _id: params.slug.join("/"),
    type: 'Doc',
    title: String(frontmatter.title),
    description: String(frontmatter.description),
    published: Boolean(frontmatter.published),
    featured: Boolean(frontmatter.featured),
    component: Boolean(frontmatter.component),
    toc: Boolean(frontmatter.toc),
    body: content
  }
} */

export default async function DocPage({ params }: DocPageProps) {

  //const doc = await getDocFromParams({ params })

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
       {/*  <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="font-medium text-foreground">{doc.title}</div>
        </div> */}
        {/* <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>

        <div className="pb-12 pt-8">
          {doc.body}
        </div>
        <div>
          <DocsPager doc={doc} />
        </div> */}
      </div>
    </main>
  )
}
