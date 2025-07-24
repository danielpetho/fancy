import fs from "node:fs"
import path from "node:path"
import { Metadata } from "next"
import Balancer from "react-wrap-balancer"

import { DocPageProps } from "@/types/types"
import { siteConfig } from "@/config/site"
import { getComponentByName } from "@/lib/get-components"
import { CONTENT_DIRECTORY, getDocFromParams } from "@/lib/get-docs"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CopyPageMenu } from "@/components/copy-page-menu"
import { DocAuthor } from "@/components/doc-author"
import { DocBreadcrumb } from "@/components/doc-breadcrumb"
import { DocsPager } from "@/components/doc-pager"
import { DashboardTableOfContents } from "@/components/toc"

export const runtime = "nodejs"
export const dynamic = "force-static"

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  const urlSlug = doc.slug.split("/").pop()

  let ogUrl

  try {
    const component = getComponentByName(urlSlug!)
    ogUrl = component?.thumbnail?.url || siteConfig.ogImage
  } catch (error) {
    console.error("Error fetching component:", error)
    ogUrl = siteConfig.ogImage
  }

  return {
    title: doc.title,
    description:
      doc.description === "null" ? siteConfig.description : doc.description,
    openGraph: {
      title: doc.title,
      description:
        doc.description === "null" ? siteConfig.description : doc.description,
      type: "article",
      url: doc.slug,
      images: [
        {
          url: ogUrl,
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
      images: [ogUrl],
      creator: "@nonzeroexitcode",
    },
  }
}

export function generateStaticParams() {
  const targets = fs.readdirSync(path.join(process.cwd(), CONTENT_DIRECTORY), {
    // Read nested directories and files
    recursive: true,
  })

  const files = []

  for (const target of targets) {
    // Skip directories
    if (
      fs
        .lstatSync(
          path.join(process.cwd(), CONTENT_DIRECTORY, target.toString())
        )
        .isDirectory()
    ) {
      continue
    }

    // Add files as valid paths
    files.push(target)
  }

  // Return the list of files we want to match with, removing the `.mdx` suffix and breaking them up by directory.
  return files.map((file) => ({
    slug: file.toString().replace(".mdx", "").split("/"),
  }))
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params })

  const toc = doc.toc

  const componentType =
    params.slug?.[1]?.charAt(0).toUpperCase() +
      params.slug?.[1]?.slice(1).toLowerCase() || "Getting Started"

  // Generate current URL for markdown links
  const currentUrl = `https://fancycomponents.dev/docs/${params.slug?.join("/") || ""}`

  // Extract plain text content from the page (simplified version)
  // For now, using description. Could be enhanced to extract more content client-side
  const plainTextContent = doc.description || "No description available"

  return (
    <main className="xl:grid xl:grid-cols-[minmax(0,1fr)_340px] justify-center w-full">
      <div className="rounded-2xl bg-background py-6 lg:gap-10 lg:py-6 border-border border">
        <div data-algolia-crawl className="px-4 md:px-8 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <DocBreadcrumb componentType={componentType} title={doc.title} />
            <div className="flex-shrink-0">
              <CopyPageMenu
                title={doc.title}
                content={plainTextContent}
                currentUrl={currentUrl}
              />
            </div>
          </div>
          <div className="">
            <h1
              className={cn(
                "scroll-m-20 text-3xl text-pretty md:text-5xl font-calendas tracking-tight"
              )}
            >
              {doc.title}
            </h1>
          </div>
          <div className="">
            {/* Description and author */}
            {!!doc.description && doc.description !== "null" && (
              <p className="text-sm md:text-lg text-muted-foreground pt-2 md:pt-4">
                <Balancer>{doc.description}</Balancer>
              </p>
            )}
            <DocAuthor author={doc.author} />
          </div>

          <div className="mb-12 pt-8 space-y-6">{doc.body}</div>
          <div data-algolia-ignore className="">
            <DocsPager doc={doc} />
          </div>
        </div>
      </div>
      {doc.toc && (
        <div className="hidden text-base xl:block sticky top-4 pt-0 pb-4 h-[calc(100vh-8rem)] pl-4 space-y-4">
          <div className="bg-background rounded-2xl border">
            <ScrollArea className="pb-10 p-6">
              <DashboardTableOfContents toc={toc} />
            </ScrollArea>
          </div>
          <div className="bg-background rounded-2xl border h-20 p-6 flex items-center justify-start">
            <a href="https://vercel.com/oss">
              <img
                alt="Vercel OSS Program"
                src="https://vercel.com/oss/program-badge.svg"
              />
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
