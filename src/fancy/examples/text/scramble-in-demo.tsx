import { useEffect, useRef } from "react"

import ScrambleIn, {
  ScrambleInHandle,
} from "@/fancy/components/text/scramble-in"

export default function Preview() {
  const titles = [
    "1. One More Time (featuring Romanthony) - 5:20",
    "2. Aerodynamic - 3:27",
    "3. Digital Love - 4:58",
    "4. Harder, Better, Faster, Stronger - 3:45",
    "5. Crescendolls - 3:31",
    "6. Nightvision - 1:44",
    "7. Superheroes - 3:57",
    "8. High Life - 3:22",
    "9. Something About Us - 3:51",
    "10. Voyager - 3:47",
    "11. Veridis Quo - 5:44",
    "12. Short Circuit - 3:26",
    "13. Face to Face (featuring Todd Edwards) - 3:58",
    "14. Too Long (featuring Romanthony) - 10:00",
  ]

  const scrambleRefs = useRef<(ScrambleInHandle | null)[]>([])

  useEffect(() => {
    titles.forEach((_, index) => {
      const delay = index * 50
      setTimeout(() => {
        scrambleRefs.current[index]?.start()
      }, delay)
    })
  }, [])

  return (
    <div className="w-full h-full flex flex-col text-sm md:text-lg lg:text-lg xl:text-xl justify-start items-start bg-white text-foreground dark:text-muted font-normal overflow-hidden py-16 px-8 sm:px-16 md:px-20 lg:px-24 text-center">
      {titles.map((model, index) => (
        <ScrambleIn
          key={index}
          ref={(el) => {
            scrambleRefs.current[index] = el
          }}
          text={model}
          scrambleSpeed={25}
          scrambledLetterCount={5}
          autoStart={false}
        />
      ))}
    </div>
  )
}
