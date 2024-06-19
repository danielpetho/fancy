import { MDXComponents } from "mdx/types"

export type Doc = {
    _id: string
    type: 'Doc'
    title: string
    description: string
    published: boolean
    featured: boolean
    component: boolean
    toc: boolean
    /** MDX file body */
    body: any
    slug: string
    slugAsParams: string
  }  
  