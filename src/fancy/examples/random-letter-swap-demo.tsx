import { RandomLetterSwapForward } from "@/fancy/components/text/random-letter-swap-forward-anim";
import { RandomLetterSwapPingPong } from "../components/text/random-letter-swap-pingpong-anim";

export default function Preview() {
  return (
    <div className="w-full h-full rounded-lg bg-yellow-400 text-7xl flex flex-col items-center justify-center">
        <div className="h-full text-red-500 rounded-xl py-12  align-text-center  gap-y-2 flex flex-col">
            <RandomLetterSwapForward label="Right here!" reverse={true} className=""/>
            <RandomLetterSwapForward label="Right now!" reverse={false} className="font-bold italic px-4"/>
            <RandomLetterSwapPingPong label="Right here!" className=""/>
            <RandomLetterSwapPingPong label="Right now!" reverse={false} className=" font-bold"  />
        </div>
    </div>
  )
}