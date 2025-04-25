import { useRef } from "react"
import { useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import useScreenSize from "@/hooks/use-screen-size"
import CSSBox, { CSSBoxRef } from "@/fancy/components/blocks/css-box"

const BoxFace = ({
  imageUrl,
  className,
}: {
  imageUrl: string
  className?: string
}) => (
  <div className={cn("w-full h-full relative", className)}>
    <img src={imageUrl} alt="" className="w-full h-full object-cover" />
    <div
      className="absolute inset-0"
      style={{
        maskImage: "linear-gradient(to top, white 20%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, white 20%, transparent 100%)",
        backgroundColor: "rgba(255,255,255,0.4)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="absolute bottom-0 w-full flex flex-col items-start justify-end pb-3">
        <div className="flex w-full justify-between px-2 items-end">
          <div className="text-[8px] font-black pb-1">JUN14</div>
          <div className="text-3xl md:text-5xl font-black px-2">
            New Arrivals
          </div>
          <div className="text-lg md:text-xl font-medium">SS25</div>
        </div>
      </div>
    </div>
  </div>
)

export default function CSSBoxScrollDemo() {
  const boxRef = useRef<CSSBoxRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const screenSize = useScreenSize()

  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  // Transform scroll progress (0-1) to rotation (0-360)
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360])

  // Update box rotation when scroll transform changes
  rotation.on("change", (latest) => {
    boxRef.current?.rotateTo(0, latest)
  })

  const imageUrl =
    "https://cdn.cosmos.so/276cdd4e-8a7a-4c32-955f-83c5900a0926?format=jpeg"

  const boxWidth = screenSize.lessThan("md") ? 220 : 300
  const boxHeight = screenSize.lessThan("md") ? 300 : 400
  const boxDepth = screenSize.lessThan("md") ? 220 : 300

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-y-auto bg-[#fefefe] flex"
    >
      <div className="h-[400%] flex w-full items-start justify-center absolute">
        <div className="sticky py-28 md:py-16 top-0 left-0 px-6 md:px-12">
          <CSSBox
            ref={boxRef}
            width={boxWidth}
            height={boxHeight}
            depth={boxDepth}
            perspective={2000}
            draggable={false}
            faces={{
              front: <BoxFace imageUrl={imageUrl} />,
              back: <BoxFace imageUrl={imageUrl} />,
              left: <BoxFace imageUrl={imageUrl} />,
              right: <BoxFace imageUrl={imageUrl} />,
            }}
          />
        </div>
      </div>
    </div>
  )
}
