import Image from "next/image"
import Link from "next/link"

import { getAllComponents } from "@/lib/api"

export const revalidate = 3600

export default async function ComponentsPage() {
  const components = await getAllComponents(false)

  return (
    <main className="w-screen">
      <div className="rounded-xl bg-background py-6 lg:gap-10 lg:py-6 border-border border shadow-lg px-6 ">
        <h1 className="text-4xl font-bold mb-8 font-calendas">Components</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {components.map((component) => (
            <Link
              href={`/docs/components/${component.category}/${component.name}`}
              key={component.name}
              className="group relative aspect-video  rounded-xl overflow-hidden border"
            >
              {/* Thumbnail Image */}
              <Image
                src={component.thumbnail.url}
                alt={component.name}
                fill
                className="object-cover group-hover:opacity-0 "
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Video on Hover */}
              <video
                src={component.demo.url}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-0 "
              />

              {/* Component Info Overlay */}
              {/* <div className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black from-[-100%] to-30% to-transparent p-4 h-full">
                <h3 className="text-sm font-semibold text-white bottom-0">
                  {component.name
                    .split("-")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </h3>
                <p className="text-sm text-neutral-300 capitalize">
                  {component.category}
                </p>
              </div> */}

            
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
