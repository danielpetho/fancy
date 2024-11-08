import { VariableFontHoverByLetter } from "@/fancy/components/text/variable-font-hover-by-letter";
import Link from "next/link";

export function MainNav() {
    return (
        <nav className="flex items-center justify-end md:justify-between w-full gap-x-4">
          <div className="flex flex-row items-center gap-x-12">
            <Link
              href="/docs/introduction"
              className="flex items-center gap-x-2"
            >
              <p className=" text-3xl px-2 tracking-tight font-calendas scale-y-[120%] align-text-top ">
                fancy components*
              </p>
            </Link>
            <div className="flex-row gap-x-8 pt-2 text-xl  font-regular items-end hidden md:flex">
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
          <div className="flex-row gap-x-8 text-xl font-regular hidden md:flex">
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
    )
}