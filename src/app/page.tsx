import { LandingHero } from "@/components/landing/landing-hero";
import { getAllComponents } from "@/lib/api";

export default async function Home() {
  // Add error handling
  try {
    const allComps = await getAllComponents(true);
    
    if (!allComps) {
      throw new Error('Failed to fetch components');
    }

    return (
      <main className="flex h-[calc(100vh-6rem)] flex-col items-center justify-center w-full">
        <LandingHero allComps={allComps} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching components:', error);
    // You might want to return an error state here
    return <div>Error loading components</div>;
  }
}