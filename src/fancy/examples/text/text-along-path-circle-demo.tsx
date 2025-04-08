import { cn } from "@/lib/utils"
import AnimatedPathText from "@/fancy/components/text/text-along-path"

export default function Preview() {
  const circlePath =
    "M 100 100 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"

  return (
    <div className="w-full h-full flex justify-center items-center relative ">
      {[0, 90, 180, 270].map((rotation, i) => (
        <AnimatedPathText
          key={rotation}
          path={circlePath}
          pathId={`circle-path-${i}`}
          svgClassName={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full ",
            {
              "rotate-0": rotation === 0,
              "rotate-90": rotation === 90,
              "rotate-180": rotation === 180,
              "-rotate-90": rotation === 270,
            }
          )}
          easingFunction={{
            calcMode: "spline",
            keyTimes: "0;1",
            keySplines: "0.762 0.002 0.253 0.999",
          }}
          viewBox="0 0 200 200"
          text="loading"
          textClassName="text-[15px]"
          duration={2.5}
          textAnchor="start"
        />
      ))}
    </div>
  )
}
