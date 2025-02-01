import { useRef } from "react"
import PixelateSvgFilter from "@/fancy/components/filter/pixelate-svg-filter"
import { useMousePosition } from "@/hooks/use-mouse-position"

export default function PixelateSVGFilterDemo() {
    const containerRef = useRef<HTMLDivElement>(null)
    const mousePosition = useMousePosition(containerRef)
    const pixelSize = Math.min(Math.max(mousePosition.x / 30, 1), 64)

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-4 bg-black" ref={containerRef}>
      <PixelateSvgFilter id="pixelate-filter" size={pixelSize} crossLayers />
      <div 
        id="image-container"
        className="w-1/2 md:w-1/3 h-1/2 overflow-hidden relative text-white"
        style={{ filter: "url(#pixelate-filter)" }}
      >
        <video
          src={"https://cdn.cosmos.so/96ae0b34-289d-489d-94a1-c68925ddd3a9.mp4"}
          className="w-full h-full object-cover absolute inset-0"
          autoPlay
          muted
          playsInline
          loop
          //style={{ filter: "url(#pixelate-filter)" }}

        />
      </div>
      
    </div>
  )
}
