import ScrambleHover from "@/fancy/components/text/scramble-hover"

export default function Preview() {
  return (
    <div className="w-full h-full  text-xl sm:text-3xl md:text-5xl bg-white text-foreground dark:text-muted font-normal overflow-hidden p-12 sm:p-20 flex flex-col md:p-24 space-y-2 space-x-6">
      <ScrambleHover
        text={"original characters"}
        scrambleSpeed={50}
        maxIterations={8}
        useOriginalCharsOnly={true}
        className="cursor-pointer"
      />
      <ScrambleHover
        text={"new characters"}
        scrambleSpeed={50}
        maxIterations={8}
        useOriginalCharsOnly={false}
        className="cursor-pointer"
        characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
      />
    </div>
  )
}
