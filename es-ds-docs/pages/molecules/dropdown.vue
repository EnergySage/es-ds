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
            <es-dropdown title="Basic example">
            </es-dropdown>
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
