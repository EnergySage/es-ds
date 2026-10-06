<script setup lang="ts">
import type { SampleAutocompleteAddress } from '~/utils/autocomplete-sample-items';

// fruit example
const fruitQuery = ref('');
const fruitSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const handleFruitComplete = (query: string) => {
    fruitSuggestions.value = autocompleteFilterTermsSimple(query, SAMPLE_LIST_OF_FRUIT);
};

// icon example
const iconQuery = ref('');
const iconSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const iconLookup: Record<string, IconMetadata> = BASE_ICONS.reduce(
    (result: Record<string, IconMetadata>, iconData: IconMetadata) => {
        result[iconData.name] = iconData;
        return result;
    },
    {},
);
const iconNames: string[] = BASE_ICONS.map((iconData: IconMetadata) => iconData.name);
const handleIconComplete = (query: string) => {
    iconSuggestions.value = autocompleteFilterTermsSimple(query, iconNames);
};

// address example
const addressQuery = ref('');
const addressSelection = ref<EsAutocompleteSuggestion | null>(null);
const addressState = ref<boolean | null>(null);
const addressSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const handleAddressComplete = (query: string) => {
    addressSuggestions.value = filterAddresses(query);
};
const validateAddress = () => {
    addressState.value = addressSelection.value ? null : false;
};
const handleAddressBlur = () => validateAddress();
const handleAddressSubmit = () => validateAddress();
const handleAddressSelect = (suggestion: EsAutocompleteSuggestion) => {
    addressSelection.value = suggestion || null;
    addressState.value = null;
};
watch(addressQuery, (query) => {
    // if the query has changed, clear out any previously selected value
    if (addressSelection.value && query !== addressSelection.value.text) {
        addressSelection.value = null;
    }

    // if the field was previously invalid, clear the invalid state
    if (addressState.value === false) {
        addressState.value = null;
    }
});

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
    return splitEsAutocompleteTextLines([address.street, address.cityStateZip], query);
};

// long text example
const longTextQuery = ref('');
const longTextSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const handleLongTextComplete = (query: string) => {
    longTextSuggestions.value = autocompleteFilterTermsSimple(query, SAMPLE_LIST_OF_SEARCH_TERMS);
};

// error state example
const errorQuery = ref('');
const errorQueryWithValue = ref('banana');
const errorSuggestions = ref<EsAutocompleteSuggestion[]>([]);
const onErrorComplete = (query: string) => {
    errorSuggestions.value = autocompleteFilterTermsSimple(query, SAMPLE_LIST_OF_FRUIT);
};
const errorWithValueErrorMessage = computed(() => {
    if (!errorQueryWithValue.value) {
        return 'Please enter a value.';
    }
    if (errorQueryWithValue.value.trim().toLowerCase() === 'banana') {
        return 'Please enter something other than banana.';
    }
    return '';
});
const errorWithValueState = computed(() => (errorWithValueErrorMessage.value ? false : null));

// Disabled example
const disabledQuery = ref('');

const autocompleteRequiredProps = [
    [
        'label',
        'String',
        'n/a',
        `
        Required. Label text for the input. Also used as the accessible title of the mobile takeover.
        `,
    ],
    [
        'suggestions',
        'Array',
        'n/a',
        `
        Required. Array of suggestion objects to display, each with id and text keys and an optional value key.
        `,
    ],
];

const autocompleteOptionalProps = [
    [
        'autoSelect',
        'Boolean',
        'false',
        `
        Makes the top suggestion active and auto-fills it into the input as the user types. The active suggestion
        is accepted as the value when they leave the field.
        `,
    ],
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
        '300 (700 with autoSelect)',
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
        'helpText',
        'String',
        'Type your search and select from dropdown suggestions.',
        `
        Hint read out by screen readers when the input takes focus.
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
        suggestions displayed (after the display cap and the row trim). An empty result
        announces noResultsText instead.
        `,
    ],
    [
        'triggerHelpText',
        'String',
        'Opens a search with suggestions as you type.',
        `
        Hint read out by screen readers for the trigger field on mobile (which opens the full screen
        takeover on tap rather than taking text directly).
        `,
    ],
];

