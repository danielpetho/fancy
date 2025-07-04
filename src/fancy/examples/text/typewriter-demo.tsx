import Typewriter from "@/fancy/components/text/typewriter"

export default function Preview() {
  return (
    <div className="w-full h-full md:text-3xl lg:text-4xl sm:text-2xl text-xl flex flex-row items-start justify-start bg-white text-foreground dark:text-muted font-normal overflow-hidden p-16 pt-48">
      <p className="whitespace-pre-wrap">
        <span>{"We're born 🌞 to "}</span>
        <Typewriter
          text={[
            "experience",
            "dance",
            "love",
            "be alive",
            "create things that make the world a better place",
          ]}
          speed={70}
          className="text-yellow-500 text-pretty"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={"_"}
        />
      </p>
    </div>
  )
}
