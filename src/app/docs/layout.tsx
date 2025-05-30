import { docsConfig } from "@/config/docs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { DocsSidebarNav } from "@/components/sidebar-nav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <Header />
      <div>
        <div className="flex-1 items-start md:grid md:grid-cols-[120px_minmax(1fr)] lg:grid-cols-[320px_minmax(0,1fr)] ">
          <aside className="sticky top-0 pb-4 z-30 hidden h-[calc(100vh-6rem)] w-full shrink-0 lg:block pt-4 pl-4 ">
            <div className="rounded-2xl bg-background h-full border-border border">
              <ScrollArea className="h-full">
                <DocsSidebarNav items={docsConfig} />
              </ScrollArea>
            </div>
          </aside>

          <div className="p-4">{children}</div>
        </div>
        {/* <div className="absolute bottom-0 h-36" /> */}
      </div>
      <Footer />
    </div>
  )
}
