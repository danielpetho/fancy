"use client"

import { exampleImages } from "@/utils/demo-images"

import TextRotate from "@/fancy/components/text/text-rotate"

export default function Preview() {
  return (
    <div className="w-full h-full text-base sm:text-xl md:text-2xl flex flex-row items-center justify-center font-overused-grotesk bg-white font-light overflow-hidden p-6 uppercase relative text-primary-red">
      <div className="absolute inset-0 w-full h-full blur-3xl">
        <img
          src={exampleImages[0].url}
          alt="city"
          className="w-full h-full object-cover overflow-hidden"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className=" grid grid-cols-2 gap-y-12 gap-x-8 w-full text-red font-bold">
          <TextRotate
            texts={["New York", "Los Angeles", "Chicago", "Miami"]}
            mainClassName="justify-center"
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
            texts={["São Paulo", "Rio de Janeiro", "Salvador", "Brasília"]}
            mainClassName="justify-center"
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
            texts={["Tokyo", "Osaka", "Kyoto", "Sapporo"]}
            mainClassName="justify-center"
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
            texts={["Mumbai", "Delhi", "Bangalore", "Chennai"]}
            mainClassName="justify-center"
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
