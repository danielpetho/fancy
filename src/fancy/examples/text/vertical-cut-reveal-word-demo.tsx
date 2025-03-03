import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal"

export default function Preview() {
  return (
    <div className="w-full h-full text-lg md:text-2xl flex flex-col items-start justify-center font-calendas p-10 md:p-16 lg:p-24 bg-primary-blue text-white tracking-wide font-bold">
      <div className="flex flex-col justify-center w-full items-center space-y-4">
        <VerticalCutReveal
          splitBy="words"
          staggerDuration={0.1}
          staggerFrom="first"
          reverse={true}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 30,
            delay: 0,
          }}
        >
          {`super cool & awesome example text`}
        </VerticalCutReveal>
      </div>
    </div>
  )
}
