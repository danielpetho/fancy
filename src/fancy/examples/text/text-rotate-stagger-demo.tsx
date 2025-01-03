import { LayoutGroup, motion } from "motion/react"

import TextRotate from "@/fancy/components/text/text-rotate"

import { exampleImages } from "../_helpers/exampleImages"

export default function Preview() {
  return (
    <div className="w-full h-full text-2xl flex flex-row items-center justify-center font-overusedGrotesk bg-background font-light overflow-hidden p-6 uppercase relative">
      <div className="absolute inset-0 w-full h-full blur-3xl">
        <img
          src={exampleImages[0].url}
          alt="city"
          className="w-full h-full object-cover overflow-hidden"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className=" grid grid-cols-2 gap-y-12 gap-x-8 w-full text-[#ff5941] font-bold">
          <TextRotate
            texts={["New York", "Los Angeles", "Chicago", "Miami"]}
            mainClassName="py-2 justify-center rounded-lg "
            staggerFrom="first"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.04}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />

          <TextRotate
            texts={["Tokyo", "Osaka", "Kyoto", "Sapporo"]}
            mainClassName="py-2 justify-center rounded-lg "
            staggerFrom="center"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.04}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />

          <TextRotate
            texts={["Mumbai", "Delhi", "Bangalore", "Chennai"]}
            mainClassName="py-2 justify-center rounded-lg "
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.04}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />

          <TextRotate
            texts={["São Paulo", "Rio de Janeiro", "Salvador", "Brasília"]}
            mainClassName="py-2 justify-center rounded-lg"
            staggerFrom="random"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.04}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </div>
      </div>
    </div>
  )
}
