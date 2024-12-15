import { LandingHero } from "@/components/landing/landing-hero";
import { getAllComponents } from "@/lib/api";

export default async function Home() {
    
  const allComps = await getAllComponents(true);

  return (
    <main className="flex h-[calc(100vh-6rem)] flex-col items-center justify-center w-full">
      <LandingHero allComps={allComps} />
    </main>
  );
}
