<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-dropdown-select.vue?raw');

        const docSource = await import('./dropdown-select.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const selectedFruit = ref<string | undefined>(undefined);
const selectedColor = ref<string | undefined>(undefined);
const selectedSize = ref<string | undefined>(undefined);
const selectedContinent = ref<{ label: string; value: string } | undefined>(undefined);

const fruits = ['Apple', 'Banana', 'Orange', 'Grape'];

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
        'label',
        'String',
        'n/a',
        `
        Required. Text to display above dropdown
        `,
    ],
    [
        'placeholder',
        'String',
        'n/a',
        `
        Text to display inside dropdown before it is clicked.
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
        'disabled',
        'Boolean',
        'false',
        `
        When disabled, the dropdown has a gray background and cannot be interacted with.
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
        <h1>Dropdown select</h1>
        <p class="mb-500">
            Extended from
            <nuxt-link
                to="https://v3.primevue.org/dropdown/"
                target="_blank">
                PrimeVue Dropdown
            </nuxt-link>
        </p>

        <div class="mb-500">
            <h2>Basic example</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select
                        v-model="selectedFruit"
                        label="Select a fruit"
                        placeholder="Choose a fruit"
                        :options="fruits" />
                    <p class="mt-3 text-muted">Selected: {{ selectedFruit || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Required</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select
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
                    <es-dropdown-select
                        v-model="selectedFruit"
                        label="Select a fruit"
                        placeholder="Choose a fruit"
                        required
                        :options="fruits"
                        :state="!!selectedFruit">
                        <template #errorMessage> Please select an option from the dropdown. </template>
                    </es-dropdown-select>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>No placeholder</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select
                        v-model="selectedSize"
                        label="Select a size"
                        :options="sizes" />
                    <p class="mt-3 text-muted">Selected: {{ selectedSize || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Hidden label</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select
                        v-model="selectedColor"
                        :options="colors" />
                    <p class="mt-3 text-muted">Selected: {{ selectedColor || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>Disabled</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown-select
                        v-model="selectedColor"
                        label="Disabled dropdown"
                        placeholder="This dropdown is disabled"
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
                    <es-dropdown-select
                        v-model="selectedContinent"
                        label="Select your continent"
                        :options="continents" />
                    <p class="mt-3 text-muted">Selected: {{ selectedContinent?.value || 'None' }}</p>
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
