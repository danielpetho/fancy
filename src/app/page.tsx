import { LandingHero } from "@/components/landing/landing-hero";
import { getAllComponents } from "@/lib/api";
import { use, useEffect } from "react";

export async function generateStaticParams() {
  const allComps = await getAllComponents(false);

  console.log(allComps);

  return allComps.map((comp) => ({
    slug: comp.slug,
  }));
}

export default async function Home() {
  const allComps = await getAllComponents(false);

  return (
    <main className="flex h-full flex-col items-center justify-center w-full ">
      <LandingHero allComps={allComps} />
    </main>
  );
}
