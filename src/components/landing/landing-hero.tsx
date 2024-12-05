"use client";

import Link from "next/link";
import { HeroImages } from "./hero-images";
import TextRotate from "@/fancy/components/text/text-rotate";
import { LayoutGroup, motion } from "framer-motion";
import { init } from "next/dist/compiled/webpack/webpack";
import { getAllComponents } from "@/lib/api";
import { useEffect } from "react";

export function LandingHero({
  allComps,
}: any) {

  useEffect(() => {
    console.log(allComps);
  }, [allComps]);

  return (
    <section className="w-full h-[calc(100vh-6rem)] max-h-[1280px] flex flex-col items-center justify-center relative">
      <HeroImages />
      <div className=" flex flex-col justify-center items-center w-[700px]">
        <motion.h1
          className="text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight "
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0 }}
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
                  "💃🕺",
                  "weird",
                  "🪩 funky",
                  "lovely ♥",
                  "awesome",
                  "🕶️ cool",
                  "look 🔥🔥🔥",
                  "over-animated?",
                  "go 🚀",
                  "✨ pop ✨",
                  "rock 🤘",
                ]}
                className=" overflow-hidden pr-3 text-yellow-500 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-2xl text-center font-overusedGrotesk pt-12"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
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
          className="text-xl font-semibold tracking-tight text-white bg-black px-8 py-3 rounded-full z-20 shadow-2xl font-calendas mt-20"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.2, 
            ease: "easeOut", 
            delay: 0.2,
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
