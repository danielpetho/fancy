import { PixelTrail } from "@/fancy/components/background/pixel-trail";

const PixelTrailDemo: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#efefef] flex flex-col">
      <div className="absolute inset-0 z-0">
        <PixelTrail pixelColor="#000" pixelSize={12} fadeDuration={500} />
      </div>

      <ul className="flex w-full justify-end items-end text-sm space-x-6 px-6 py-4 z-10">
        <a href="" className="hover:underline cursor-pointer">
          what we do
        </a>
        <a href="" className="hover:underline cursor-pointer">
          portfolio
        </a>
        <a href="" className="hover:underline cursor-pointer">
          about us
        </a>
      </ul>
      <div className="mx-24 my-24">
        <h1 className="font-VT323 text-9xl uppercase">ACME.INC</h1>
        <div />
        <div />
        <h2 className="font-overusedGrotesk text-2xl font-thin justify-end items-end mt-12">
          Investing in early-stage startups to build the next generation of
          AI-powered products.
        </h2>
      </div>
    </div>
  );
};

export default PixelTrailDemo;
