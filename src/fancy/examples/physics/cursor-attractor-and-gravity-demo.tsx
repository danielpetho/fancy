import Gravity, {
  MatterBody,
} from "@/fancy/components/physics/cursor-attractor-and-gravity"

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-col relative font-azeretMono">
      <div className="pt-20 z-20 text-6xl sm:text-7xl md:text-8xl text-black w-full text-center font-calendas italic">
        fancy
      </div>
      <Gravity
        attractorPoint={{ x: "25%", y: "50%" }}
        attractorStrength={0.0006}
        cursorStrength={-0.005}
        cursorFieldRadius={200}
        className="w-full h-full"
      >
        {[...Array(80)].map((_, i) => {
          const size = Math.max(20, Math.random() * 60)
          return (
            <MatterBody
              key={i}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x={`${Math.random() * 100}%`}
              y={`${Math.random() * 30}%`}
            >
              <img
                src={`https://i.pravatar.cc/${Math.floor(size)}?img=${i}`}
                alt={`Avatar ${i}`}
                className="rounded-full object-cover hover:cursor-pointer"
                style={{
                  width: `${size}px`,
                  height: `${size}px`
                }}
              />
            </MatterBody>
          )
        })}
      </Gravity>
    </div>
  )
}
