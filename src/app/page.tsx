import { getAllComponents } from "@/lib/api"
import { LandingHero } from "@/components/landing/landing-hero"

export default async function Home() {
  try {
    const allComps = await getAllComponents(true)

    return <LandingHero allComps={allComps} />
  } catch (error) {
    console.error("Error fetching components:", error)
    // You might want to return an error state here
    return <LandingHero allComps={null} />
  }
}
