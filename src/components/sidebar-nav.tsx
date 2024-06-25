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
    <div className="w-full px-2 h-full"> 
      {items.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md  text-2xl font-semibold">
            {item.title}
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
  level = 0, // Add a new parameter to track the level of nesting
}: DocsSidebarNavItemsProps & { level?: number }) {
  return items?.length ? (
    <div className="flex flex-col px-1 pb-4">
      {items.map((item, index) => {
        const isClickable = !item.items || item.items.length === 0;
        const itemClasses = cn(
          "flex flex-col rounded-md font-medium",
          isClickable ? "hover:underline" : "cursor-default",
          item.disabled && "cursor-not-allowed opacity-60",
          pathname === item.href ? "text-foreground" : "text-muted-foreground"
        );

        return (
          <div key={index} className={itemClasses}>
            {isClickable ? (
              <Link
                href={item.href}
                className="flex w-full py-1 text-muted-foreground/70 items-center text-lg"
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
            ) : (
              <span className="flex my-2 w-full items-center text-lg text-foreground ">
                {item.title}
                {item.label && (
                  <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground">
                    {item.label}
                  </span>
                )}
              </span>
            )}
            {item.items && (
              <DocsSidebarNavItems items={item.items} pathname={pathname} level={level + 1} />
            )}
          </div>
        );
      })}
    </div>
  ) : null;
}
