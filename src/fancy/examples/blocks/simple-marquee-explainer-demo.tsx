import { useState } from "react"

import { Button } from "@/components/ui/button"
import SimpleMarquee from "@/fancy/components/blocks/simple-marquee"

const MarqueeItem = ({ index }: { index: number }) => (
  <div className="bg-zinc-950 text-white w-24 h-24 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-4 sm:mx-6 md:mx-8 relative rounded-xl shadow  shadow-white">
    <span className="absolute top-2 left-3 sm:left-3 md:left-4 text-base sm:text-lg md:text-lg">
      ITEM {index.toString().padStart(2, "0")}
    </span>
    <span className="absolute bottom-2 left-3 sm:left-3 md:left-4 text-sm sm:text-base md:text-base opacity-70">
      fancy
    </span>
  </div>
)

export default function SimpleMarqueeExplainerDemo() {
  const [repeat, setRepeat] = useState(1)

  return (
    <div className="w-full h-full relative flex justify-center items-center bg-black">
      <Button
        variant={"outline"}
        size={"sm"}
        className="absolute top-4 left-4 h-8"
        onClick={() => setRepeat((prev) => (prev < 5 ? prev + 1 : 1))}
      >
        Repeat: {repeat}
      </Button>

      <div className="sm:m-6 md:m-8 border border-border p-4 flex justify-center items-center w-[200px] sm:w-[450px] md:w-[600px] h-[200px] sm:h-[300px] md:h-[400px]">
        <SimpleMarquee baseVelocity={30} repeat={repeat} direction="left">
          <MarqueeItem index={1} />
          <MarqueeItem index={2} />
        </SimpleMarquee>
      </div>
    </div>
  )
}
