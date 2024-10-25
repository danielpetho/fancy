import { BreathingText } from "@/fancy/components/text/breathing-text";

export default function Preview() {
  return (
    <div className="w-full h-full text-9xl flex flex-row gap-12 items-center justify-center font-overusedGrotesk bg-[#faf5f5]">
      <div className="flex flex-col items-center justify-center">
        <BreathingText
          label="Breathe!"
          staggerDuration={0.1}
          fromFontVariationSettings="'wght' 100, 'slnt' 0"
          toFontVariationSettings="'wght' 800, 'slnt' -10"
        />
      </div>
    </div>
  );
}
