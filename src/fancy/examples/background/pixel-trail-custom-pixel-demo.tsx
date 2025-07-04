import useScreenSize from "@/hooks/use-screen-size"
import PixelTrail from "@/fancy/components/background/pixel-trail"

const PixelTrailDemo: React.FC = () => {
  const screenSize = useScreenSize()

  return (
    <div className="relative w-full h-full bg-white text-black flex flex-col font-calendas">
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 14 : 20}
          fadeDuration={0}
          delay={600}
          pixelClassName="rounded-full bg-"
        />
      </div>

      <div className="justify-center items-center flex flex-col w-full h-full z-10 pointer-events-none space-y-2 md:space-y-4">
        <h2 className="text-xl cursor-pointer sm:text-3xl md:text-5xl tracking-tight">
          fancy ✽ components{" "}
        </h2>
        <p className="text-xs md:text-lg font-overused-grotesk">
          with react, motion, and typrscript.
        </p>
      </div>
    </div>
  )
}

export default PixelTrailDemo
