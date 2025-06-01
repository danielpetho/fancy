"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

import { SidebarNavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full h-full py-6">
      {items.map((item, index) => (
        <div key={index} className="mb-4 pb-3 border-black px-6">
          <h4 className="text-2xl font-medium mb-2">
            {item.title}{" "}
            <span className="align-super text-sm">
              {item.title !== "Getting Started"
                ? `(${item.items?.length})`
                : ""}
            </span>
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null
}

interface NavItemProps {
  item: SidebarNavItem
  index: number
  pathname: string | null
}

function NavItem({ item, index, pathname }: NavItemProps) {
  const isActive = pathname === item.href

  return (
    <motion.p key={index}>
      <Link
        href={item.href ?? "#"}
        className="inline-block"
        target={item.external ? "_blank" : ""}
        rel={item.external ? "noreferrer" : ""}
      >
        <motion.span
          initial={{ 
            fontVariationSettings: isActive ? "'wght' 500" : "'wght' 400", 
            color: isActive ? "var(--foreground)" : "hsl(var(--muted-foreground))" 
          }}
          whileHover={{ 
            fontVariationSettings: "'wght' 500", 
            color: "var(--foreground)", 
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          animate={{
            fontVariationSettings: isActive ? "'wght' 500" : "'wght' 400",
            color: isActive ? "var(--foreground)" : "hsl(var(--muted-foreground))",
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className={cn(
            "inline-block no-underline duration-300 transition-colors ease-out",
            isActive && "text-foreground",
            !isActive && "text-muted-foreground",
            item.disabled && "opacity-60 cursor-not-allowed"
          )}
        >
          {item.title}
        </motion.span>
        {item.label && (
          <span className="ml-1 rounded-md bg-blue dark:bg-blue-500 px-1.5 py-0.5 text-[11px] leading-none text-white">
            {item.label}
          </span>
        )}
      </Link>
    </motion.p>
  )
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
    <div className="flex flex-col space-y-2">
      {items.map((item, index) => (
        <NavItem key={index} item={item} index={index} pathname={pathname} />
      ))}
    </div>
  ) : null
}
