import { ExternalLink, ExternalLinkIcon } from "lucide-react"

interface DocAuthorProps {
  author: string
}

export function DocAuthor({ author }: DocAuthorProps) {
  if (!author || author.length === 0 || author === "undefined") {
    return null
  }

  return (
    <p className="pt-4 text text-muted-foreground flex flex-row whitespace-pre text-lg">
      by {" "}
      {author.match(/\[([^\]]+)\]\(([^)]+)\)/g)
        ? author.split(",").map((authorItem, i) => {
            const match = authorItem.match(/\[([^\]]+)\]\(([^)]+)\)/)
            if (match) {
              return (
                <span key={i}>
                  {i > 0 && " "}
                  <a
                    href={match[2]}
                    className="no-underline text-blue hover:text-blue-400 dark:hover:text-blue-500 dark:text-blue-300 duration-300 transition-colors ease-out inline-flex items-center font-medium"
                  >
                    {match[1].trim()}
                    <ExternalLinkIcon
                      className="ml-1 mt-0.5"
                      size={14}
                      strokeWidth={2.5}
                    />
                  </a>
                </span>
              )
            }
            return (
              <span key={i}>
                {i > 0 && " "}
                {authorItem.trim()}
              </span>
            )
          })
        : author.match(/(.*?)\s*<(https?:\/\/[^>]+)>/g)
          ? author.split(",").map((authorItem, i) => {
              const match = authorItem.match(/(.*?)\s*<(https?:\/\/[^>]+)>/)
              if (match) {
                return (
                  <span key={i}>
                    {i > 0 && " "}
                    <a
                      href={match[2]}
                      className="no-underline text-blue hover:text-blue-400 dark:hover:text-blue-300 dark:text-blue-400 duration-300 transition-colors ease-out inline-flex items-center font-medium"
                    >
                      {match[1].trim()}
                      <ExternalLinkIcon
                        className="ml-1 mt-0.5"
                        size={14}
                        strokeWidth={2.5}
                      />
                    </a>
                  </span>
                )
              }
              return (
                <span key={i}>
                  {i > 0 && " "}
                  {authorItem.trim()}
                </span>
              )
            })
          : author}
    </p>
  )
}
