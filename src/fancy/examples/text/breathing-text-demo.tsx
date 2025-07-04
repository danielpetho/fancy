import BreathingText from "@/fancy/components/text/breathing-text"

export default function Preview() {
  return (
    <div className="w-full h-full text-3xl sm:text-4xl md:text-5xl flex flex-row gap-12 items-center justify-center font-overused-grotesk bg-white">
      <div className="flex flex-col items-center justify-center text-black">
        <BreathingText
          staggerDuration={0.08}
          fromFontVariationSettings="'wght' 100, 'slnt' 0"
          toFontVariationSettings="'wght' 800, 'slnt' -10"
        >
          overused grotesk
        </BreathingText>
      </div>
    </div>
  )
}
