export interface EsAutocompleteSuggestion {
    id: string;
    /** full suggested query, e.g. "backpack rain cover" */
    text: string;
    /** present only for category-scoped suggestions, e.g. { label: 'in Outdoor Gear' } */
    scope?: {
        label: string;
    };
    /** opaque app payload, returned untouched on select */
    value?: unknown;
}
