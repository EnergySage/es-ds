<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-dropdown-checkbox.vue?raw');

        const docSource = await import('./dropdown-checkbox.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const selectedFruits = ref([]);
const selectedColors = ref([]);
const selectedContinents = ref([]);
const selectedSizes = ref([]);
const selectedDisabled = ref([]);

const fruits = [
    'Apple',
    'Banana',
    'Grape',
    'Orange',
    'Pineapple',
    'Strawberry',
    'Watermelon',
    'Mango',
];

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

const dropdownCheckboxProps = [
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
        "''",
        `
        Text to display above dropdown. When not specified, the label will be hidden and default to "Select options" for accessibility purposes.
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
        'Select options',
        `
        Text to display inside dropdown when no options are selected.
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
        'hasOptions',
        'boolean',
        'true',
        `
        Whether the dropdown has options available.
        `,
    ],
];
</script>

<template>
    <div>
        <h1>Dropdown checkbox</h1>
        <p class="mb-500">
            A multi-select dropdown component that displays a list of checkboxes.
        </p>

        <div class="mb-500">
            <h2>Basic example</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-checkbox
                        v-model="selectedFruits"
                        label="Select fruits"
                        placeholder="Choose fruits"
                        :options="fruits" />
                    <p class="text-muted">Selected: {{ selectedFruits.length ? selectedFruits.join(', ') : 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Disabled</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-checkbox
                        v-model="selectedDisabled"
                        label="Disabled dropdown"
                        :options="colors"
                        disabled />
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
                    <es-dropdown-checkbox
                        v-model="selectedContinents"
                        label="Select continents"
                        :options="continents" />
                    <p class="text-muted">Selected: {{ selectedContinents.length ? selectedContinents.join(', ') : 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Required</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-checkbox
                        v-model="selectedSizes"
                        label="Select sizes"
                        :options="sizes"
                        required />
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Error state</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-checkbox
                        v-model="selectedColors"
                        label="Select colors"
                        placeholder="Choose colors"
                        required
                        :options="colors"
                        :state="selectedColors.length > 0">
                        <template #errorMessage> Please select at least one option. </template>
                    </es-dropdown-checkbox>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>EsDropdownCheckbox props</h2>
            <ds-prop-table :rows="dropdownCheckboxProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-dropdown-checkbox.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/dropdown-checkbox.vue" />
    </div>
</template>
