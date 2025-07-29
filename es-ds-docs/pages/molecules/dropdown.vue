<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-dropdown.vue?raw');

        const docSource = await import('./dropdown.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const selectedFruit = ref<string | undefined>(undefined);
const selectedColor = ref<string | undefined>(undefined);
const selectedSize = ref<string | undefined>(undefined);

const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry'];

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const dropdownProps = [
    [
        'title',
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
        Array of strings for the dropdown.
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
];
</script>

<template>
    <div>
        <h1>Dropdown</h1>
        <p class="mb-500">
            Extended from
            <nuxt-link
                to="https://v3.primevue.org/dropdown/"
                target="_blank">
                PrimeVue Dropdown
            </nuxt-link>
        </p>

        <div class="mb-500">
            <h2 class="mb-200">Basic example</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown
                        v-model="selectedFruit"
                        title="Select a fruit"
                        placeholder="Choose a fruit..."
                        :options="fruits" />
                    <p class="mt-3 text-muted">Selected: {{ selectedFruit || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2 class="mb-200">No placeholder example</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown
                        v-model="selectedSize"
                        title="Select a size"
                        :options="sizes" />
                    <p class="mt-3 text-muted">Selected: {{ selectedSize || 'None' }}</p>
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2 class="mb-200">Disabled example</h2>
            <div class="row">
                <div class="col-md-6">
                    <es-dropdown
                        v-model="selectedColor"
                        title="Disabled dropdown"
                        placeholder="This dropdown is disabled"
                        :options="colors"
                        disabled />
                </div>
            </div>
        </div>

        <div class="mb-500">
            <h2>EsDropdown props</h2>
            <ds-prop-table :rows="dropdownProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-dropdown.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/dropdown.vue" />
    </div>
</template>
