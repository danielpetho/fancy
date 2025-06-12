"use client"

import Link from "next/link"

import { Icons } from "@/components/icons"

import "@/styles/docsearch.css"

import { Search } from "./doc-search"
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
            <span
              className={`inline-flex font-normal border-box after:content-[attr(data-text)] after:font-black after:pointer-none after:overflow-hidden after:select-none after:invisible after:h-0 duration-300 transition-all hover:font-semibold flex-col ease-out`}
              data-text="Docs"
            >
              Docs
            </span>
          </Link>
          <Link href="/components">
            <span
              className={`inline-flex font-normal border-box after:content-[attr(data-text)] after:font-black after:pointer-none after:overflow-hidden after:select-none after:invisible after:h-0 duration-300 transition-all hover:font-semibold flex-col ease-out`}
              data-text="Components"
            >
              Components
            </span>
          </Link>
        </div>
      </div>
      <div className="flex-row gap-x-4 sm:gap-x-8 text-xl font-regular flex items-center">
        <div className="hidden sm:block">
          <Search />
        </div>
        <a
          href="https://github.com/danielpetho/fancy"
          className="block lg:hidden"
        >
          <Icons.gitHub className="w-[18px] h-[18px]" />
        </a>
        <a
          href="https://github.com/danielpetho/fancy"
          className="hidden lg:block"
        >
          <span
            className={`inline-flex font-normal border-box after:content-[attr(data-text)] after:font-black after:pointer-none after:overflow-hidden after:select-none after:invisible after:h-0 duration-300 transition-all hover:font-semibold flex-col text-right ease-out`}
            data-text="Github"
          >
            Github
          </span>
        </a>
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
