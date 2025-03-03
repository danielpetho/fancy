import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal"

export default function Preview() {
  return (
    <div className="w-full h-full text md:text-xl flex items-center justify-center font-overused-grotesk bg-white p-10 md:p-16 lg:p-24 text-primary-blue">
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.002}
        staggerFrom="random"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 35,
          delay: 0.1,
        }}
        containerClassName="text-[#00000] leading-snug"
      >
        {`“When a small, unassuming object exceeds our expectations, we are not only surprised but pleased. Our usual reaction is something like, "That little thing did all that?" Simplicity is about the unexpected pleasure derived from what is likely to be insignificant and would otherwise go unnoticed. The smaller the object, the more forgiving we can be when it misbehaves.”
        ― John Maeda,`}
      </VerticalCutReveal>
    </div>
  )
}
