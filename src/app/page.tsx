import { LandingHero } from "@/components/landing/landing-hero";
import { getAllComponents } from "@/lib/api";

export default async function Home({params}: any) {
  const allComps = await getAllComponents(true);

  return (
    <main className="flex h-full flex-col items-center justify-center w-full">
      <LandingHero allComps={allComps} />
    </main>
  );
}
