import BreathingText from "@/fancy/components/text/breathing-text";

export default function Preview() {
  return (
    <div className="w-full h-full text-5xl sm:text-7xl md:text-9xl flex flex-row gap-12 items-center justify-center font-overusedGrotesk bg-[#1f464d]">
      <div className="flex flex-col items-center justify-center text-white">
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
