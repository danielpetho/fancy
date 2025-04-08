import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import "./globals.css"

import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "React",
    "Typescript",
    "Tailwind CSS",
    "Microinteractions",
    "Motion",
    "Creative developers",
  ],
  authors: [
    {
      name: "Daniel Petho",
      url: "https://danielpetho.com",
    },
  ],
  creator: "danielpetho",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
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
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@nonzeroexitcode",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"/> */}
      </head>
      <body
        className={`font-overused-grotesk bg-background antialiased flex items-center justify-center w-full text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-full w-full max-w-(--breakpoint-2xl) flex flex-col items-center justify-center">
            {children}
            <Analytics />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
