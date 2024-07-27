export type Doc = {
  _id: string;
  type: "Doc";
  title: string;
  description: string;
  published: boolean;
  featured: boolean;
  component: boolean;
  toc: boolean;
  /** MDX file body */
  body: any;
  slug: string;
  slugAsParams: string;
};

export type NpmCommands = {
  __npmCommand__?: string;
  __yarnCommand__?: string;
  __pnpmCommand__?: string;
  __bunCommand__?: string;
};

export interface DocPageProps {
  params: {
    slug: string[];
  };
}



