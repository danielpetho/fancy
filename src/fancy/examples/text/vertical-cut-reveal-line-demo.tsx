import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal"

export default function Preview() {
  return (
    <div className="w-full h-full text md:text-2xl lg:text-4xl flex flex-col items-start justify-center font-azeret-mono bg-white p-6 md:p-16 lg:p-20 xl:p-24 text-primary-blue tracking-wide ">
      <div className="flex flex-col justify-center w-full items-start space-y-4">
        <VerticalCutReveal
          splitBy="lines"
          staggerDuration={0.2}
          staggerFrom="first"
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 30,
            delay: 0.2,
          }}
          containerClassName="text-[#00000] leading-relaxed"
        >
          {"→ We're on a mission\nto make the 🌐 web \nsuper fun again! ☺"}
        </VerticalCutReveal>
      </div>
    </div>
  )
}
