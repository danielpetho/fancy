import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer"
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import { siteConfig } from "@/config/site";

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-overusedGrotesk min-h-screen bg-stone-200 antialiased`}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
