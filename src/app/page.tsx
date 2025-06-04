import { getAllComponents } from "@/lib/get-components"
import { LandingHero } from "@/components/landing/landing-hero"

export default function Home() {
  const allComps = getAllComponents()

  return <LandingHero allComps={allComps} />
}
