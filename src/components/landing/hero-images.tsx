"use client";

import Floating, { FloatingElement } from "@/fancy/components/image/floating";
import { exampleImages } from "@/fancy/examples/_helpers/exampleImages";
import { motion } from "framer-motion";

export function HeroImages() {
  return (
    <Floating sensitivity={-1} className="w-full h-full ">
      <FloatingElement depth={0.5} className="top-[8%] left-[11%] ">
        <motion.img
          src={exampleImages[0]}
          className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
        />
      </FloatingElement>
      <FloatingElement depth={4} className="top-[80%] left-[2%]">
        <motion.img
          src={exampleImages[1]}
          className="w-20 h-20 md:w-56 md:h-56 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
        />
      </FloatingElement>
      <FloatingElement depth={2} className="top-[2%] left-[83%]">
        <motion.img
          src={exampleImages[2]}
          className="w-28 h-40 md:w-56 md:h-64 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
        />
      </FloatingElement>
    </Floating>
  );
}
