import Gravity, {
  MatterBody,
} from "@/fancy/components/physics/cursor-attractor-and-gravity"

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-col relative justify-center items-end">
      <div>
        <p className="z-20 text-2xl sm:text-3xl md:text-3xl text-black pr-24">
          join the <span className="font-calendas  italic">community</span>
        </p>
      </div>
      <Gravity
        attractorPoint={{ x: "33%", y: "50%" }}
        attractorStrength={0.0005}
        cursorStrength={-0.004}
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
                src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i}.jpg`}
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
