"use client";

import { VariableFontHoverByLetter } from "@/fancy/components/text/variable-font-hover-by-letter";
import Link from "next/link";

export function Header() {
  return (
    <header className="z-50 w-full flex justify-center items-center ">
      <div className="h-24 px-4 flex mx-4 mt-4 bg-background flex-row w-full items-center rounded-xl shadow-xl">
        <nav className="flex items-center justify-between w-full gap-x-4">
          <div className="flex flex-row items-center gap-x-12">
            <Link
              href="/docs/introduction"
              className="flex items-center gap-x-2"
            >
              <p className=" text-3xl px-2 tracking-tight font-calendas scale-y-[120%] align-text-top ">
                fancy components*
              </p>
            </Link>
            <div className="flex flex-row gap-x-8 pt-2 text-xl align-baseline font-regular items-end">
              <Link href="/docs/introduction">
                <VariableFontHoverByLetter
                  label="Docs"
                  fromFontVariationSettings="'wght' 400, 'slnt' 0"
                  toFontVariationSettings="'wght' 500, 'slnt' -10"
                  transition={{ duration: 0.2 }}
                />
              </Link>
              <Link href="/docs/components/text/letter-swap">
                <VariableFontHoverByLetter
                  label="Components"
                  fromFontVariationSettings="'wght' 400, 'slnt' 0"
                  toFontVariationSettings="'wght' 500, 'slnt' -10"
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-row gap-x-8 text-xl font-regular">
            <a href="https://github.com/danielpetho/fancy">
              <VariableFontHoverByLetter
                label="Github"
                fromFontVariationSettings="'wght' 400, 'slnt' 0"
                  toFontVariationSettings="'wght' 500, 'slnt' -10"
                transition={{ duration: 0.2 }}
              />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
