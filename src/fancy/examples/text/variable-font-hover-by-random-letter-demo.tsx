import VariableFontHoverByRandomLetter from "@/fancy/components/text/variable-font-hover-by-random-letter"

export default function Preview() {
  return (
    <div className="w-full h-full rounded-lg items-center justify-center font-overusedGrotesk p-24 bg-gradient-to-br text-[#3bb6ab] ">
      <div className="w-full h-full items-center justify-center flex">
        <VariableFontHoverByRandomLetter
          label="Let's Go!"
          staggerDuration={0.03}
          className="rounded-full items-center flex justify-center cursor-pointer px-8 py-5 align-text-top text-4xl sm:text-5xl md:text-7xl"
          fromFontVariationSettings="'wght' 400, 'slnt' 0"
          toFontVariationSettings="'wght' 900, 'slnt' 0"
        />
      </div>
    </div>
  )
}
