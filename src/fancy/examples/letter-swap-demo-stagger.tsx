import { LetterSwapForward } from "@/fancy/components/text/letter-swap-forward-anim";

export default function Preview() {
  return (
    <div className="w-full h-full  min-h-[420px] text-2xl flex flex-row items-center justify-center font-calendas gap-x-12">
      <LetterSwapForward label="First" staggerFrom={"first"} />
      <LetterSwapForward label="Center" staggerFrom={"center"} className="" />
      <LetterSwapForward label="Last" staggerFrom={"last"} />
    </div>
  );
}
