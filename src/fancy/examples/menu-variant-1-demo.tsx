import { Menu } from "@/fancy/components/blocks/menu-variant-1";

const links = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/" },
  { label: "About", href: "/" },
  { label: "Services", href: "/" },
  { label: "Contact", href: "/" },
];

export default async function VerticalHoverDemo() {
  return (
    <div className="w-full h-full flex justify-center items-center">
        <Menu links={links} className="absolute top-12 right-12 px-4 py-1 text-lg bg-slate-200 text-black shadow-xl" />  
    </div>
  )
}