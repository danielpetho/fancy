import Image from "next/image"

import { cn } from "@/lib/utils"
import AnimatedPathText from "@/fancy/components/text/text-along-path"

export default function Preview() {
  const circlePath =
    "M 100 100 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"

  return (
    <div className="w-full h-full flex justify-center items-center relative text-white bg-black">
      <div className="w-full h-full absolute inset-0 brightness-[50%] saturate-0 overflow-hidden"> 
        <img
          src="https://cdn.cosmos.so/328b7b8f-498b-45ff-ae6b-19a69bb2b701?format=jpeg"
          alt="eye"
          className="w-full h-full object-cover"
        />
      </div>
      {[0, 90, 180, 270].map((rotation, i) => (
        <AnimatedPathText
          key={rotation}
          path={circlePath}
          pathId={`circle-path-${i}`}
          svgClassName={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full scale-50",
            {
              "rotate-0": rotation === 0,
              "rotate-90": rotation === 90,
              "rotate-180": rotation === 180,
              "-rotate-90": rotation === 270,
            }
          )}
          viewBox="0 0 200 200"
          text="loading"
          textClassName="text-[11px] font-bold"
          side="outside"
          duration={2.5}
          textAnchor="start"
        />
      ))}
    </div>
  )
}
