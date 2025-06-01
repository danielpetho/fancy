"use client"

import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"

export function Header() {
  return (
    <header className=" w-full flex justify-center items-center">
      <div className="h-20 px-4 z-50 flex mx-4 mt-4 bg-background flex-row w-full space-x-2 items-center rounded-2xl  border-border border ">
        <MobileNav />
        <MainNav />
      </div>
    </header>
  )
}
