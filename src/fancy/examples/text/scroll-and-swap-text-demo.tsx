import { ScrollAndSwapText } from "@/fancy/components/text/scroll-and-swap-text";
import { useRef } from "react";

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="w-full h-full rounded-lg items-center justify-center font-overusedGrotesk p-2 overflow-auto overscroll-auto bg-background relative"
      ref={containerRef}
      data-lenis-prevent
    >
      <div className="h-[100%] flex justify-center items-center uppercase">
        <div className="flex text-6xl justify-center items-center flex-col text-black">
          <ScrollAndSwapText
            label="Every day is a journey,"
            offset={["0 0.8", "0 1"]}
            className="font-bold "
            containerRef={containerRef}
          />
          <ScrollAndSwapText
            label="and the journey"
            offset={["0 0.9", "0 1.15"]}
            className="font-bold "
            containerRef={containerRef}
          />
          <ScrollAndSwapText
            label=" itself is home."
            offset={["0 1", "0 1.25"]}
            className="font-bold"
            containerRef={containerRef}
          />
        </div>
      </div>
      <p className="absolute bottom-4 left-4 font-bold text-xl">SCROLL SLOWLY</p>
      <div className="h-[30%]"></div>
    </div>
  );
}
