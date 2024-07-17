import { Github, Instagram } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center items-center bg-background border-b-2 border-black">
      <div className="h-24 px-4 flex  flex-row w-full items-center ">
        <nav className="flex items-center justify-between w-full gap-x-4">
          <div className="flex flex-row items-center gap-x-12">
            <Link href="/" className="flex items-center gap-x-2">
              <p className=" text-3xl px-2 tracking-tight font-calendas scale-y-[110%] align-text-top" >
                fancy components*
              </p>
            </Link>
            <div className="flex flex-row gap-x-8 pt-2 text-xl align-baseline font-regular items-end">
              <Link href="/docs/introduction" className="">
                Docs
              </Link>
              <Link href="/docs/components/text/vertical-hover" className="">
                Components
              </Link>
            </div>
          </div>
          <div className="flex flex-row gap-x-8 text-xl font-regular">
            <a href="https://github.com" className="text rounded-full">
              <Github />
            </a>
            <a href="https://instagram.com/fancycomponents" className="text">
              <Instagram />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
