import LetterSwapForward from "@/fancy/components/text/letter-swap-forward-anim"

export default function Preview() {
  return (
    <div className="w-full h-full text-3xl flex md:flex-row flex-col items-center justify-center font-calendas gap-x-12 gap-y-4 text-primaryBlue">
      <LetterSwapForward label="First" staggerFrom={"first"} />
      <LetterSwapForward label="Center" staggerFrom={"center"} className="" />
      <LetterSwapForward label="Last" staggerFrom={"last"} />
    </div>
  )
}
