import Link from "next/link";
import { HeroImages } from "./hero-images";

export function LandingHero() {
  return (
    <section className="w-full h-[calc(100vh-8rem)] max-h-[1280px] flex flex-col items-center justify-center relative">
      <HeroImages />
      <div className="space-y-12 flex flex-col justify-center items-center w-[700px]">
        <h1 className="text-8xl text-center leading-tight font-calendas tracking-tight">
          Make your website <span className="font-calendas italic">fancy</span> 
        </h1>
        <p className="text-2xl text-center font-overusedGrotesk ">
          with ready to use react components & microinteractions, that really makes your UI pop. Free & Open Source.
        </p>

        <Link
        href="/docs/introduction"
        className="text-xl font-semibold tracking-tight text-white bg-black px-4 py-2 rounded-full hover:scale-105 duration-300 transition-transform z-20 shadow-2xl"
      >
        Check docs
      </Link>
      </div>
    </section>
  );
}
