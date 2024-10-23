import Link from "next/link";
import { NavItem, NavItemWithChildren } from "@/types/nav";
import { docsConfig } from "@/config/docs";
import { Doc } from "@/types/types";

interface DocsPagerProps {
  doc: Doc;
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between text">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className="items-center flex flex-row justify-center bg-zinc-200/50 rounded-lg pl-2 pr-6 py-2 shadow "
        >
          <p className="font-serif sm:mr-2 h-7 w-7 rotate-180 ">&#8594;</p>
          <span className="truncate hidden sm:block">{pager.prev.title}</span>
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className=" flex flex-row  items-center justify-center bg-zinc-200/50 rounded-lg pr-2 pl-6 py-2 shadow"
        >
          <span className="truncate hidden sm:block">{pager.next.title}</span>
          <span className="font-serif h-7 w-7 sm:ml-2">&#8594;</span>
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = flatten(docsConfig);
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link.href?.replace(/^\/docs\//, "")
  );
  const prev = activeIndex > 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex < flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link);
    }, [])
    .filter((link) => !link?.disabled);
}
