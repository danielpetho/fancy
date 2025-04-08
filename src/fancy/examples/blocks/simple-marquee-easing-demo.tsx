import React, { useRef } from "react"

import SimpleMarquee from "@/fancy/components/blocks/simple-marquee"

const exampleImages = [
  "https://cdn.cosmos.so/4b771c5c-d1eb-4948-b839-255dbeb931ba?format=jpeg",
  "https://cdn.cosmos.so/a8d82afd-2293-43ad-bac3-887683d85b44?format=jpeg",
  "https://cdn.cosmos.so/49206ba5-c174-4cd5-aee8-5b744842e6c2?format=jpeg",
  "https://cdn.cosmos.so/b29bd150-6477-420f-8efb-65ed99694421?format=jpeg",
  "https://cdn.cosmos.so/e1a0313e-7617-431d-b7f1-f1b169e6bcb4?format=jpeg",
  "https://cdn.cosmos.so/ad640c12-69fb-4186-bc3d-b1cc93986a37?format=jpeg",
  "https://cdn.cosmos.so/5cf0c3d2-e785-41a3-b0c8-a073ee2f2862?format=jpeg",
  "https://cdn.cosmos.so/938ab21c-a975-41b3-b303-418290343b09?format=jpeg",
  "https://cdn.cosmos.so/2e14a9bb-27e3-40fd-b940-cfb797a1224c?format=jpeg",
  "https://cdn.cosmos.so/81841d9f-e164-4770-aebc-cfc97d72f3ab?format=jpeg",
  "https://cdn.cosmos.so/49b81db0-37ea-4569-b0d6-04afa5115a10?format=jpeg",
  "https://cdn.cosmos.so/ade1834b-9317-44fb-8dc3-b43d29acd409?format=jpeg",
  "https://cdn.cosmos.so/621c250c-3833-45f9-862a-3f400aaf8f28?format=jpeg",
  "https://cdn.cosmos.so/f9b7eae8-e5a6-4ce6-b6e1-9ef125ba7f8e?format=jpeg",
  "https://cdn.cosmos.so/bd56ed6d-1bbd-44a4-b1a1-79b7199bbebb?format=jpeg",
]

const MarqueeItem = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 hover:scale-105 cursor-pointer duration-300 ease-in-out rounded overflow-hidden">
    {children}
  </div>
)

export default function SimpleMarqueeDemo() {
  const firstThird = exampleImages.slice(
    0,
    Math.floor(exampleImages.length / 3)
  )
  const secondThird = exampleImages.slice(
    Math.floor(exampleImages.length / 3),
    Math.floor((2 * exampleImages.length) / 3)
  )
  const lastThird = exampleImages.slice(
    Math.floor((2 * exampleImages.length) / 3)
  )

  const containerRef = useRef<HTMLDivElement>(null)

  const easeFn = (x: number) => {
    return x === 0
      ? 0
      : x === 1
        ? 1
        : x < 0.5
          ? Math.pow(2, 20 * x - 10) / 2
          : (2 - Math.pow(2, -20 * x + 10)) / 2
  }

  return (
    <div
      className="flex w-full h-full relative justify-center items-center flex-col bg-black"
      ref={containerRef}
    >
      <div className="h-full top-0 w-full flex flex-row items-start">
        {/* Just fluff for the demo */}
        <div className="hidden sm:flex w-2/4 px-8 md:px-16 h-full items-center justify-center flex-col space-y-6 md:space-y-8 order-2">
          <h1 className="text-white font-calendas text-3xl md:text-4xl tracking-tight">
            Welcome Back!
          </h1>

          <div className="space-y-3 md:space-y-4 w-full max-w-[320px] md:max-w-[360px]">
            <div className="space-y-1">
              <input
                type="email"
                className="w-full bg-transparent border border-white rounded px-3.5 md:px-4 py-2 text-base md:text-lg text-white font-overusedGrotesk focus:outline-none focus:border-white"
                placeholder="Email"
              />
            </div>

            <div className="space-y-1">
              <input
                type="password"
                className="w-full bg-transparent border border-white rounded px-3.5 md:px-4 py-2 text-base md:text-lg text-white font-overusedGrotesk focus:outline-none focus:border-white"
                placeholder="Password"
              />
            </div>

            <button className="w-full bg-white text-black font-overusedGrotesk font-medium py-2 text-base md:text-lg rounded hover:bg-neutral-200 transition-colors">
              Sign In
            </button>

            <p className="text-neutral-400 text-sm md:text-base text-center">
              Don't have an account?{" "}
              <a href="#" className="text-white hover:text-neutral-200">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Marquee section - this is the main content */}
        <div className="w-full sm:w-2/4 h-full flex flex-row space-x-2 sm:space-x-3 md:space-x-4 px-2 sm:px-3 md:px-4 justify-center sm:justify-end items-center sm:-mt-8 md:-mt-10 order-1">
          <SimpleMarquee
            className="h-full"
            baseVelocity={25}
            repeat={4}
            easing={easeFn}
            direction="up"
          >
            {firstThird.map((src, i) => (
              <MarqueeItem key={i}>
                <img
                  src={src}
                  alt={`Image ${i + 1}`}
                  draggable={false}
                  className="w-24 sm:w-28 md:w-32 object-cover"
                />
              </MarqueeItem>
            ))}
          </SimpleMarquee>

          <SimpleMarquee
            className="h-full"
            baseVelocity={25}
            repeat={4}
            easing={easeFn}
            direction="down"
          >
            {secondThird.map((src, i) => (
              <MarqueeItem key={i}>
                <img
                  src={src}
                  draggable={false}
                  alt={`Image ${i + firstThird.length}`}
                  className="w-24 sm:w-28 md:w-32 object-cover"
                />
              </MarqueeItem>
            ))}
          </SimpleMarquee>

          <SimpleMarquee
            className="h-full"
            baseVelocity={25}
            repeat={4}
            easing={easeFn}
            direction="up"
          >
            {lastThird.map((src, i) => (
              <MarqueeItem key={i}>
                <img
                  src={src}
                  draggable={false}
                  alt={`Image ${i + firstThird.length + secondThird.length}`}
                  className="w-24 sm:w-28 md:w-32 object-cover"
                />
              </MarqueeItem>
            ))}
          </SimpleMarquee>
        </div>
      </div>
    </div>
  )
}
