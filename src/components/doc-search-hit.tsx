import { useState } from "react"
import Link from "next/link"
import { CornerDownLeft, File, Hash, Text } from "lucide-react"

interface DocSearchHitProps {
  hit: any
}

export function DocSearchHit({ hit }: DocSearchHitProps) {
  // Compose hierarchy string
  const hierarchy = [hit.hierarchy.lvl0, hit.hierarchy.lvl1, hit.hierarchy.lvl2]
    .filter(Boolean)
    .join(" / ")
  const mainHierarchy = hit.hierarchy.lvl1 || ""

  // Determine which icon to show based on hierarchy and content
  let LeadingIcon = Text
  if (!hit.content || hit.content.trim() === "") {
    if (hit.hierarchy.lvl2) {
      LeadingIcon = Hash
    } else if (hit.hierarchy.lvl1) {
      LeadingIcon = File
    }
  }

  // Determine what to show as the main content
  let mainContent = null
  let mainContentHighlight = null
  if (!hit.content || hit.content.trim() === "") {
    if (hit.hierarchy.lvl2) {
      mainContent = hit.hierarchy.lvl2
      mainContentHighlight =
        hit._highlightResult?.hierarchy?.lvl2?.value || hit.hierarchy.lvl2
    } else if (hit.hierarchy.lvl1) {
      mainContent = hit.hierarchy.lvl1
      mainContentHighlight =
        hit._highlightResult?.hierarchy?.lvl1?.value || hit.hierarchy.lvl1
    }
  }

  return (
    <Link
      href={hit.url}
      className="w-full px-2 py-3 flex gap-4 items-center cursor-pointer rounded-xl"
    >
      <LeadingIcon className="w-4 h-4 text-foreground shrink-0 stroke-[1.5px]" />
      <div className="min-w-0 flex-1">
        <div className="items-center gap-2 text-foreground flex">
          <span className="text-sm font-medium truncate">
            <style jsx>{`
              mark {
                color: #2563eb;
                background: none;
                font-weight: 600;
                padding: 0;
                overflow: hidden;
              }
            `}</style>
            {mainContent ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: mainContentHighlight,
                }}
              />
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    hit._snippetResult?.content?.value ||
                    hit._highlightResult?.content?.value ||
                    hit.content,
                }}
              />
            )}
          </span>
        </div>
        {hierarchy &&
          hit.type !== "lvl1" &&
          (hit._highlightResult?.hierarchy?.lvl1?.value !== mainContent ||
            hit._highlightResult?.hierarchy?.lvl1?.value !== mainHierarchy) && (
            <div className="text-xs text-muted-foreground leading-tight truncate">
              <style jsx>{`
                mark {
                  color: #2563eb;
                  background: none;
                  font-weight: 600;
                  padding: 0;
                }
              `}</style>
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    hit._highlightResult?.hierarchy?.lvl1?.value ||
                    mainHierarchy,
                }}
              />
            </div>
          )}
      </div>
      <div className="ml-auto" data-enter-icon>
        <CornerDownLeft className="w-4 h-4 text-foreground stroke-[1.5px]" />
      </div>
    </Link>
  )
}
