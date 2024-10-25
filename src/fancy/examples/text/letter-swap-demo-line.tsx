import { LetterSwapForward } from "@/fancy/components/text/letter-swap-forward-anim";
import { LetterSwapPingPong } from "@/fancy/components/text/letter-swap-pingpong-anim";

export default function Preview() {
  return (
    <div className="w-full h-full text-3xl flex flex-row gap-12 items-center justify-center font-calendas">
      <div className="flex flex-col items-center justify-center gap-y-8">
        <LetterSwapForward label="oh, wow!" staggerDuration={0} />
        <LetterSwapForward label="nice!" staggerDuration={0} reverse={false} />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <LetterSwapPingPong label="nice!" staggerDuration={0} reverse={false} />
        <LetterSwapPingPong label="oh, wow!" staggerDuration={0} />
      </div>
    </div>
  );
}
