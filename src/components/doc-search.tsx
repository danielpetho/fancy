import { DocSearch } from "@docsearch/react"
import { DocSearchHit } from "./doc-search-hit"

export function Search() {
  return (
    <DocSearch
      appId="2X8YUQBTLC"
      indexName="fancycomponents"
      apiKey="6f798ebaa6226dd06e44bd898b32893f"
      placeholder="Search documentation..."
      disableUserPersonalization
      maxResultsPerGroup={10}
      initialQuery="Text"
      hitComponent={({ hit }) => <DocSearchHit hit={hit} />}
      translations={{
        button: {
          buttonText: 'Search docs...',
          buttonAriaLabel: 'Search documentation',
        },
        modal: {
          searchBox: {
            resetButtonTitle: 'Clear the query',
            resetButtonAriaLabel: 'Clear the query',
            cancelButtonText: 'Close',
            cancelButtonAriaLabel: 'Close',
            searchInputLabel: 'Search',
          },
          startScreen: {
            recentSearchesTitle: 'Recent',
            noRecentSearchesText: 'No recent searches',
            saveRecentSearchButtonTitle: 'Save this search',
            removeRecentSearchButtonTitle: 'Remove this search from history',
            favoriteSearchesTitle: 'Favorite',
            removeFavoriteSearchButtonTitle: 'Remove this search from favorites',
          },
          errorScreen: {
            titleText: 'Unable to fetch results',
            helpText: 'You might want to check your network connection.',
          },
          footer: {
            selectText: 'to select',
            selectKeyAriaLabel: 'Enter key',
            navigateText: 'to navigate',
            navigateUpKeyAriaLabel: 'Arrow up',
            navigateDownKeyAriaLabel: 'Arrow down',
            closeText: 'to close',
            closeKeyAriaLabel: 'Escape key',
            searchByText: 'Search by',
          },
          noResultsScreen: {
            noResultsText: 'No results for',
            suggestedQueryText: 'Try searching for',
            reportMissingResultsText: 'Believe this query should return results?',
            reportMissingResultsLinkText: 'Let us know.',
          },
        },
      }}
    />
  )
}