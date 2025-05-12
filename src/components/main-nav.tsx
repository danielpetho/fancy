import Link from "next/link"
import { DocSearch } from "@docsearch/react"

import "@/styles/docsearch.css"

import VariableFontHoverByLetter from "@/fancy/components/text/variable-font-hover-by-letter"

import ThemeSwitcher from "./theme-switcher"

export function MainNav() {
  return (
    <nav className="flex items-center justify-between w-full gap-x-4">
      <div className="flex flex-row items-center gap-x-12">
        <Link href="/" className="flex items-center gap-x-2">
          <p className=" text-2xl px-2 pb-1.5 tracking-tight font-calendas scale-y-[120%] align-text-top ">
            fancy components*
          </p>
        </Link>
        <div className="flex-row gap-x-8 text-lg  font-regular items-end hidden md:flex">
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
        {/* <DocSearch
          appId="2X8YUQBTLC"
          indexName="fancycomponents"
          apiKey="6f798ebaa6226dd06e44bd898b32893f"
          placeholder="Search docs"
          disableUserPersonalization
          maxResultsPerGroup={10}
          initialQuery="fancy"
        /> */}
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
