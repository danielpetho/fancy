import ScrambleHover from "@/fancy/components/text/scramble-hover"

export default function Preview() {
  return (
    <div className="w-full h-full flex text-4xl justify-center items-center bg-white text-foreground dark:text-muted  font-normal overflow-hidden p-24 space-y-2">
      <ScrambleHover
        text={"special symbols"}
        scrambleSpeed={50}
        maxIterations={8}
        useOriginalCharsOnly={false}
        className="cursor-pointer text-4xl"
        characters="čüỳĦØ↋⒬¢⏧⏛⏄⎄*¿"
        scrambledClassName="font-notoSansSymbols text-3xl cursor-pointer"
      />
    </div>
  )
}
