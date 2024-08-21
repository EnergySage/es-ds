<template>
    <div>
        <h1>
            Radio button
        </h1>
        <p class="mb-500">
            Uses <a
                href="https://v3.primevue.org/radiobutton/"
                target="_blank">
                PrimeVue RadioButton
            </a>
        </p>

        <div class="my-500">
            <h2>
                Inline
            </h2>
            <p>
                Please choose your favorite fruit.
            </p>
            <es-radio-button
                v-for="fruit in fruits"
                v-model="selectedFruit"
                :display-name="fruit.name"
                group-name="inline"
                :value="fruit.key"
                inline />
        </div>

        <div class="my-500">
            <h2>
                Stacked
            </h2>
            <p>
                Please choose your favorite fruit.
            </p>
            <es-radio-button
                v-for="fruit in fruits"
                v-model="selectedFruit"
                :display-name="fruit.name"
                group-name="stacked"
                :value="fruit.key" />
        </div>

        <div class="my-500">
            <h2>
                Disabled
            </h2>
            <p>
                Please choose your favorite fruit.
            </p>
            <es-radio-button
                v-for="fruit in fruits"
                v-model="selectedFruit"
                :display-name="fruit.name"
                group-name="disabled"
                :value="fruit.key"
                disabled />
        </div>

        <div class="mb-500">
            <h2>
                EsCollapse props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="tableWidths" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-radio-button.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/radio-button.vue" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedFruit = ref('banana');
const fruits = ref([
    { name: 'Apple', key: 'apple' },
    { name: 'Banana', key: 'banana' },
    { name: 'Cherry', key: 'cherry' },
]);

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const compSource = await import('@energysage/es-ds-components/components/es-radio-button.vue?raw');
    const docSource = await import('./radio-button.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

const propTableRows = [
    [
        'disabled',
        'false',
        'When present, it specifies that the radio button should be disabled.',
    ],
    [
        'inline',
        'false',
        'When present, it specifies that the radio buttons should be displayed inline.',
    ],
    [
        'v-model',
        'n/a',
        'Required. The v-model directive binds the radio button to a data property.',
    ],
    [
        'display-name',
        'n/a',
        'Required. The text to display next to the radio button.',
    ],
    [
        'value',
        'n/a',
        'Required. The value to be used by v-model.',
    ],
    [
        'group-name',
        '""',
        'Descriptive name of the radio button group. Optional but should be used if multiple groups '
        + 'use the same v-model.',
    ],
];

const tableWidths = {
    md: ['4', '3', '5'],
    lg: ['4', '3', '5'],
};
</script>
