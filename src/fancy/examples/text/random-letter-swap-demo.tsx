import RandomLetterSwapForward from "@/fancy/components/text/random-letter-swap-forward-anim"
import RandomLetterSwapPingPong from "@/fancy/components/text/random-letter-swap-pingpong-anim"

export default function Preview() {
  return (
    <div className="w-full h-full rounded-lg bg-white text-3xl md:text-5xl flex flex-col items-center justify-center font-overused-grotesk">
      <div className="h-full text-red-500 rounded-xl py-12  align-text-center gap-y-1 md:gap-y-2 flex flex-col justify-center items-center">
        <RandomLetterSwapForward
          label="Right here!"
          reverse={true}
          className=""
        />
        <RandomLetterSwapForward
          label="Right now!"
          reverse={false}
          className="font-bold italic px-4"
        />
        <RandomLetterSwapPingPong label="Right here!" className="" />
        <RandomLetterSwapPingPong
          label="Right now!"
          reverse={false}
          className=" font-bold"
        />
      </div>
    </div>
  )
}
