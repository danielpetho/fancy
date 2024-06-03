import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Fancy Components",
  description: "Ready to use, fancy and obscure components for creative developers. Free & Open Source.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-overused`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
