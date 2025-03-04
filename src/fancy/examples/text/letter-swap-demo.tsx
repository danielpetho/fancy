import LetterSwapForward from "@/fancy/components/text/letter-swap-forward-anim"
import LetterSwapPingPong from "@/fancy/components/text/letter-swap-pingpong-anim"

export default function Preview() {
  return (
    <div className="w-full h-full rounded-lg bg-white text-xl md:text-3xl  flex flex-col items-center justify-center font-calendas">
      <div className=" p-12 text-primary-blue rounded-xl align-text-top  gap-y-1 md:gap-y-2 flex flex-col">
        <LetterSwapForward
          label="Hover me chief!"
          reverse={true}
          className="italic"
        />
        <LetterSwapForward
          label="{awesome}"
          reverse={false}
          className="font-bold"
        />
        <LetterSwapForward
          label="Good day!"
          staggerFrom={"center"}
          className="mono"
        />
        <LetterSwapPingPong
          label="More text?"
          staggerFrom={"center"}
          reverse={false}
          className="font-overused-grotesk font-bold"
        />
        <LetterSwapPingPong label="oh, seriously?!" staggerFrom={"last"} />
      </div>
    </div>
  )
}
