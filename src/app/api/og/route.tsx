import { getComponent } from "@/lib/api";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Add segment config for build-time generation
export const runtime = 'edge';
export const revalidate = false;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // If no slug provided, return default OG image
    if (!slug) {
      return Response.redirect(siteConfig.ogImage);
    }

    const component = await getComponent(slug!, false);
    
    // If no component found, return default OG image
    if (!component?.thumbnail?.url) {
      return Response.redirect(siteConfig.ogImage);
    }

    // Generate OG image
    return new ImageResponse(
      (
        <img
          src={component.thumbnail.url}
          alt={slug}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return Response.redirect(siteConfig.ogImage);
  }
}
