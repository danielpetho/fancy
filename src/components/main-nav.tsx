import Link from "next/link"

import VariableFontHoverByLetter from "@/fancy/components/text/variable-font-hover-by-letter"

import ThemeSwitcher from "./ui/ThemeSwitcher"

export function MainNav() {
  return (
    <nav className="flex items-center justify-end md:justify-between w-full gap-x-4">
      <div className="flex flex-row items-center gap-x-12">
        <Link href="/" className="flex items-center gap-x-2">
          <p className=" text-2xl px-2 tracking-tight font-calendas scale-y-[120%] ">
            fancy components*
          </p>
        </Link>
        <div className="flex-row gap-x-8 pt-1 text-lg  font-regular items-end hidden md:flex">
          <Link href="/docs/introduction">
            <VariableFontHoverByLetter
              label="Docs"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 500, 'slnt' -10"
              transition={{ duration: 0.2 }}
            />
          </Link>
          <Link href="/components">
            <VariableFontHoverByLetter
              label="Components"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 500, 'slnt' -10"
              transition={{ duration: 0.2 }}
            />
          </Link>
        </div>
      </div>
      <div className="flex-row gap-x-8 text-xl font-regular flex items-center">
        <a
          href="https://github.com/danielpetho/fancy"
          className="hidden md:block"
        >
          <VariableFontHoverByLetter
            label="Github"
            fromFontVariationSettings="'wght' 400, 'slnt' 0"
            toFontVariationSettings="'wght' 500, 'slnt' -10"
            transition={{ duration: 0.2 }}
          />
        </a>
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
