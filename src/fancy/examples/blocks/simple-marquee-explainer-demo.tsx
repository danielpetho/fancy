import { useState } from "react"

import { Button } from "@/components/ui/button"
import SimpleMarquee from "@/fancy/components/blocks/simple-marquee"

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

      <div className="m-8 border border-borderp-4 flex justify-center items-center w-96 h-56 " >
        <SimpleMarquee baseVelocity={30} repeat={repeat} direction="left">
            <div className="bg-primary-blue text-white p-8 mx-4">Item 1</div>
            <div className="bg-primary-orange text-white p-8 mx-4">Item 2</div>
         </SimpleMarquee>
      </div>
    </div>
  )
}
