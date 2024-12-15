import { DocsPager } from "@/components/doc-pager";
import { DashboardTableOfContents } from "@/components/toc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CONTENT_DIRECTORY, getDocFromParams } from "@/lib/get-docs";
import { siteConfig } from "@/config/site";
import { absoluteUrl, cn } from "@/lib/utils";
import { DocPageProps } from "@/types/types";
import { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Balancer from "react-wrap-balancer";
import { getComponent } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  const urlSlug = doc.slug.split('/').pop();
  const ogUrl = urlSlug ? `/api/og?slug=${urlSlug}` : siteConfig.ogImage;

  return {
    title: doc.title,
    description: doc.description === "null" ? siteConfig.description : doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description === "null" ? siteConfig.description : doc.description,
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
  };
}

export async function generateStaticParams() {
  const targets = fs.readdirSync(path.join(process.cwd(), CONTENT_DIRECTORY), {
    recursive: true,
  });

  const files = [];

  for (const target of targets) {
    if (
      fs
        .lstatSync(
          path.join(process.cwd(), CONTENT_DIRECTORY, target.toString())
        )
        .isDirectory()
    ) {
      continue;
    }

    files.push(target);
  }

  const slugs = files.map((file) => 
    file.toString().replace(".mdx", "").split("/").pop()
  );

  await Promise.all(
    slugs.map(async (slug) => {
      if (slug) {
        try {
          await getComponent(slug, false);
        } catch (e) {
          console.log(`Failed to pre-fetch OG data for ${slug}:`, e);
        }
      }
    })
  );

  return files.map((file) => ({
    slug: file.toString().replace(".mdx", "").split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  const toc = doc.toc;

  return (
    <main className="xl:grid xl:grid-cols-[1fr_300px] w-full justify-center">
      <div className="rounded-xl bg-background py-6 lg:gap-10 lg:py-6 border-border border shadow-lg">
        <div className="container">
          <div className="mb-2 pb-2 flex items-center space-x-1 text-lg text-muted-foreground">
            <div className="overflow-hidden font-medium  whitespace-nowrap">
              Docs
            </div>
            <span className="font-serif">&#8594;</span>
            <div className="font-medium text-foreground">{doc.title}</div>
          </div>
          <div className="space-y-2">
            <h1
              className={cn(
                "scroll-m-20 text-5xl font-calendas tracking-tight"
              )}
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
      </div>
      {doc.toc && (
        <div className="hidden text-base xl:block sticky top-4 pt-0 pb-4 h-[calc(100vh-6rem)] pl-4">
          <div className=" bg-background rounded-xl shadow-lg border">
            <ScrollArea className="pb-10 p-6">
              <DashboardTableOfContents toc={toc} />
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  );
}