const autocompleteEvents = [
    [
        'blur',
        '—',
        `
        Emitted when the user leaves the field (e.g. focus moving to another control, a click outside) so
        form validation can occur.
        `,
    ],
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
                This example asks you to select your favorite fruit and provides suggestions as you type. You can enter
                any fruit, but the suggestions give you optional assistance for faster text entry.
            </p>
            <p>
                Note that the suggested completion text (e.g. "anana" in "banana" if you type "b") is bolded in the
                list of suggestions, making it easy to scan the list for the completion you want.
            </p>
            <p>
                To avoid overwhelming you with options, the autocomplete displays a maximum of five suggestions at a
                time. If you type "p", you won't initially see "pomegranate" listed, but if you type "po", you will.
            </p>
            <es-row>
                <es-col md="6">
                    <es-autocomplete
                        v-model="fruitQuery"
                        label="Favorite fruit"
                        :suggestions="fruitSuggestions"
                        @complete="handleFruitComplete" />
                </es-col>
            </es-row>
            <p class="text-break text-muted">
                {{ `value: ${fruitQuery || '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Custom rendering</h2>
            <p>
                It's often important to be able to display more than just text for each suggestion. In this case, since
                the suggestions are names of icons, it's useful to display the icon next to the name.
            </p>
            <p>
                To give you this control but still make the completion text bold for easy scanning, we provide a
                component that handles the bolding for you. It's recommended to use this component whenever displaying
                suggestion text.
            </p>
            <es-row>
                <es-col md="6">
                    <es-autocomplete
                        v-model="iconQuery"
                        label="Favorite icon name"
                        :suggestions="iconSuggestions"
                        @complete="handleIconComplete">
                        <template #item="{ suggestion, query }">
                            <div class="align-items-center d-flex">
                                <component
                                    :is="iconLookup[suggestion.text]?.component"
                                    class="mr-50" />
                                <es-autocomplete-suggestion-text
                                    :text="suggestion.text"
                                    :query="query" />
                            </div>
                        </template>
                    </es-autocomplete>
                </es-col>
            </es-row>
            <p class="text-break text-muted">
                {{ `value: ${iconQuery || '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Requiring a selection from the list</h2>
            <p>
                When you need one of the suggestions to be chosen (e.g. to guarantee only a validated address gets
                submitted), it's recommended to mark the autocomplete as required and enable auto-select. You can also
                take full control of validation to show an error exactly when needed.
            </p>
            <p>
                With auto-select, the top suggestion becomes active and auto-fills into the input as you type. If you
                leave the input, the active suggestion is automatically accepted and becomes the value of the input
                field.
            </p>
            <p>
                In most cases, especially for screen readers, this can facilitate easier address entry. In the rare
                case where the wrong suggestion is chosen based on the text you've entered, you have a chance to review
                and correct the selection before submitting the form.
            </p>
            <es-form
                class="mb-100 mb-md-0"
                novalidate
                @submit.stop.prevent="handleAddressSubmit">
                <es-row>
                    <es-col md="6">
                        <es-autocomplete
                            v-model="addressQuery"
                            auto-select
                            label="Address"
                            placeholder="Search for your address"
                            required
                            :state="addressState"
                            :suggestions="addressSuggestions"
                            @blur="handleAddressBlur"
                            @complete="handleAddressComplete"
                            @select="handleAddressSelect">
                            <template #item="{ suggestion, query }">
                                <es-autocomplete-suggestion-text
                                    v-for="(lineSegments, lineIndex) in splitAddressLines(suggestion, query)"
                                    :key="lineIndex"
                                    class="d-block"
                                    :class="{ 'font-size-50': lineIndex === 1 }"
                                    :segments="lineSegments" />
                            </template>
                            <template #errorMessage> Please select an address from the suggestions. </template>
                        </es-autocomplete>
                    </es-col>
                    <es-col md="6">
                        <es-button
                            class="mt-md-200 px-md-300 w-100 w-md-auto"
                            type="submit">
                            Submit
                        </es-button>
                    </es-col>
                </es-row>
            </es-form>
            <p class="text-break text-muted">
                {{ `value: ${addressSelection ? addressSelection.text : '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Hidden label and limited width</h2>
            <p>
                In some cases, an autocomplete may appear in a narrow width layout. The suggestions list on desktop,
                however, is not constrained by this width. Try searching for "solar" or "heat pump".
            </p>
            <p>
                The label for the autocomplete is also hidden visually here, but will still be announced by screen
                readers.
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
                    <es-button class="ml-100 px-md-300 px-xl-200 px-xxl-400 text-nowrap w-50 w-md-auto">
                        Shop local offers
                    </es-button>
                </es-col>
            </es-row>
            <p class="text-break text-muted">
                {{ `value: ${longTextQuery || '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Error state</h2>
            <es-row>
                <es-col md="6">
                    <es-autocomplete
                        id="autocomplete-error"
                        v-model="errorQuery"
                        label="Favorite fruit"
                        placeholder="Search for a fruit"
                        required
                        :state="errorQuery ? null : false"
                        :suggestions="errorSuggestions"
                        @complete="onErrorComplete">
                        <template #errorMessage> Please enter a search term. </template>
                    </es-autocomplete>
                    <es-autocomplete
                        id="autocomplete-error-with-value"
                        v-model="errorQueryWithValue"
                        label="Favorite fruit"
                        placeholder="Search for a fruit"
                        required
                        :state="errorWithValueState"
                        :suggestions="errorSuggestions"
                        @complete="onErrorComplete">
                        <template #errorMessage> {{ errorWithValueErrorMessage }} </template>
                    </es-autocomplete>
                </es-col>
            </es-row>
        </div>

        <div class="mb-500">
            <h2>Message</h2>
            <es-row>
                <es-col md="6">
                    <es-autocomplete
                        v-model="fruitQuery"
                        label="Favorite fruit"
                        placeholder="Search for a fruit"
                        :suggestions="fruitSuggestions"
                        @complete="handleFruitComplete">
                        <template #message> We will send you one of these every month. </template>
                    </es-autocomplete>
                </es-col>
            </es-row>
            <p class="text-break text-muted">
                {{ `value: ${fruitQuery || '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>Disabled state</h2>
            <es-row>
                <es-col md="6">
                    <es-autocomplete
                        id="autocomplete-disabled"
                        v-model="disabledQuery"
                        disabled
                        label="Favorite fruit"
                        placeholder="Search for a fruit"
                        :suggestions="[]" />
                </es-col>
            </es-row>
        </div>

        <div class="mb-500">
            <h2>Focus overlay</h2>
            <p>
                When the autocomplete is being used as a navigation tool, for example in a site search, it can be
                helpful to minimize other distractions on the page to allow the user to focus on selecting the right
                option. This focus overlay accomplishes that by dimming the rest of the page when the autocomplete is
                open.
            </p>
            <es-row>
                <es-col md="6">
                    <es-autocomplete
                        v-model="longTextQuery"
                        label="Search"
                        label-sr-only
                        placeholder="Search for a topic"
                        show-overlay-on-focus
                        :suggestions="longTextSuggestions"
                        @complete="handleLongTextComplete" />
                </es-col>
            </es-row>
            <p class="text-break text-muted">
                {{ `value: ${longTextQuery || '[empty]'}` }}
            </p>
        </div>

        <div class="mb-500">
            <h2>EsAutocomplete props</h2>
            <h3>Required</h3>
            <ds-prop-table :rows="autocompleteRequiredProps" />
            <h3>Optional</h3>
            <ds-prop-table :rows="autocompleteOptionalProps" />
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
