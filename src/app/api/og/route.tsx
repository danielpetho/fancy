import { getComponent } from "@/lib/api";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Make it static
export const runtime = 'edge';
export const dynamic = 'force-static';

// Use generateImageMetadata instead of GET
export async function generateImageMetadata() {
  return [
    {
      contentType: 'image/png',
      size: { width: 1200, height: 630 },
      id: 'default',
    },
  ];
}

export async function GET(request: Request) {
  try {
    // Get slug from pathname instead of searchParams
    const pathname = new URL(request.url).pathname;
    const slug = pathname.split('/').pop();

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