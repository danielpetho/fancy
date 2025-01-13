import Gravity, {
  MatterBody,
} from "@/fancy/components/physics/cursor-attractor-and-gravity"

const set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,.!?-/'\":;{}[]()@#$%^&*()_+<>$¢£¤¥֏฿₠₡₢₣₤₥₦₧₨₩₪₫€₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿"

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-col relative font-overusedGrotesk justify-center items-center">
      
      <Gravity
        attractorPoint={{ x: "50%", y: "50%" }}
        attractorStrength={0.000}
        cursorStrength={0.0004}
        cursorFieldRadius={400}
        className="w-full h-full z-[2] absolute"
      >
        {set.split("").map((l, i) => {
          const size = Math.max(34, Math.random() * 38)
          return (
            <MatterBody
              key={i}
              className="-z-10"
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x={`${Math.random() * 100}%`}
              y={`${Math.random() * 30}%`}
            >
              <div
                className="rounded-full flex items-center justify-center bg-transparent hover:cursor-pointer"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  fontSize: `${size}px`
                }}
              >
                {l}
              </div>
            </MatterBody>
          )
        })}
      </Gravity>
        <p className="text-3xl z-10 sm:text-4xl md:text-5xl bg-black text-white px-2 py-1">
          Overused Grotesk
        </p>
    </div>
  )
}
