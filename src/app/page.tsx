import { getAllComponents } from "@/lib/api"
import { LandingHero } from "@/components/landing/landing-hero"

export default async function Home() {
  try {
    const allComps = await getAllComponents(true)

    if (!allComps) {
      throw new Error("Failed to fetch components")
    }

    return <LandingHero allComps={allComps} />
  } catch (error) {
    console.error("Error fetching components:", error)
    // You might want to return an error state here
    return <div>Error loading components</div>
  }
}
