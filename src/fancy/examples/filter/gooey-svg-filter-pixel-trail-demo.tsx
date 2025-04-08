import useDetectBrowser from "@/hooks/use-detect-browser"
import useScreenSize from "@/hooks/use-screen-size"
import PixelTrail from "@/fancy/components/background/pixel-trail"
import GooeySvgFilter from "@/fancy/components/filter/gooey-svg-filter"

export default function GooeyDemo() {
  const screenSize = useScreenSize()
  const browserName = useDetectBrowser()
  const isSafari = browserName === "Safari"

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 bg-black text-center text-pretty">
      <img
        src="https://images.aiscribbles.com/34fe5695dbc942628e3cad9744e8ae13.png?v=60d084"
        alt="impressionist painting"
        className="w-full h-full object-cover absolute inset-0 opacity-70"
      />

      <GooeySvgFilter id="gooey-filter-pixel-trail" strength={5} />

      <div
        className="absolute inset-0 z-0"
        style={{ filter: isSafari ? "none" : "url(#gooey-filter-pixel-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white"
        />
      </div>

      <p className="text-white text-4xl sm:text-5xl md:text-7xl z-10 font-calendas w-1/2 font-bold">
        Speaking things into existence
        <span className="font-overused-grotesk"></span>
      </p>
    </div>
  )
}
