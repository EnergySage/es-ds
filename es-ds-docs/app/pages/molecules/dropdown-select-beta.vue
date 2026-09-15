<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('../../components/es-dropdown-select-beta.vue?raw');

        const docSource = await import('./dropdown-select-beta.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const selectedFruit = ref<string>('');
const selectedTropicalFruit = ref<string>('');
const selectedColor = ref<string>('');
const selectedSize = ref<string>('');
const selectedContinent = ref<string>('');

const selectedState = ref<string>('');

const fruits = [
    'Apple',
    'Banana',
    'Grape',
    'Orange',
    'This is a really long example to show that the dropdown can handle long text options',
];

const tropicalFruits = ['Mango', 'Papaya', 'Pineapple', 'Coconut'];

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const continents = [
    {
        label: 'Africa',
        value: 'africa',
    },
    {
        label: 'Antarctica',
        value: 'antarctica',
    },
    {
        label: 'Asia',
        value: 'asia',
    },
    {
        label: 'Europe',
        value: 'europe',
    },
    {
        label: 'North America',
        value: 'north_america',
    },
    {
        label: 'South America',
        value: 'south_america',
    },
];

const dropdownProps = [
    [
        'disabled',
        'Boolean',
        'false',
        `
        When disabled, the dropdown has a gray background and cannot be interacted with.
        `,
    ],
    [
        'label',
        'String',
        'Select an option',
        `
        Text to display above dropdown. When not specified, the label will be hidden and default to "Select an option" for accessibility purposes.
        `,
    ],
    [
        'noOptionsText',
        'String',
        'No available options',
        `
        Placeholder text to display when there are no options to select from.
        `,
    ],
    [
        'options',
        'Array',
        '[]',
        `
        Array of options to display in the dropdown. Can be an array of strings or objects with 'label' and 'value' properties.
        `,
    ],
    [
        'placeholder',
        'String',
        'n/a',
        `
        Text to display inside dropdown when no option is selected.
        `,
    ],
    [
        'required',
        'Boolean',
        'false',
        `
        When true, a red asterisk is displayed next to the label.
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
];
</script>

<template>
    <div>
        <h1>Dropdown select (beta)</h1>
        <p class="mb-500">Uses native select element</p>

        <div class="mb-500">
            <h2>Basic example</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedFruit"
                        label="Select a fruit"
                        placeholder="Choose a fruit"
                        :options="fruits" />
                    <p class="text-muted">Selected: {{ selectedFruit || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Disabled</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedColor"
                        label="Disabled dropdown"
                        placeholder="This dropdown is disabled"
                        :options="colors"
                        disabled />
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Native select with custom styling</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedFruit"
                        label="Select a fruit"
                        :options="fruits"
                        placeholder="Choose a fruit" />
                </div>
            </div>
            <!--<div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedLetter"
                        label="Select a letter from a short list"
                        :options="['a', 'b', 'c']"
                        placeholder="Choose a letter" />
                </div>
            </div>-->
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedState"
                        label="Select a state"
                        :options="SAMPLE_LIST_OF_US_STATES"
                        placeholder="Choose a state" />
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Hidden label</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedColor"
                        :options="colors" />
                    <p class="text-muted">Selected: {{ selectedColor || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Options label different from value</h2>
            <p>
                You can also pass in an array of objects to the <code>options</code> prop with <code>label</code> and
                <code>value</code> keys. The <code>label</code> property will be displayed in the dropdown, while the
                <code>value</code> property will be used as the model value.
            </p>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedContinent"
                        label="Select your continent"
                        :options="continents" />
                    <p class="text-muted">Selected: {{ selectedContinent || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>No options</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedSize"
                        no-options-text="No sizes available"
                        :options="[]" />
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>No placeholder</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedSize"
                        label="Select a size"
                        :options="sizes" />
                    <p class="text-muted">Selected: {{ selectedSize || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Required</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedFruit"
                        label="Select a fruit"
                        placeholder="Choose a fruit"
                        :options="fruits"
                        required />
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Error state</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select-beta
                        v-model="selectedTropicalFruit"
                        label="Select a tropical fruit"
                        placeholder="Choose a fruit"
                        required
                        :options="tropicalFruits"
                        :state="!!selectedTropicalFruit">
                        <template #errorMessage> Please select an option from the dropdown. </template>
                    </es-dropdown-select-beta>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>EsDropdownSelect props</h2>
            <ds-prop-table :rows="dropdownProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-dropdown-select.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/dropdown-select.vue" />
    </div>
</template>
