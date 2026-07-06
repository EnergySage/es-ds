<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-autocomplete.vue?raw');

        const docSource = await import('./autocomplete.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

interface DocSuggestion {
    id: string;
    text: string;
    scope?: {
        label: string;
    };
    value?: unknown;
}

const SEARCH_TERMS = [
    'heat pump cost',
    'heat pump installation',
    'heat pump rebates',
    'heat pump water heater',
    'heat pumps',
    'solar batteries',
    'solar financing',
    'solar installers near me',
    'solar panel cost',
    'solar panel installation',
    'solar panels',
    'solar rebates and incentives',
];

const filterTerms = (query: string) =>
    SEARCH_TERMS.filter((term) => term.toLowerCase().startsWith(query.toLowerCase())).map((term) => ({
        id: term,
        text: term,
    }));

// Basic example
const basicQuery = ref('');
const basicSuggestions = ref<DocSuggestion[]>([]);
const basicResult = ref('');
const onBasicComplete = (query: string) => {
    basicSuggestions.value = filterTerms(query);
};
const onBasicSelect = (suggestion: DocSuggestion) => {
    basicResult.value = `selected "${suggestion.text}"`;
};
const onBasicSubmit = (query: string) => {
    basicResult.value = `submitted "${query}"`;
};

// Scoped suggestions example
const scopedQuery = ref('');
const scopedSuggestions = ref<DocSuggestion[]>([]);
const onScopedComplete = (query: string) => {
    const matches = filterTerms(query);
    scopedSuggestions.value = [
        ...matches,
        ...matches.slice(0, 2).map((match) => ({
            id: `${match.id}-articles`,
            text: match.text,
            scope: { label: 'in Articles' },
        })),
    ];
};

// Hidden label example
const hiddenLabelQuery = ref('');
const hiddenLabelSuggestions = ref<DocSuggestion[]>([]);
const onHiddenLabelComplete = (query: string) => {
    hiddenLabelSuggestions.value = filterTerms(query);
};

// Custom item slot example
interface AddressValue {
    street: string;
    cityStateZip: string;
}
const ADDRESSES: AddressValue[] = [
    { street: '123 Main St', cityStateZip: 'Boston, MA 02108' },
    { street: '125 Main St', cityStateZip: 'Boston, MA 02108' },
    { street: '12 Maple Ave', cityStateZip: 'Cambridge, MA 02138' },
    { street: '1200 Beacon St', cityStateZip: 'Brookline, MA 02446' },
    { street: '15 Harbor Dr', cityStateZip: 'Salem, MA 01970' },
];
const asAddress = (value: unknown) => value as AddressValue;
const addressQuery = ref('');
const addressSuggestions = ref<DocSuggestion[]>([]);
const selectedAddress = ref('');
const onAddressComplete = (query: string) => {
    addressSuggestions.value = ADDRESSES.filter((address) =>
        `${address.street} ${address.cityStateZip}`.toLowerCase().includes(query.toLowerCase()),
    ).map((address) => ({
        id: address.street,
        text: `${address.street}, ${address.cityStateZip}`,
        value: address,
    }));
};
const onAddressSelect = (suggestion: DocSuggestion) => {
    selectedAddress.value = suggestion.text;
};

// Error state example
const errorQuery = ref('');
const errorSuggestions = ref<DocSuggestion[]>([]);
const onErrorComplete = (query: string) => {
    errorSuggestions.value = filterTerms(query);
};

// Disabled example
const disabledQuery = ref('');

const autocompleteProps = [
    [
        'cancelText',
        'String',
        'Cancel',
        `
        Text for the button that closes the full-screen takeover on mobile.
        `,
    ],
    [
        'delay',
        'Number',
        '300',
        `
        Milliseconds to debounce typing before the 'complete' event is emitted.
        `,
    ],
    [
        'disabled',
        'Boolean',
        'false',
        `
        When disabled, the input has a gray background and cannot be interacted with.
        `,
    ],
    [
        'id',
        'String',
        'n/a',
        `
        Required. Used for the input id and to associate the label, help text, and error message for accessibility.
        `,
    ],
    [
        'label',
        'String',
        'n/a',
        `
        Required. Label text for the input. Also used as the accessible title of the mobile takeover.
        `,
    ],
    [
        'labelSrOnly',
        'Boolean',
        'false',
        `
        Visually hides the label so the autocomplete can stand on its own, described only by its placeholder.
        The label is still announced to screen readers.
        `,
    ],
    [
        'minChars',
        'Number',
        '1',
        `
        Minimum number of characters (after trimming) before the 'complete' event is emitted and suggestions
        are shown.
        `,
    ],
    [
        'noResultsText',
        'String',
        'No results found',
        `
        Message shown inside the suggestions panel when a search returns no suggestions. Only shown after
        suggestions have appeared at least once, so it never flashes while the first search is in flight.
        `,
    ],
    [
        'placeholder',
        'String',
        'n/a',
        `
        Text to display inside the input when it is empty.
        `,
    ],
    [
        'required',
        'Boolean',
        'false',
        `
        When true, a red asterisk is displayed next to the label and a default error message is available.
        `,
    ],
    [
        'state',
        'Boolean | null',
        'null',
        `
        Specifies the validity of the input. Can be true (success), false (error), or null (default).
        `,
    ],
    [
        'suggestions',
        'Array',
        'n/a',
        `
        Required. Array of suggestion objects to display. See the suggestion shape section above.
        `,
    ],
];

const autocompleteEvents = [
    [
        'complete',
        'query: string',
        `
        Emitted (debounced) when the user has typed at least minChars characters. Fetch or filter your
        suggestions in response and update the 'suggestions' prop.
        `,
    ],
    [
        'select',
        'suggestion',
        `
        Emitted when a suggestion is chosen, by click/tap or by pressing Enter on a highlighted suggestion.
        The full suggestion object is passed, including its 'value' payload if provided.
        `,
    ],
    [
        'submit',
        'query: string',
        `
        Emitted when the user presses Enter with no suggestion highlighted, e.g. to submit a free-form search.
        `,
    ],
    [
        'update:modelValue',
        'value: string',
        `
        Emitted whenever the input text changes (v-model).
        `,
    ],
];

const autocompleteSlots = [
    [
        'item',
        'suggestion, query',
        `
        Custom renderer for each suggestion. When not provided, the suggestion text is rendered with the
        predictive portion bolded, plus the scope label if present.
        `,
    ],
    [
        'errorMessage',
        'n/a',
        `
        Error message shown below the input when 'state' is false.
        `,
    ],
    [
        'message',
        'n/a',
        `
        Muted helper message shown below the input when there is no error.
        `,
    ],
];
</script>

<template>
    <div>
        <h1>Autocomplete</h1>
        <p class="mb-500">
            Extended from
            <nuxt-link
                to="https://reka-ui.com/docs/components/autocomplete"
                target="_blank">
                Reka UI Autocomplete
            </nuxt-link>
        </p>

        <div class="mb-500">
            <h2>Overview</h2>
            <p>
                <code>EsAutocomplete</code> is a presentational search-suggestions input: your app owns fetching and
                filtering. Listen for the <code>complete</code> event, then update the <code>suggestions</code> prop
                with at most 10 items. The component further trims the list so it always fits on screen without
                scrolling, and it renders the <em>predictive</em> portion of each suggestion in bold.
            </p>
            <p>
                On viewports below the <code>md</code> breakpoint, tapping the input opens a full-screen takeover with
                its own input and cancel button. Resize your browser to try it.
            </p>
            <p>Each suggestion is an object with the following shape:</p>
            <ul>
                <li><code>id</code> (string, required): unique key</li>
                <li><code>text</code> (string, required): the full suggested query</li>
                <li>
                    <code>scope</code> (object, optional): <code>{ label }</code> for category-scoped suggestions,
                    rendered in muted italics and separated from unscoped suggestions
                </li>
                <li><code>value</code> (any, optional): app payload, returned untouched on select</li>
            </ul>
        </div>

        <div class="mb-500">
            <h2>Basic example</h2>
            <p>
                Try typing <code>solar</code> or <code>heat</code>. Keep typing past a match (e.g.
                <code>solarium</code>) to see the no-results state — the panel stays open instead of flickering closed.
            </p>
            <div class="row">
                <div class="col-md-6">
                    <es-autocomplete
                        id="autocomplete-basic"
                        v-model="basicQuery"
                        label="Search"
                        placeholder="Search for a topic"
                        :suggestions="basicSuggestions"
                        @complete="onBasicComplete"
                        @select="onBasicSelect"
                        @submit="onBasicSubmit" />
                    <p class="text-muted">{{ basicResult || 'Nothing selected or submitted yet' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Scoped suggestions</h2>
            <p>
                Suggestions with a <code>scope</code> are styled differently and separated from unscoped suggestions,
                so users understand they search within a category.
            </p>
            <div class="row">
                <div class="col-md-6">
                    <es-autocomplete
                        id="autocomplete-scoped"
                        v-model="scopedQuery"
                        label="Search"
                        placeholder="Search for a topic"
                        :suggestions="scopedSuggestions"
                        @complete="onScopedComplete" />
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Hidden label</h2>
            <p>
                Use <code>labelSrOnly</code> when the autocomplete should stand on its own, described only by its
                placeholder. The label is still announced to screen readers.
            </p>
            <div class="row">
                <div class="col-md-6">
                    <es-autocomplete
                        id="autocomplete-hidden-label"
                        v-model="hiddenLabelQuery"
                        label="Search"
                        label-sr-only
                        placeholder="Search for a topic"
                        :suggestions="hiddenLabelSuggestions"
                        @complete="onHiddenLabelComplete" />
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Custom item rendering</h2>
            <p>
                Use the <code>item</code> slot to control how each suggestion renders, e.g. a two-line address
                suggestion. Try typing <code>1</code> or <code>main</code>.
            </p>
            <div class="row">
                <div class="col-md-6">
                    <es-autocomplete
                        id="autocomplete-address"
                        v-model="addressQuery"
                        label="Street address"
                        placeholder="Enter your address"
                        :suggestions="addressSuggestions"
                        @complete="onAddressComplete"
                        @select="onAddressSelect">
                        <template #item="{ suggestion }">
                            <span class="d-block font-weight-semibold">
                                {{ asAddress(suggestion.value).street }}
                            </span>
                            <span class="d-block font-size-50">
                                {{ asAddress(suggestion.value).cityStateZip }}
                            </span>
                        </template>
                    </es-autocomplete>
                    <p class="text-muted">Selected: {{ selectedAddress || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Required and error state</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-autocomplete
                        id="autocomplete-error"
                        v-model="errorQuery"
                        label="Search"
                        placeholder="Search for a topic"
                        required
                        :state="errorQuery ? null : false"
                        :suggestions="errorSuggestions"
                        @complete="onErrorComplete">
                        <template #errorMessage> Please enter a search term. </template>
                    </es-autocomplete>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Disabled</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-autocomplete
                        id="autocomplete-disabled"
                        v-model="disabledQuery"
                        disabled
                        label="Search"
                        placeholder="This autocomplete is disabled"
                        :suggestions="[]" />
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>EsAutocomplete props</h2>
            <ds-prop-table :rows="autocompleteProps" />
        </div>

        <div class="mb-500">
            <h2>EsAutocomplete events</h2>
            <ds-prop-table
                :columns="['Name', 'Payload', 'Description']"
                :rows="autocompleteEvents"
                :widths="{ md: ['3', '3', '6'] }" />
        </div>

        <div class="mb-500">
            <h2>EsAutocomplete slots</h2>
            <ds-prop-table
                :columns="['Name', 'Slot props', 'Description']"
                :rows="autocompleteSlots"
                :widths="{ md: ['3', '3', '6'] }" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-autocomplete.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/autocomplete.vue" />
    </div>
</template>
