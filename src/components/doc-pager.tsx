"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { NavItem, NavItemWithChildren } from "@/types/nav"
import { Doc } from "@/types/types"
import { docsConfig } from "@/config/docs"

const MotionLink = motion.create(Link)

interface DocsPagerProps {
  doc: Doc
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc)

  if (!pager) {
    return null
  }

  return (
    <div
      className={`flex flex-row items-center ${pager.prev && pager.next ? "justify-between" : pager.next ? "justify-end" : "justify-start"} text`}
    >
      {pager?.prev?.href && (
        <MotionLink
          href={pager.prev.href}
          className="items-center flex flex-row justify-center bg-muted rounded-xl pl-2 pr-6 py-2 hover:bg-muted/60 duration-300 ease-out transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-blue ring-offset-none"
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
        >
          <motion.p 
            className="font-serif sm:mr-2 h-7 w-7 rotate-180"
            variants={{
              hover: {
                x: 5,
                transition: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }
            }}
          >
            &#8594;
          </motion.p>
          <span className="truncate hidden sm:block">{pager.prev.title}</span>
        </MotionLink>
      )}
      {pager?.next?.href && (
        <MotionLink
          href={pager.next.href}
          className="flex flex-row hover:bg-muted/60 duration-300 ease-out transition items-center justify-center rounded-xl pr-2 pl-6 py-2 bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-blue"
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
        >
          <span className="truncate hidden sm:block">{pager.next.title}</span>
          <motion.span 
            className="font-serif h-7 w-7 sm:ml-2"
            variants={{
              hover: {
                x: 5,
                transition: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }
            }}
          >
            &#8594;
          </motion.span>
        </MotionLink>
      )}
    </div>
  )
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = flatten(docsConfig)
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link.href?.replace(/^\/docs\//, "")
  )
  const prev = activeIndex > 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex < flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
  return {
    prev,
    next,
  }
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link)
    }, [])
    .filter((link) => !link?.disabled)
}
