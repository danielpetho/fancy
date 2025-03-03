import LetterSwapForward from "@/fancy/components/text/letter-swap-forward-anim"

export default function Preview() {
  return (
    <div className="w-full h-full text-3xl flex flex-row gap-12 items-center justify-center font-calendas bg-primary-blue">
      <div className="items-center justify-center grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12  text-white">
        <LetterSwapForward label="oh, wow!" staggerDuration={0} />
        <LetterSwapForward label="nice!" staggerDuration={0} reverse={false} />
      </div>
    </div>
  )
}
