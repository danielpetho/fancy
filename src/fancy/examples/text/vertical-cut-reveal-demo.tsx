import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal"

export default function Preview() {
  return (
    <div className="w-full h-full xs:text-2xl bg-white text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl flex flex-col items-start justify-center font-overused-grotesk p-10 md:p-16 lg:p-24 text-primary-blue tracking-wide uppercase">
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="first"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
        }}
      >
        {`HI 👋, FRIEND!`}
      </VerticalCutReveal>
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="last"
        reverse={true}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
          delay: 0.5,
        }}
      >
        {`🌤️ IT IS NICE ⇗ TO`}
      </VerticalCutReveal>
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="center"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
          delay: 1.1,
        }}
      >
        {`MEET 😊 YOU.`}
      </VerticalCutReveal>
    </div>
  )
}
