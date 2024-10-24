import { DocsSidebarNav } from "@/components/sidebar-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zink-200 ">
      <div className="flex-1 items-start md:grid md:grid-cols-[120px_minmax(1fr)]  lg:grid-cols-[320px_minmax(0,1fr)] ">
        <aside className="fixed z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 lg:sticky lg:block pt-4 pl-4">
          <div className="rounded-xl bg-background h-full shadow-lg ">
            <ScrollArea className="h-full">
              <DocsSidebarNav items={docsConfig} />
            </ScrollArea>
          </div>
        </aside>

        <div className="flex w-full p-4">
          <div className="rounded-xl bg-background shadow-lg w-full">
            <div className="container">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
