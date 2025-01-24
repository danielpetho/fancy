import PixelTrail from "@/fancy/components/background/pixel-trail"
import GooeyFilter from "@/fancy/components/filter/gooey-filter"
import useScreenSize from "@/hooks/use-screen-size"

export default function GooeyDemo() {
    const screenSize = useScreenSize()

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center gap-8 bg-black"
    >
      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />
      <div className="absolute inset-0 z-0" style={{ filter: "url(#gooey-filter-pixel-trail)" }}>
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white"
        />
      </div>

      <div className="flex" style={{ filter: "url(#gooey-filter-pixel-trail)" }}>
        <div className="w-8 h-8 bg-white" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1" />
      </div>

      {/* Text elements */}
      <div className="relative" style={{ filter: "url(#gooey-filter-pixel-trail)" }}>
        <div className="bg-white text-black px-4 py-2 rounded-sm text-lg font-medium">
          
        </div>
        <div className="bg-white text-black px-4 py-2 rounded-sm text-lg font-medium ml-8">
         
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="flex" style={{ filter: "url(#gooey-filter-pixel-trail)" }}>
        <div className="w-8 h-8 bg-white" />
        <div className="w-8 h-8 bg-white -ml-1 mt-8" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1 mt-8" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1" />
        <div className="w-8 h-8 bg-white -ml-1" />
      </div>
    </div>
  )
}
