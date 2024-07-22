"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarNavItem } from "@/types/nav"

import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full h-full py-8 ">
      {items.map((item, index) => (
        <div key={index} className="mb-3 pb-3  border-black px-6">
          <h4 className="text-2xl font-medium mb-2">
            {item.title} <span className="align-super text-sm">{item.title !== "Getting Started" ? `(${item.items?.length})` : ""}</span>
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="flex flex-col space-y-1">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            " text-lg  text-muted-foreground/70",
            pathname === item.href && "font-medium",
            item.disabled && "opacity-60 cursor-not-allowed"
          )}
          target={item.external ? "_blank" : ""}
          rel={item.external ? "noreferrer" : ""}
        >
          {item.title}
          {item.label && (
            <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000]">
              {item.label}
            </span>
          )}
        </Link>
      ))}
    </div>
  ) : null
}

