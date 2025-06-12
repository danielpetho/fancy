import { getAllComponents } from "@/lib/get-components"
import ComponentCard from "@/components/component-card"

export default function Page() {
  const components = getAllComponents()

  return (
    <main className="flex-1 justify-center w-full">
      <div className="rounded-2xl bg-background py-6 lg:gap-10 lg:py-6 border-border border p-6">
        <h1 className="text-4xl font-bold mb-8 font-calendas">Components</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {components.map((component) => (
            <ComponentCard key={component.name} component={component} />
          ))}
        </div>
      </div>
    </main>
  )
}
