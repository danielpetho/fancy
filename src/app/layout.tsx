import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Fancy Components",
  description: "Ready to use, fancy and obscure components for creative developers. Free & Open Source.",
};


const cotham = localFont({
  src: [
    {
      path: '../../public/fonts/CothamSans.otf',
      weight: '400'
    }
  ],
  variable: '--font-cotham'
})

const overusedGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/OverusedGrotesk-VF.woff2',
    }
  ],
  variable: '--font-overusedGrotesk'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${overusedGrotesk.variable} ${cotham.variable} min-h-screen bg-background antialiased`}>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
