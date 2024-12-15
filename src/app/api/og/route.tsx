import { getComponent } from "@/lib/api";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // If no slug provided, return default OG image
    if (!slug) {
      return Response.redirect(siteConfig.ogImage);
    }

    const component = await getComponent(slug!, false);

    const componentName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const imageUrl = component?.thumbnail?.url;
    
    // If no component image found, return default OG image
    if (!imageUrl) {
      return Response.redirect(siteConfig.ogImage);
    }

    // Rest of the existing code for generating dynamic OG image...
    return new ImageResponse(
      (
        <img
          src={imageUrl}
          alt={componentName}
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
    // Return default OG image on any error
    return Response.redirect(siteConfig.ogImage);
  }
}
