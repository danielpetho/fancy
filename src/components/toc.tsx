// @ts-nocheck
"use client"

import * as React from "react"

import { TableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { motion } from "motion/react"

interface TocProps {
  toc: TableOfContents
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.items || !mounted) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-3": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-1")}>
            <motion.a
              href={item.url}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(item.url)?.scrollIntoView({
                  behavior: "smooth",
                })
              }}
              initial={{ fontVariationSettings: "'wght' 400", color: item.url === `#${activeItem}` ? "var(--foreground)" : "hsl(var(--muted-foreground))"  }}
              whileHover={{ fontVariationSettings: "'wght' 500", color: "var(--foreground)", transition: {duration: 0.3, ease: "easeOut"}}}
              animate={{
                fontVariationSettings: item.url === `#${activeItem}` ? "'wght' 500" : "'wght' 400",
                color: item.url === `#${activeItem}` ? "var(--foreground)" : "hsl(var(--muted-foreground))",
                transition: {duration: 0.3, ease: "easeOut"}
              }}
              className={cn(
                "inline-block no-underline duration-300 transition-colors ease-out",
                item.url === `#${activeItem}`
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </motion.a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
