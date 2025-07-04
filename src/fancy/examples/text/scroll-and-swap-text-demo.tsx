"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

import ScrollAndSwapText from "@/fancy/components/text/scroll-and-swap-text"

// Generate an array of imaginary names
const names = [
  "Alexandra Rodriguez",
  "Benjamin Chen",
  "Catherine Williams",
  "David Martinez",
  "Elena Petrov",
  "Francesco Rossi",
  "Gabriela Santos",
  "Henrik Larsson",
  "Isabella Thompson",
  "James Anderson",
  "Katarina Novak",
  "Leonardo Silva",
  "Maria Gonzalez",
  "Nikolai Volkov",
  "Olivia Johnson",
  "Pablo Hernandez",
  "Qiana Washington",
  "Ricardo Lopez",
  "Sophia Kim",
  "Thomas Mueller",
  "Ursula Schmidt",
  "Viktor Petersen",
  "Wen Li",
  "Xavier Dubois",
  "Yasmin Hassan",
  "Zachary Brown",
  "Amelia Davis",
  "Bruno Costa",
  "Clara Johansson",
  "Diego Morales",
  "Evelyn Taylor",
  "Felix Wagner",
  "Grace Wilson",
  "Hugo Andersen",
  "Iris Nakamura",
  "Julian Beck",
  "Kira Popovic",
  "Lucas Garcia",
  "Maya Patel",
  "Nathan Clark",
  "Ophelia Martin",
  "Pietro Romano",
  "Quinn O'Brien",
  "Rosa Fernandez",
  "Sebastian Lee",
  "Tara Mitchell",
  "Ulrich Weber",
  "Valentina Rosso",
  "William Jones",
  "Xiomara Reyes",
  "Yuki Tanaka",
  "Zara Ahmed",
  "Andre Leclerc",
  "Beatrice Hall",
  "Carlos Mendoza",
  "Delphine Moreau",
  "Emilio Bianchi",
  "Fiona Murphy",
  "Giovanni Conti",
  "Helena Svensson",
  "Ivan Dimitrov",
  "Jasmine Green",
  "Kai Nielsen",
  "Luna Torres",
  "Marco Esposito",
  "Nadia Kozlov",
  "Oscar Lindberg",
  "Penelope White",
  "Quincy Adams",
  "Rafael Vargas",
  "Stella Jackson",
  "Theo Van Der Berg",
  "Uma Sharma",
  "Vincenzo Ferrari",
  "Willow Parker",
  "Ximena Castillo",
  "Yolanda King",
  "Zander Cooper",
  "Aria Blackwood",
  "Bastien Dubois",
  "Camille Laurent",
  "Dante Ricci",
  "Estelle Moreau",
  "Fabio Santos",
  "Gemma Wright",
  "Hector Vega",
  "Ingrid Hansen",
  "Javier Ruiz",
  "Kaia Storm",
  "Liam O'Connor",
  "Mila Petrov",
  "Noah Fischer",
  "Octavia Bell",
  "Phoenix Rivera",
  "Quentin Gray",
  "Ruby Anderson",
  "Sage Thompson",
  "Tobias Klein",
  "Unity Cross",
  "Vera Kozlova",
  "Wade Turner",
  "Xara Moon",
  "York Sterling",
  "Zoe Martinez",
  "Atlas Kane",
  "Brielle Fox",
  "Caspian Reed",
  "Dara Singh",
  "Eden Blake",
  "Falcon Knight",
  "Gaia Stone",
  "Harbor Wells",
  "Indigo Vale",
  "Juno Pierce",
  "Knox Rivers",
]

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      autoRaf: true,
      wrapper: containerRef.current,
      duration: 3,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div
      className="w-full h-full rounded-lg items-center justify-start font-overused-grotesk p-4 overflow-auto overscroll-auto bg-blue-500 text-white relative"
      ref={containerRef}
    >
      <div className="min-h-[200vh] flex justify-center items-start pt-96 uppercase relative">
        <p className="absolute top-4 left-4 font-bold text-xl">
          SCROLL SLOWLY
        </p>
        <div className="flex md:text-4xl sm:text-2xl text-3xl lg:text-4xl xl:text-5xl justify-center items-center flex-col leading-none -space-y-0">
          {names.map((name, index) => (
            <ScrollAndSwapText
              key={index}
              offset={[`0 0.2`, `0 0.8`]}
              className="font-bold leading-tighter"
              containerRef={containerRef}
            >
              {name}
            </ScrollAndSwapText>
          ))}
        </div>
      </div>
    </div>
  )
}
