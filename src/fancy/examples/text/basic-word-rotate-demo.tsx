import BasicWordRotate from "@/fancy/components/text/basic-word-rotate";
import { motion } from "framer-motion";

export default function Preview() {
  return (
    <div className="w-full h-full text-5xl flex flex-row items-center justify-center font-overusedGrotesk bg-background font-light overflow-hidden p-24">
      <motion.p
        className="flex flex-row items-center justify-center whitespace-pre w-96 h-full"
        layout
      >
        You are{" "}
        <motion.div
          layout
          className="bg-red-500 justify-center items-center flex px-4 py-2 w-full rounded-full"
        >
          <BasicWordRotate
            words={["beautiful", "fabolous", "amazing", "fancy"]}
            className="italic font-calendas font-light "
          />
        </motion.div>
      </motion.p>
    </div>
  );
}
