import PixelTrail from "@/fancy/components/background/pixel-trail";
import useScreenSize from "@/hooks/use-screen-size";

const PixelTrailDemo: React.FC = () => {
  const screenSize = useScreenSize();

  return (
    <div className="w-full h-full bg-black text-white flex flex-col font-azeretMono">
      <div className="absolute inset-0 z-0">
        <PixelTrail pixelSize={screenSize.lessThan(`md`) ? 16 : 24} fadeDuration={500} pixelClassName="bg-white" />
      </div>

      <div className="justify-center items-center flex flex-col w-full h-full">
        <h2 className="font-VT323 text-3xl sm:text-4xl md:text-6xl uppercase">FANCYCOMPONENTS.DEV</h2>
        <p className="pt-0.5 sm:pt-2 text-xs sm:text-base md:text-xl">Make the web fun again.</p>
      </div>
    </div>
  );
};

export default PixelTrailDemo;
