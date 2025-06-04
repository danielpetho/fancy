import { getAllComponents } from "@/lib/get-components"
import { LandingHero } from "@/components/landing/landing-hero"

export default function Home() {
  try {
    const allComps = getAllComponents()

    return <LandingHero allComps={allComps} />
  } catch (error) {
    console.error("Error fetching components:", error)
    // You might want to return an error state here
    return <LandingHero allComps={null} />
  }
}
