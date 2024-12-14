const COMPONENT_GRAPHQL_FIELDS = `
  slug
  name
  thumbnail {
    url
  }
  demo {
    url
  }
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["components"] },
    }
  ).then((response) => response.json());
}

function extractComponent(fetchResponse: any): any {
  return fetchResponse?.data?.componentsCollection?.items?.[0];
}

function extractComponentEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.componentsCollection?.items;
}

export async function getAllComponents(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      componentsCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${COMPONENT_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );

  return extractComponentEntries(entries);
}

export async function getComponent(slug: string, preview: boolean): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      componentsCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }) {
        items {
          ${COMPONENT_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return extractComponent(entry);
}
