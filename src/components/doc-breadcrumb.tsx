interface DocBreadcrumbProps {
  componentType: string
  title: string
}

export function DocBreadcrumb({ componentType, title }: DocBreadcrumbProps) {
  return (
    <div className="pb-6 flex items-center space-x-1 text-[13px] md:text-base text-muted-foreground">
      <div className="font-medium whitespace-nowrap">
        Docs
      </div>
      <span className="font-serif">&#8594;</span>
      <div
        data-algolia-level-0
        className="font-medium text-muted-foreground"
      >
        {componentType}
      </div>
      <span className="font-serif">&#8594;</span>
      <div className="font-medium text-foreground">{title}</div>
    </div>
  )
}
