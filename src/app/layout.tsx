import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Fancy Components",
  description: "Ready to use, fancy and fun components to make the web fun again. Free & Open Source.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-overusedGrotesk min-h-screen bg-background antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
