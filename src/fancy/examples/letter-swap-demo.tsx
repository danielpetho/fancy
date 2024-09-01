import { LetterSwapForward } from "@/fancy/components/text/letter-swap-forward-anim";

export default function Preview() {
  return (
    <div className="w-full h-full rounded-lg bg-[#121212] text-3xl  flex flex-col items-center justify-center font-calendas">
        <div className="bg-yellow-200 p-12 text-blue-800 rounded-xl cale-y-[120%] align-text-top  gap-y-2 flex flex-col">
        <LetterSwapForward label="Hover me chief!" reverse={true} className="italic"/>
        <LetterSwapForward label="{awesome}" reverse={false} className="font-bold"/>
        <LetterSwapForward label="Good day!" staggerFrom={"center"} className="mono"/>
        <LetterSwapForward label="More text?" staggerFrom={"center"} reverse={false} className="font-overusedGrotesk font-bold"  />
        <LetterSwapForward label="oh, seriously?!" staggerFrom={"last"} />
        </div>
    </div>
  )
}