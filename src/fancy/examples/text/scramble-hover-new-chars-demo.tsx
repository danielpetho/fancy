import ScrambleHover from "@/fancy/components/text/scramble-hover";

export default function Preview() {

  return (
    <div className="w-full h-full  text-5xl justify-center items-center bg-background font-normal overflow-hidden p-24 space-y-2">
      <ScrambleHover
        text={"original characters"}
        scrambleSpeed={50}
        maxIterations={8}
        useOriginalCharsOnly={true}
        className="cursor-pointer"
      />
      <ScrambleHover
        text={"new characters"}
        scrambleSpeed={50}
        maxIterations={8}
        useOriginalCharsOnly={false}
        className="cursor-pointer"
        characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
      />
    </div>
  );
}
