import { NextRequest, NextResponse } from "next/server"
import fs from "node:fs"
import path from "node:path"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } | undefined }
) {
  try {
    // Check if params and slug exist
    if (!params?.slug) {
      return new NextResponse("Not Found", { status: 404 })
    }
    
    // Check if the request is for a markdown file
    const lastSegment = params.slug[params.slug.length - 1]
    if (!lastSegment.endsWith(".md")) {
      return new NextResponse("Not Found", { status: 404 })
    }
    
    // Remove .md extension to get the actual slug
    const actualSlug = [...params.slug]
    actualSlug[actualSlug.length - 1] = lastSegment.replace(".md", "")
    
    // Construct path to pre-generated markdown file
    const markdownPath = path.join(
      process.cwd(), 
      "public", 
      "docs", 
      ...actualSlug
    ) + ".md"
    
    // Check if file exists
    if (!fs.existsSync(markdownPath)) {
      return new NextResponse("Documentation not found", { status: 404 })
    }
    
    // Read and serve the pre-generated markdown
    const markdown = fs.readFileSync(markdownPath, "utf8")
    
    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${actualSlug.join("-")}.md"`
      }
    })
    
  } catch (error) {
    console.error("Error serving markdown:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}