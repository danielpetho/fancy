import useScreenSize from "@/hooks/use-screen-size"
import Gravity, {
  MatterBody,
} from "@/fancy/components/physics/cursor-attractor-and-gravity"

export default function Preview() {
  const screenSize = useScreenSize()

  const getImageCount = () => {
    if (screenSize.lessThan("sm")) return 50
    if (screenSize.lessThan("md")) return 60
    if (screenSize.lessThan("lg")) return 70
    return 80
  }

  const getMaxSize = () => {
    if (screenSize.lessThan("sm")) return 40
    if (screenSize.lessThan("md")) return 50
    return 60
  }

  const getMinSize = () => {
    if (screenSize.lessThan("sm")) return 10
    if (screenSize.lessThan("md")) return 20
    return 20
  }

  return (
    <div className="w-full h-full flex flex-col relative justify-center items-center md:items-end bg-white">
      <div>
        <p className="z-20 text-2xl sm:text-3xl md:text-3xl text-foreground dark:text-muted md:pr-24">
          join the <span className="font-calendas  italic">community</span>
        </p>
      </div>
      <Gravity
        attractorPoint={{ x: "33%", y: "50%" }}
        attractorStrength={0.0005}
        cursorStrength={-0.004}
        cursorFieldRadius={screenSize.lessThan("sm") ? 100 : 200}
        className="w-full h-full"
      >
        {[...Array(getImageCount())].map((_, i) => {
          const size = Math.max(getMinSize(), Math.random() * getMaxSize())
          return (
            <MatterBody
              key={i}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x={`${Math.random() * 100}%`}
              y={`${Math.random() * 30}%`}
            >
              <img
                src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i}.jpg`}
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
