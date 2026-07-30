export interface EsAutocompleteTextSegment {
    /** true when this is text the suggestion would add beyond the typed query — render it bold */
    predictive: boolean;
    text: string;
}

export interface EsAutocompleteSuggestion {
    id: string;
    /** full suggested query, e.g. "backpack rain cover" */
    text: string;
    /** opaque app payload, returned untouched on select */
    value?: unknown;
}
