import ScrambleHover from "@/fancy/components/text/scramble-hover"

export default function Preview() {
  return (
    <div className="w-full h-full text-sm sm:text-xl md:text-2xl justify-center items-center font-normal text-light overflow-hidden p-12 sm:p-20 flex flex-col md:p-24 space-y-20 bg-black text-white">
      <div className="text-left w-full">
        <ScrambleHover
          text={"from the start"}
          scrambleSpeed={40}
          sequential={true}
          revealDirection="start"
          useOriginalCharsOnly={false}
          className="font-azeret-mono"
          characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
        />
      </div>
      <div className="text-center w-full">
        <ScrambleHover
          text={"from the center"}
          scrambleSpeed={40}
          sequential={true}
          revealDirection="center"
          useOriginalCharsOnly={false}
          className="font-azeret-mono"
          characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
        />
      </div>
      <div className="text-right w-full">
        <ScrambleHover
          text={"from the end"}
          scrambleSpeed={40}
          sequential={true}
          revealDirection="end"
          useOriginalCharsOnly={false}
          className="font-azeret-mono"
          characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
        />
      </div>
    </div>
  )
}
