import Gravity, {
  MatterBody,
} from "@/fancy/components/physics/cursor-attractor-and-gravity"

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-col relative font-azeretMono justify-center items-end">
      <div>
        <p className="z-20 text-3xl sm:text-4xl md:text-5xl text-black  font-calendas italic">
          community
        </p>
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
                src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                alt={`Avatar ${i}`}
                className="rounded-full object-cover hover:cursor-pointer"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              />
            </MatterBody>
          )
        })}
      </Gravity>
    </div>
  )
}
