import { DocsPager } from "@/components/doc-pager";
import { DashboardTableOfContents } from "@/components/toc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CONTENT_DIRECTORY, getDocFromParams } from "@/lib/get-docs";
import { siteConfig } from "@/lib/site";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl, cn } from "@/lib/utils";
import { DocPageProps } from "@/types/types";
import { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Balancer from "react-wrap-balancer";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
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
  };
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
          path.join(process.cwd(), CONTENT_DIRECTORY, target.toString())
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

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });


  const toc = await getTableOfContents(doc.body)

  console.log(doc)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="w-full min-w-0">
        <div className="mb-2 pb-2 flex items-center space-x-1 text-lg text-muted-foreground ">
          <div className="overflow-hidden font-medium  whitespace-nowrap">
            Docs
          </div>
          <span className="font-serif">&#8594;</span>
          <div className="font-medium text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1
            className={cn("scroll-m-20 text-5xl font-calendas tracking-tight")}
          >
            {doc.title}
          </h1>
          {!!doc.description && doc.description !== "null" && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>

        <div className="pb-12 pt-8">{doc.body}</div>
        <div>
          <DocsPager doc={doc} />
        </div>
      </div>
      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  );
}
