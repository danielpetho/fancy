import { ExternalLinkIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-20 mb-4">
      <div className="flex w-full mx-4 rounded-2xl bg-background items-center justify-center h-full border border-border">
        <div className="flex items-center justify-center mx-4 ">
          <p>
            built with 💙 by{" "}
            <a
              href="https://twitter.com/nonzeroexitcode"
              className="cursor-pointer no-underline text-blue hover:text-blue-400 dark:hover:text-blue-300 dark:text-blue-400 duration-300 transition-colors ease-out inline-flex items-center font-medium"
            >
              nonzeroexitcode
              <ExternalLinkIcon
                className="ml-1 mt-0.5"
                size={14}
                strokeWidth={2.5}
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
