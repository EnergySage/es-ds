// simple algorithm to match suggestions that start with the query string
export const autocompleteFilterTermsSimple = (query: string, terms: string[]) =>
    terms
        .filter((term) => term.toLowerCase().startsWith(query.toLowerCase()))
        .map((term) => ({
            id: term,
            text: term,
        }));
