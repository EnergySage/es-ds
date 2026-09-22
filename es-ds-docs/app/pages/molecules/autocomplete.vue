<script setup lang="ts">
import type { SampleAutocompleteAddress } from '~/utils/autocomplete-sample-items';

// simple algorithm to match suggestions that start with the query string
const filterTerms = (query: string, terms: string[]) =>
    terms
        .filter((term) => term.toLowerCase().startsWith(query.toLowerCase()))
        .map((term) => ({
            id: term,
            text: term,
        }));

// more complex algorithm to match addresses by matching start of query token
// to start of address token, independent of token order
const filterAddresses = (query: string) => {
    const queryTokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return SAMPLE_LIST_OF_AUTOCOMPLETE_ADDRESSES.filter((address) => {
        const words = `${address.street} ${address.cityStateZip}`.toLowerCase().split(/[^a-z0-9]+/);
        return queryTokens.every((token) => words.some((word) => word.startsWith(token)));
    }).map((address) => ({
        id: address.street,
        text: `${address.street}, ${address.cityStateZip}`,
        value: address,
    }));
};

// split the address into two lines to enable custom formatting
const splitAddressLines = (suggestion: EsAutocompleteSuggestion, query: string) => {
    const address = suggestion.value as unknown as SampleAutocompleteAddress;
    return splitAutocompleteTextLines([address.street, address.cityStateZip], query);
};

// fruit examples
const fruitQuery = ref('');
const fruitSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const handleFruitComplete = (query: string) => {
    fruitSuggestions.value = filterTerms(query, SAMPLE_LIST_OF_FRUIT);
};

// long text examples
const longTextQuery = ref('');
const longTextSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const handleLongTextComplete = (query: string) => {
    longTextSuggestions.value = filterTerms(query, SAMPLE_LIST_OF_SEARCH_TERMS);
};

// address examples
const addressQuery = ref('');
const addressSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const handleAddressComplete = (query: string) => {
    addressSuggestions.value = filterAddresses(query);
};

// set up form and validation for required selection address example
const requiredAddressSelection = ref<EsAutocompleteSuggestion | null>(null);
const requiredAddressState = ref<boolean | null>(null);
const handleRequiredAddressBlur = () => {

};
const handleRequiredAddressSelect = (suggestion: EsAutocompleteSuggestion) => {
    requiredAddressSelection.value = suggestion || null;
    requiredAddressState.value = null;
};
const handleRequiredAddressSubmit = async () => {
    if (requiredAddressSelection.value) {
        requiredAddressState.value = null;
    } else {
        requiredAddressState.value = false;
    }
};


// Requiring a selection example (e.g. address validation)
const requiredQuery = ref('');
const requiredSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const requiredSelection = ref<EsAutocompleteSuggestion | null>(null);
const requiredState = ref<boolean | null>(null);
const requiredResult = ref('');
const onRequiredComplete = (query: string) => {
    requiredSuggestions.value = filterAddresses(query);
};
const onRequiredSelect = (suggestion: EsAutocompleteSuggestion) => {
    requiredSelection.value = suggestion;
    requiredState.value = null;
    requiredResult.value = '';
};
// typing after selecting invalidates the selection: the text no longer matches
// what was chosen from the list
watch(requiredQuery, (query) => {
    if (requiredSelection.value && query !== requiredSelection.value.text) {
        requiredSelection.value = null;
    }
    if (requiredState.value === false) {
        requiredState.value = null;
    }
});
// called by the submit button AND by the component's own 'submit' event
// (pressing Enter on free text), so both paths validate the same way
const onRequiredSubmit = () => {
    if (requiredSelection.value) {
        requiredState.value = null;
        requiredResult.value = `validated address: ${requiredSelection.value.text}`;
    } else {
        requiredState.value = false;
        requiredResult.value = '';
    }
};

