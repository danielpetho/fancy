"use client";

import Link from "next/link";
import { HeroImages } from "./hero-images";
import TextRotate from "@/fancy/components/text/text-rotate";
import { LayoutGroup, motion } from "framer-motion";
import { Component } from "@/types/types";

export function LandingHero({
  allComps,
}: {
  allComps: Component[];
}) {

  return (
    <section className="w-full h-screen overflow-hidden flex flex-col items-center justify-center relative">
      <HeroImages allComps={allComps} />
      <div className=" flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-4"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span>Make your </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                website{" "}
              </motion.span>

              <TextRotate
                words={[
                  "fancy",
                  "fun",
                  "lovely ♥",
                  "weird",
                  "🪩 funky",
                  "💃🕺",
                  "sexy",
                  "🕶️ cool",
                  "go 🚀",
                  "🔥🔥🔥",
                  "over-animated?",
                  "✨ pop ✨",
                  "rock 🤘",
                ]}
                className="overflow-hidden pr-3 text-yellow-500 py-0 pb-2 md:pb-4 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          with a growing library of ready-to-use react components &
          microinteractions. free & open source.
        </motion.p>
        {/* <motion.p
          className="text-2xl text-center font-overusedGrotesk pt-4"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
        >
          Free & Open Source.
        </motion.p> */}

        <motion.button
          className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-white bg-black px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas mt-10 sm:mt-16 md:mt-20 lg:mt-20"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.2, 
            ease: "easeOut", 
            delay: 0.7,
            scale: {
              duration: 0.2,
            }
          }}
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", damping: 30, stiffness: 400 }
          }}
        >
          <Link href="/docs/introduction">
            Check docs <span className="font-serif ml-1">→</span>
          </Link>
        </motion.button>
      </div>
    </section>
  );
}
