import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import CSSBox, { CSSBoxRef } from "@/fancy/components/blocks/css-box"

const BoxText = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "w-full h-full text-white flex items-center justify-center p-2 text-sm font-bold bg-transparent",
      className
    )}
  >
    ANYTHING IS POSSIBLE
  </div>
)

export default function CSSBox2Demo() {
  const boxRefs = useRef<(CSSBoxRef | null)[]>([])

  useEffect(() => {
    const animate = async () => {
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

      while (true) {
        // Rotate to right face
        for (let i = 0; i < boxRefs.current.length; i++) {
          boxRefs.current[i]?.showRight()
          await delay(50)
        }
        await delay(1000)

        // Rotate to back face
        for (let i = 0; i < boxRefs.current.length; i++) {
          boxRefs.current[i]?.showBack()
          await delay(50)
        }
        await delay(1000)

        // Rotate to left face
        for (let i = 0; i < boxRefs.current.length; i++) {
          boxRefs.current[i]?.showLeft()
          await delay(50)
        }
        await delay(1000)

        // Rotate to front face
        for (let i = 0; i < boxRefs.current.length; i++) {
          boxRefs.current[i]?.showFront()
          await delay(50)
        }
        await delay(1000)
      }
    }

    animate()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black">
      <div>
        {[...Array(12)].map((_, index) => (
          <CSSBox
            key={index}
            ref={(el) => {
              if (el) boxRefs.current[index] = el
            }}
            width={200}
            height={30}
            depth={200}
            draggable={false}
            className="hover:z-10"
            faces={{
              front: <BoxText className=" border-white " />,
              back: <BoxText className=" border-white" />,
              left: <BoxText className=" border-white bg-white text-black" />,
              right: <BoxText className=" border-white bg-white text-black" />,
            }}
          />
        ))}
      </div>
    </div>
  )
}
