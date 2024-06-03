import { Github, Instagram } from "lucide-react";
import Link from "next/link";

export function Header() {
    return (
        <header className="fixed w-full flex justify-center items-center">
            <div className="h-24 flex flex-row w-full items-center max-w-screen-xl">
                <nav className="flex items-center justify-between w-full gap-x-4">
                    <div className="flex flex-row items-center  gap-x-6">
                        <div className=" bg-lavender w-8 h-8 rounded-lg flex  justify-center items-center">
                        <p className=" text-reddish rounded-xl text-[10px] tracking-tight font-cotham">fancy</p>
                        </div>
                        <Link href="/Components" className="text-lg">Components</Link>
                    </div>
                    <div className="flex flex-row gap-x-6">
                        <a href="https://github.com" className="text rounded-full"><Github /></a>
                        <a href="https://instagram.com/fancycomponents" className="text"><Instagram /></a>
                    </div>
                </nav>
            </div>
        </header>
    );
}