import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
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
          <div className="text-5xl font-black px-2">New Arrivals</div>
          <div className="text-xl font-medium">SS25</div>
        </div>
      </div>
    </div>
  </div>
)

export default function CSSBoxScrollDemo() {
  const boxRef = useRef<CSSBoxRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !boxRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 1
      const rotation = progress * 360

      boxRef.current.rotateTo(0, rotation)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const imageUrl =
    "https://cdn.cosmos.so/276cdd4e-8a7a-4c32-955f-83c5900a0926?format=jpeg"

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-y-auto bg-[#fefefe] flex"
    >
      <div className="h-[400%] flex w-full items-start justify-center absolute">
        <div className="sticky py-16 top-0 left-0  px-12">
          <CSSBox
            ref={boxRef}
            width={300}
            height={400}
            depth={300}
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
