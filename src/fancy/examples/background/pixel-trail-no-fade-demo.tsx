import Image from "next/image"

import PixelTrail from "@/fancy/components/background/pixel-trail"

const PixelTrailDemo: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="water surface"
        fill
        className="absolute inset-0 z-0 contrast-[70%]"
      />
      <div className="absolute inset-0 z-1">
        <PixelTrail
          pixelSize={20}
          delay={130}
          fadeDuration={0}
          pixelClassName="bg-[#f1ff76]"
        />
      </div>

      <ul className="flex w-full items-center font-bold space-x-6 px-6 py-4 text-[#f1ff76] z-10 justify-between text-2xl md:text-4xl">
        <a>WATER SUPPLY CO.</a>
        <a
          href=""
          className="hover:underline cursor-pointer  font-bold uppercase text-[#f1ff76]"
        >
          Menu
        </a>
      </ul>
      <div className="z-0 text-[#f1ff76] text-6xl mt-12 mx-6">
        <div className="flex flex-row items-center">
          <h2 className="font-tiny5 text-6xl md:text-9xl uppercase">100%</h2>
          <h2 className="text-5xl md:text-8xl ml-4 md:ml-8">purity</h2>
        </div>
        <p className="mt-3 text-base md:text-3xl">
          {
            "we deliver more than just hydration — we offer nature's purest refreshment, untouched by modern contaminants. Our water is sourced from deep, protected aquifers and naturally filtered through ancient rock layers, with unmatched clarity and taste."
          }
        </p>
      </div>
    </div>
  )
}

export default PixelTrailDemo
