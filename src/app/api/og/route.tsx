import { getComponent } from "@/lib/api";
import { fetchExternalImage } from "next/dist/server/image-optimizer";
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const slug = searchParams.get("slug");
    if (!slug) {
      return new Response(`No slug provided`, {
        status: 400,
      });
    }

    const font = await fetch(
      new URL('./Calendas.woff', import.meta.url)
    ).then((res) => res.arrayBuffer())

    const component = await getComponent(slug!, false);

    const componentName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const imageUrl = component?.thumbnail?.url;
    console.log(imageUrl);
    if (!imageUrl) {
      return new Response(`No image provided`, {
        status: 400,
      });
    }

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#fefefe',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px',
          }}
        >
          {/* Image Container */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              paddingBottom: '40px',
              width: '100%',
              height: '100%',
            }}
          >
            <img
              src={imageUrl}
              alt={componentName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* Component Name */}
          <div
            style={{
              fontSize: 40,
              fontFamily: 'Calendas',
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: '#333',
              padding: '30px 40px 0 0',
              textAlign: 'left',
              lineHeight: 1.4,
            }}
          >
            {componentName}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Calendas',
            data: font,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
