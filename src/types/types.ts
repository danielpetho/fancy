export type Doc = {
  _id: string
  type: "Doc"
  title: string
  description: string
  published: boolean
  featured: boolean
  component: boolean
  toc: any
  author: string
  /** MDX file body */
  body: any
  slug: string
  slugAsParams: string
}

export type NpmCommands = {
  __npmCommand__?: string
  __yarnCommand__?: string
  __pnpmCommand__?: string
  __bunCommand__?: string
}

export interface DocPageProps {
  params: {
    slug: string[]
  }
}

// CMS data
export type Component = {
  slug: string
  name: string
  thumbnail: {
    url: string
  }
  demo: {
    url: string
  }
  category: string
}
