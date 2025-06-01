"use client"

import Link from "next/link"
import { DocSearch } from "@docsearch/react"
import { motion } from "motion/react"

import "@/styles/docsearch.css"

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
            <motion.span
              whileHover={{
                fontVariationSettings: "'wght' 600",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{
                fontVariationSettings: "'wght' 400",
              }}
            >
              Docs
            </motion.span>
          </Link>
          <Link href="/components">
            <motion.span
              whileHover={{
                fontVariationSettings: "'wght' 600",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{
                fontVariationSettings: "'wght' 400",
              }}
            >
              Components
            </motion.span>
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
          <motion.span
            whileHover={{
              fontVariationSettings: "'wght' 600",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            style={{
              fontVariationSettings: "'wght' 400",
            }}
          >
            Github
          </motion.span>
        </a>
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
