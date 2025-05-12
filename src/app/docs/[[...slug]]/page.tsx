import fs from "node:fs"
import path from "node:path"
import { Metadata } from "next"
import Balancer from "react-wrap-balancer"

import { DocPageProps } from "@/types/types"
import { siteConfig } from "@/config/site"
import { getComponent } from "@/lib/api"
import { CONTENT_DIRECTORY, getDocFromParams } from "@/lib/get-docs"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
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
    const component = await getComponent(urlSlug!, false)
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

  return (
    <main className="xl:grid xl:grid-cols-[minmax(0,1fr)_300px] justify-center w-full">
      <div className="rounded-xl bg-background py-6 lg:gap-10 lg:py-6 border-border border shadow-lg">
        <div data-algolia-crawl className="container max-w-full px-4 md:px-8">
          <div className="mb-2 pb-2 flex items-center space-x-1 text-base md:text-lg text-muted-foreground">
            <div className="overflow-hidden font-medium  whitespace-nowrap">
              Docs
            </div>
            <span className="font-serif">&#8594;</span>
            <div
              data-algolia-level-0
              className="font-medium text-muted-foreground"
            >
              {componentType}
            </div>
            <span className="font-serif">&#8594;</span>

            <div className="font-medium text-foreground">{doc.title}</div>
          </div>
          <div className="space-y-2">
            <h1
              className={cn(
                "scroll-m-20 text-3xl text-pretty md:text-5xl font-calendas tracking-tight"
              )}
            >
              {doc.title}
            </h1>
            {!!doc.description && doc.description !== "null" && (
              <p className="text-lg text-muted-foreground">
                <Balancer>{doc.description}</Balancer>
              </p>
            )}
            {doc.author &&
              doc.author.length > 0 &&
              doc.author !== "undefined" && (
                <>
                  <p className="pl-2 pt-1 text font-medium text-foreground flex flex-row gap-x-3">
                    by{" "}
                    {doc.author.match(/\[([^\]]+)\]\(([^)]+)\)/g)
                      ? doc.author.split(",").map((author, i) => {
                          const match = author.match(/\[([^\]]+)\]\(([^)]+)\)/)
                          if (match) {
                            return (
                              <span key={i}>
                                {i > 0 && " "}
                                <a href={match[2]} className="underline">
                                  {match[1]}
                                </a>
                              </span>
                            )
                          }
                          return (
                            <span key={i}>
                              {i > 0 && " "}
                              {author.trim()}
                            </span>
                          )
                        })
                      : doc.author.match(/(.*?)\s*<(https?:\/\/[^>]+)>/g)
                        ? doc.author.split(",").map((author, i) => {
                            const match = author.match(
                              /(.*?)\s*<(https?:\/\/[^>]+)>/
                            )
                            if (match) {
                              return (
                                <span key={i}>
                                  {i > 0 && " "}
                                  <a href={match[2]} className="underline">
                                    {match[1].trim()}
                                  </a>
                                </span>
                              )
                            }
                            return (
                              <span key={i}>
                                {i > 0 && " "}
                                {author.trim()}
                              </span>
                            )
                          })
                        : doc.author}
                  </p>
                </>
              )}
          </div>

          <div className="pb-12 pt-8 overflow-x-hidden">{doc.body}</div>
          <div data-algolia-ignore>
            <DocsPager doc={doc} />
          </div>
        </div>
      </div>
      {doc.toc && (
        <div className="hidden text-base xl:block sticky top-4 pt-0 pb-4 h-[calc(100vh-6rem)] pl-4">
          <div className="bg-background rounded-xl shadow-lg border">
            <ScrollArea className="pb-10 p-6">
              <DashboardTableOfContents toc={toc} />
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  )
}
