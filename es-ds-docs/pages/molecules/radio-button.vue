<script setup lang="ts">
import { ref } from 'vue';

const selectedFruit = ref('banana');
const fruits = ref([
    { name: 'Apple', key: 'apple' },
    { name: 'Banana', key: 'banana' },
    { name: 'Cherry', key: 'cherry' },
]);
const test2Options = [
    { text: 'Toggle this custom radio', value: 'first' },
    { text: 'Or toggle this other custom radio', value: 'second' },
    { text: 'This one is Disabled', value: 'third', disabled: true },
    { text: 'This is the 4th radio', value: { fourth: 4 } },
];
const test2Selected = ref('first');

// Name, Type, Default, Description
const radioButtonPropTableRows = [
    ['disabled', 'Boolean', 'false', 'When present, it specifies that the radio button should be disabled.'],
    ['inline', 'Boolean', 'false', 'When present, it specifies that the radio buttons should be displayed inline.'],
    ['v-model', 'Any', 'n/a', 'Required. The v-model directive binds the radio button to a data property.'],
    ['display-name', 'String', 'n/a', 'Required. The text to display next to the radio button.'],
    ['value', 'Any', 'n/a', 'Required. The value to be used by v-model.'],
    [
        'group-name',
        'String',
        "''",
        'Descriptive name of the radio button group. Optional but should be used if multiple groups ' +
            'use the same v-model.',
    ],
];

// Name, Type, Default, Description
const radioButtonGroupPropTableRows = [
    ['id', 'String', '', 'Required.'],
    ['label', 'String', '', 'Required. Corresponds to the legend value describing the group'],
    ['name', 'String', '', 'Optional. Maps to the group name for each radio input'],
    [
        'options',
        'Array',
        '',
        'Optional. Must provide if not using the default slot. Allows radio input values to be passed as an array.',
    ],
    ['inline', 'Boolean', 'false', 'Optional. Attribute is passed down to children when using the options attribute'],
];

const { $prism } = useNuxtApp();
const radioButtonComponentCode = ref('');
const radioButtonGroupComponentCode = ref('');
const docCode = ref('');
if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const radioButtonComponentSource = await import('@energysage/es-ds-components/components/es-radio-button.vue?raw');
    // eslint-disable-next-line max-len
    const radioButtonGroupComponentSource = await import(
        '@energysage/es-ds-components/components/es-radio-button-group.vue?raw'
    );
    const docSource = await import('./radio-button.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    radioButtonComponentCode.value = $prism.normalizeCode(radioButtonComponentSource.default);
    radioButtonGroupComponentCode.value = $prism.normalizeCode(radioButtonGroupComponentSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<template>
    <div>
        <p class="mb-500">
            Uses
            <a
                href="https://v3.primevue.org/radiobutton/"
                target="_blank">
                PrimeVue RadioButton
            </a>
        </p>

        <div class="my-500">
            <h2>Inline</h2>
            <es-radio-button-group
                id="idFruits"
                label="Please choose your favorite fruit.">
                <es-radio-button
                    v-for="fruit in fruits"
                    :key="fruit.key"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    group-name="inline"
                    :value="fruit.key"
                    inline />
            </es-radio-button-group>
        </div>

        <div class="my-500">
            <h2>Stacked</h2>
            <es-radio-button-group
                id="idFruits2"
                label="Please choose your favorite fruit.">
                <es-radio-button
                    v-for="fruit in fruits"
                    :key="fruit.key"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    group-name="stacked"
                    :value="fruit.key" />
            </es-radio-button-group>
        </div>

        <div class="my-500">
            <h2>Disabled</h2>
            <es-radio-button-group
                id="idFruits3"
                label="Please choose your favorite fruit.">
                <es-radio-button
                    v-for="fruit in fruits"
                    :key="fruit.key"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    group-name="disabled"
                    :value="fruit.key"
                    disabled />
            </es-radio-button-group>
        </div>

        <div class="my-500">
            <h2>Using Options Prop</h2>
            <es-radio-button-group
                id="test2RadioGroup"
                v-model="test2Selected"
                label="Radios using options"
                :options="test2Options"
                name="test2" />

            <div>selected: {{ test2Selected }}</div>
        </div>

        <div class="mb-500">
            <h2>EsRadioButton props</h2>
            <ds-prop-table :rows="radioButtonPropTableRows" />
        </div>

        <div class="mb-500">
            <h2>EsRadioButtonGroup props</h2>
            <ds-prop-table :rows="radioButtonGroupPropTableRows" />
        </div>

        <ds-doc-source
            comp-title="Radio Button Component"
            :comp-code="radioButtonComponentCode"
            comp-source="es-ds-components/src/lib-components/es-radio-button.vue" />

        <ds-doc-source
            comp-title="Radio Button Group Component"
            :comp-code="radioButtonGroupComponentCode"
            comp-source="es-ds-components/src/lib-components/es-radio-button-group.vue" />

        <ds-doc-source
            doc-title="Radio Button & Group Documentation"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/radio-input.vue" />
    </div>
</template>