// Error state example
const errorQuery = ref('');
const errorSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const onErrorComplete = (query: string) => {
    errorSuggestions.value = filterTerms(query, SAMPLE_LIST_OF_SEARCH_TERMS);
};

// Disabled example
const disabledQuery = ref('');

const autocompleteProps = [
    ['v-model', 'String', 'n/a', 'Required. The v-model directive binds the query text to a data property.'],
    [
        'autocomplete',
        'String',
        'off',
        `
        The input's autocomplete token. 'off' keeps the browser's own saved-value dropdown from competing with
        the suggestion list. A field that maps to a real autofill token — 'street-address', 'name', 'email' —
        can set it to trade the other way and let the browser offer a saved value.
        `,
    ],
    [
        'clearText',
        'String',
        'Clear',
        `
        Accessible label for the X button that clears the input. The button appears whenever the input has text.
        `,
    ],
    [
        'closeText',
        'String',
        'Close',
        `
        Text for the button that closes the full-screen takeover on mobile, keeping whatever is in the input.
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
        Message shown inside the suggestions panel once a search has come back with no suggestions. Never
        shown while a search is still in flight (promptText shows instead).
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
        'promptText',
        'String',
        'Type for suggestions',
        `
        Message shown inside the suggestions panel when there is nothing else to show: before typing begins,
        below minChars, or while the first search is in flight.
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
        'showOverlayOnFocus',
        'Boolean',
        'false',
        `
        On desktop, dims the rest of the page with an overlay while the input has focus. Suits a standalone
        primary search (e.g. site search in a sticky header); leave off for a field within a larger form,
        where the overlay would obscure sibling fields.
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
        'suggestionCountText',
        'Function',
        "(count) => '{count} suggestions available'",
        `
        Builds the screen-reader announcement made when suggestions arrive, given the number of
        suggestions displayed (after the display cap and fit-to-viewport trim). An empty result
        announces noResultsText instead.
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
        predictive portion bolded. Use the EsAutocompleteSuggestionText component to apply the same
        predictive bolding to your own text (see the custom item rendering example).
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
</script>

<template>
    <div>
        <h1>Autocomplete</h1>
        <p class="mb-500">
            Makes use of
            <nuxt-link
                to="https://reka-ui.com/docs/components/dialog"
                target="_blank">
                Reka UI Dialog
            </nuxt-link>
        </p>

        <div class="mb-500">
            <h2>Basic example</h2>
            <p>
                This example asks you to select your favorite fruit and provides suggestions as you type. By default,
                the autocomplete allows free text entry and does not force the user to choose from the list of options.
            </p>
            <es-row>
                <es-col md="6">
                    <es-autocomplete
                        v-model="fruitQuery"
                        label="Favorite fruit"
                        placeholder="Search for a fruit"
                        :suggestions="fruitSuggestions"
                        @complete="handleFruitComplete" />
                </es-col>
            </es-row>
            <p class="text-muted">
                {{ `value: ${fruitQuery || '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Hidden label</h2>
            <p>Here the label is hidden visually, but will still be announced by screen readers.</p>
            <es-row>
                <es-col md="6">
                    <es-autocomplete
                        v-model="fruitQuery"
                        label="Favorite fruit"
                        label-sr-only
                        placeholder="Search for a fruit"
                        :suggestions="fruitSuggestions"
                        @complete="handleFruitComplete" />
                </es-col>
            </es-row>
            <p class="text-muted">
                {{ `value: ${fruitQuery || '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Custom item rendering</h2>
            <p>
                This autocomplete demonstrates customizing the display of suggestion items, in this case splitting an
                address into two lines.
            </p>
            <p>
                When using this feature, be sure that each suggestion differentiates between the user's typed text and
                the additional suggested text, highlighting the latter for easy scanning. We provide an autocomplete
                suggestion text component that handles this for you and can support multiple lines of text.
            </p>
            <p>
                To avoid overwhelming the user with choices, the number of suggestions displayed is limited to five
                items.
            </p>
            <es-row>
                <es-col md="6">
                    <es-autocomplete
                        v-model="addressQuery"
                        label="Address"
                        placeholder="Enter your address"
                        :suggestions="addressSuggestions"
                        @complete="handleAddressComplete">
                        <template #item="{ suggestion, query }">
                            <es-autocomplete-suggestion-text
                                v-for="(lineSegments, lineIndex) in splitAddressLines(suggestion, query)"
                                :key="lineIndex"
                                class="d-block"
                                :class="{ 'font-size-50': lineIndex === 1 }"
                                :segments="lineSegments" />
                        </template>
                    </es-autocomplete>
                </es-col>
            </es-row>
            <p class="text-muted">
                {{ `value: ${addressQuery || '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Limited width</h2>
            <p>
                In some cases, an autocomplete may appear in a narrow width layout. The suggestions list on desktop,
                however, is not constrained by this. Try searching for "solar" or "heat pump".
            </p>
            <es-row>
                <es-col
                    md="8"
                    lg="6"
                    class="d-flex">
                    <es-autocomplete
                        v-model="longTextQuery"
                        class="flex-grow-1"
                        label="Search"
                        label-sr-only
                        placeholder="Search for a topic"
                        :suggestions="longTextSuggestions"
                        @complete="handleLongTextComplete" />
                    <es-button class="ml-100 px-md-300 px-xl-200 px-xxl-400 text-nowrap w-50 w-md-auto"> Shop local offers </es-button>
                </es-col>
            </es-row>
            <p class="text-muted">
                {{ `value: ${longTextQuery || '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Requiring a selection</h2>
            <p>
                In some cases, we want to require the user to select from the provided list of suggestions rather
                than allowing free text entry.
            </p>
            <es-form @submit.stop.prevent="handleRequiredAddressSubmit">
                <es-row>
                    <es-col md="6">
                        <es-autocomplete
                            v-model="addressQuery"
                            label="Address"
                            placeholder="Enter your address"
                            required
                            :state="requiredAddressState"
                            :suggestions="addressSuggestions"
                            @complete="handleAddressComplete"
                            @select="handleRequiredAddressSelect">
                            <template #errorMessage> Please select an address from the suggestions. </template>
                        </es-autocomplete>
                    </es-col>
                    <es-col md="6">
                        <es-button
                            class="mt-100 mt-md-200 px-md-300 w-100 w-md-auto"
                            type="submit">
                            Submit
                        </es-button>
                    </es-col>
                </es-row>
            </es-form>
            <p class="text-muted">
                {{ `value: ${requiredAddressSelection ? requiredAddressSelection.text : '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Requiring a selection</h2>
            <p>
                For address validation and similar use cases, the user must pick a suggestion rather than submit free
                text. The component stays presentational: the app tracks the last <code>select</code>-ed suggestion,
                invalidates it when the text is edited afterward (compare the input text to the selection's
                <code>text</code>), and treats the <code>submit</code> event as a validation trigger instead of a
                search. Try typing <code>main</code>, then pressing Enter or the button without picking a suggestion.
            </p>
            <div class="row">
                <div class="col-md-6">
                    <es-autocomplete
                        id="autocomplete-required-selection"
                        v-model="requiredQuery"
                        label="Street address"
                        placeholder="Enter your address"
                        required
                        :state="requiredState"
                        :suggestions="requiredSuggestions"
                        @complete="onRequiredComplete"
                        @select="onRequiredSelect"
                        @submit="onRequiredSubmit">
                        <template #errorMessage> Please select an address from the suggestions. </template>
                    </es-autocomplete>
                    <es-button
                        class="mt-100"
                        @click="onRequiredSubmit">
                        Validate address
                    </es-button>
                    <p class="text-muted mt-100">
                        {{
                            requiredResult ||
                            (requiredSelection ? `selected: ${requiredSelection.text}` : 'No valid selection yet')
                        }}
                    </p>
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
