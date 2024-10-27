import ElasticLine from "@/fancy/components/svg/elastic-line";
import { motion } from "framer-motion";
import Image from "next/image";
import { exampleImages } from "../exampleImages";

export default function Preview() {
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  return (
    <div className="w-full h-full flex flex-row items-center justify-center font-overusedGrotesk bg-[#eeeeee] overflow-hidden">
      <div className="flex absolute left-0 top-0 flex-col w-full h-full px-12 py-8 z-10">
        {/* Animated elastic lines */}
        <ElasticLine
          releaseThreshold={50}
          strokeWidth={1}
          animateInTransition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.15,
          }}
        />
        <ElasticLine
          releaseThreshold={50}
          strokeWidth={1}
          animateInTransition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.45,
          }}
        />
      </div>

      {/* This is just fluff for the demo */}
      <div className="h-full flex flex-col text-4xl py-3 w-full px-12 font-light">
        <div className="h-1/3 items-center  flex justify-start">
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            ACME.INC — A PLAYFUL DESIGN PARTNER
          </motion.p>
        </div>
        <div className="h-1/3 flex items-center flex-col  py-2">
          <motion.div
            className="w-full h-full relative overflow-hidden"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Image
              src={exampleImages[1]}
              alt="image"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
        <div className="h-1/3 flex items-center justify-end">
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            FOR SERIOUS COMPANIES
          </motion.p>
        </div>
      </div>
    </div>
  );
}
