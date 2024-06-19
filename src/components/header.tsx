import { Github, Instagram } from "lucide-react";
import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full flex justify-center items-center bg-background">
            <div className="h-24 flex container flex-row w-full items-center max-w-screen-2xl">
                <nav className="flex items-center justify-between w-full gap-x-4">
                    <div className="flex flex-row items-center gap-x-6">
                        <Link href="/" className="flex items-center gap-x-2">
                            <div className=" bg-lavender  rounded-lg flex  justify-center items-center">
                                <p className=" text-reddish rounded-xl text-xl px-2 py-0.5 tracking-tight font-cotham">fancy</p>
                            </div>
                        </Link>

                    </div>
                    <div className="flex flex-row gap-x-6">
                        <Link href="/docs" className="">Docs</Link>
                        <Link href="/docs/components" className="">Components</Link>
                        <a href="https://github.com" className="text rounded-full"><Github /></a>
                        <a href="https://instagram.com/fancycomponents" className="text"><Instagram /></a>
                    </div>
                </nav>
            </div>
        </header>
    );
}