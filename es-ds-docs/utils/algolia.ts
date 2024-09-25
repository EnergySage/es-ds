export const search = async (searchText: string) => {
    let results = null;
    let numResults = 0;
    const searchResults = await useAsyncAlgoliaSearch({ indexName: 'storyblok-content', query: searchText });
    if (searchResults) {
        results = searchResults.data.value.hits;
        numResults = searchResults.data.value.nbHits;
    }

    return {results, numResults};
};
