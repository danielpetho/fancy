import { LandingHero } from "@/components/landing/landing-hero";
import { getAllComponents } from "@/lib/api";
import { redirect } from 'next/navigation'

export default async function Home() {
  
  redirect('/docs/introduction');
  
  const allComps = await getAllComponents(true);

  return (
    <main className="flex h-full flex-col items-center justify-center w-full">
      <LandingHero allComps={allComps} />
    </main>
  );
}
