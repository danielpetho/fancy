"use client";

import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="z-50 w-full flex justify-center items-center ">
      <div className="h-24 px-4 flex mx-4 mt-4 bg-background flex-row w-full space-x-2 items-center rounded-xl shadow-xl">
        <MobileNav />
        <MainNav />
      </div>
    </header>
  );
}
