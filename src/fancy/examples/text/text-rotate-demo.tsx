import TextRotate from "@/fancy/components/text/text-rotate";
import { LayoutGroup, motion } from "framer-motion";

export default function Preview() {
  return (
    <div className="w-full h-full text-5xl flex flex-row items-center justify-center font-overusedGrotesk bg-background font-light overflow-hidden p-24">
      <LayoutGroup>
        <motion.p className="flex whitespace-pre" layout>
          <motion.span
            className="pt-1"
            layout
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            Make it{" "}
          </motion.span>
          <TextRotate
            words={["work!", "fancy ✽", "✨ pop ✨", "right", "fast 🚀", "fun ツ"]}
            className="text-white px-3 bg-[#0015ff] pt-1 overflow-hidden py-2 justify-center rounded-lg "
            staggerFrom={"last"}
            staggerDuration={0.025}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
          {/* <motion.span
            className="pt-1"
            layout
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            !
          </motion.span> */}
        </motion.p>
      </LayoutGroup>
    </div>
  );
}
