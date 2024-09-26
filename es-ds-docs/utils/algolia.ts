export const search = async (searchText: string, pageNum: number) => {
    let results = null;
    let numResults = 0;
    let numPages = 0;
    let requestOptions = { page: pageNum || 0 };

    const searchResults = await useAsyncAlgoliaSearch({ indexName: 'storyblok-content', query: searchText, requestOptions });

    if (searchResults) {
        results = searchResults.data.value.hits;
        numPages = searchResults.data.value.nbPages;
        numResults = searchResults.data.value.nbHits;
    }

    return {results, numResults, numPages};
};
