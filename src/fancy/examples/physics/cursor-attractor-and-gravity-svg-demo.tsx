import { useState } from "react"

import Gravity, {
  MatterBody,
} from "@/fancy/components/physics/cursor-attractor-and-gravity"

export default function Preview() {
  const [debug, setDebug] = useState(false)

  return (
    <div className="w-full h-full flex flex-col relative justify-center items-center bg-white">
      <button
        onClick={() => setDebug(!debug)}
        className="absolute top-4 left-4 px-4 py-2 text-xs border border-border rounded-lg bg-background hover:bg-accent cursor-pointer z-10"
      >
        {debug ? "Disable Debug" : "Enable Debug"}
      </button>
      <p className="z-20 text-2xl sm:text-3xl md:text-3xl text-black">
        fancy components
      </p>
      <Gravity
        //attractorPoint={{ x: "33%", y: "50%" }}
        attractorStrength={0.0}
        cursorStrength={0.0005}
        cursorFieldRadius={200}
        className="w-full h-full"
        debug={debug}
      >
        {["#0015FF", "#E794DA"].map((color, i) => (
          <>
            <MatterBody
              key={`star1-${i}`}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x={`${10 + Math.random() * 80}%`}
              y={`${10 + Math.random() * 80}%`}
              bodyType="svg"
            >
              <svg
                width="111"
                height="108"
                viewBox="0 0 111 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9185 107.176L33.6145 66.472L0.5905 44.328H41.0385L55.5025 0.679993L70.2225 44.328L110.415 44.328L77.3905 66.472L91.3425 107.176L55.5025 81.192L19.9185 107.176Z"
                  fill={color}
                />
              </svg>
            </MatterBody>

            <MatterBody
              key={`star2-${i}`}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x={`${10 + Math.random() * 80}%`}
              y={`${10 + Math.random() * 80}%`}
              bodyType="svg"
            >
              <svg
                width="152"
                height="153"
                viewBox="0 0 152 153"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M45.3648 152.4L41.7648 150.8L52.5648 100L1.76484 110.8L0.164844 107.2L41.7648 76.4L0.164844 46L1.76484 42.4L52.5648 52.8L41.7648 2.39999L45.3648 0.799989L76.1648 42.4L106.565 0.799989L110.165 2.39999L99.7648 52.8L150.165 42.4L151.765 46L110.165 76.4L151.765 107.2L150.165 110.8L99.7648 100L110.165 150.8L106.565 152.4L76.1648 110.8L45.3648 152.4Z"
                  fill={color}
                />
              </svg>
            </MatterBody>

            <MatterBody
              key={`star3-${i}`}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x={`${10 + Math.random() * 80}%`}
              y={`${10 + Math.random() * 80}%`}
              angle={10}
              bodyType="svg"
            >
              <svg
                width="99"
                height="99"
                viewBox="0 0 99 99"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M46.9325 98.376C45.0125 87.368 37.2045 73.544 22.3565 62.408C15.0605 56.904 7.6365 53.32 0.3405 51.784V46.408C14.8045 42.952 29.0125 33.224 38.1005 20.04C42.7085 13.384 45.6525 6.856 46.9325 0.0719986H52.3085C54.4845 13 64.4685 27.336 78.0365 36.936C84.6925 41.672 91.6045 44.872 98.6445 46.408V51.784C84.4365 54.728 67.9245 67.4 59.7325 80.328C55.6365 86.856 53.2045 92.872 52.3085 98.376H46.9325Z"
                  fill={color}
                />
              </svg>
            </MatterBody>
          </>
        ))}
      </Gravity>
    </div>
  )
}
