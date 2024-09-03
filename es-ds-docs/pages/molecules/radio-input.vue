<template>
    <div>
        <h1>
            Radio button API tests
        </h1>

        <div class="my-500">
            <h2>Test 1 - Radio Input Group</h2>
            <es-radio-input-group
                id="radioGroup1"
                label="Individual radios">
                <es-radio-input
                    displayName="Option A"
                    value="A"
                    v-model="selected"
                    group-name="some-radios">
                </es-radio-input>
                <es-radio-input
                    displayName="Option B"
                    value="B"
                    v-model="selected"
                    group-name="some-radios">
                </es-radio-input>
            </es-radio-input-group>
<pre>
selected: {{ selected }}
</pre>
        </div>

        <div class="my-500">
            <h2>Test 2 - Grouped Radios</h2>
            <es-radio-input-group
                id="test2RadioGroup"
                label="Radios using options"
                v-model="test2Selected"
                :options="test2Options"
                name="test2" />
        </div>
<pre>
selected: {{ test2Selected }}
</pre>

        <hr />

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
            <es-radio-input-group
                id="idFruits"
                label="Please choose your favorite fruit."
                v-slot="{ ariaDescribedby }"
            >
                <es-radio-input
                    v-for="fruit in fruits"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    group-name="inline"
                    :value="fruit.key"
                    :aria-describedby="ariaDescribedby"
                    inline />
            </es-radio-input-group>
        </div>

        <div class="my-500">
            <h2>
                Stacked
            </h2>
            <fieldset>
                <legend class="font-size-100">Please choose your favorite fruit.</legend>
                <es-radio-input
                    v-for="fruit in fruits"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    group-name="stacked"
                    :value="fruit.key" />
            </fieldset>
        </div>

        <div class="my-500">
            <h2>
                Disabled
            </h2>
            <fieldset>
                <legend class="font-size-100">Please choose your favorite fruit.</legend>
                <es-radio-input
                    v-for="fruit in fruits"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    group-name="disabled"
                    :value="fruit.key"
                    disabled />
            </fieldset>
        </div>

        <div class="mb-500">
            <h2>
                EsRadioInput props
            </h2>
            <ds-prop-table
                :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-radio-input.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/radio-input.vue" />
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
const docCode = ref("");

const ariaDescribedby = ref("legend-radioGroup1");
const selected = ref("");

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const compSource = await import('@energysage/es-ds-components/components/es-radio-input.vue?raw');
    const docSource = await import("./radio-input.vue?raw");
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

const propTableRows = [
    [
        'disabled',
        'Boolean',
        'false',
        'When present, it specifies that the radio button should be disabled.',
    ],
    [
        'inline',
        'Boolean',
        'false',
        'When present, it specifies that the radio buttons should be displayed inline.',
    ],
    [
        'v-model',
        'String',
        'n/a',
        'Required. The v-model directive binds the radio button to a data property.',
    ],
    [
        'display-name',
        'String',
        'n/a',
        'Required. The text to display next to the radio button.',
    ],
    [
        'value',
        'String',
        'n/a',
        'Required. The value to be used by v-model.',
    ],
    [
        'group-name',
        'String',
        "''",
        'Descriptive name of the radio button group. Optional but should be used if multiple groups '
        + 'use the same v-model.',
    ],
];

const test2Options = [
    { text: 'Toggle this custom radio', value: 'first' },
    { text: 'Or toggle this other custom radio', value: 'second' },
    { text: 'This one is Disabled', value: 'third', disabled: true },
    { text: 'This is the 4th radio', value: { fourth: 4 } }
];
const test2Selected = ref('first');
</script>
