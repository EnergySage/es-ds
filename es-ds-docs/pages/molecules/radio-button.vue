<script setup lang="ts">
const selectedFruit = ref('banana');
const fruits = ref([
    { name: 'Apple', key: 'apple', id: 'id_apple' },
    { name: 'Banana', key: 'banana', id: 'id_banana' },
    { name: 'Cherry', key: 'cherry', id: 'id_cherry' },
]);
const test2Options = ref([
    { text: 'Toggle this custom radio', value: 'first', id: 'idFirst' },
    { text: 'Or toggle this other custom radio', value: 'second', id: 'idSecond' },
    { text: 'This one is Disabled', value: 'third', disabled: true, id: 'idThird' },
    { text: 'This is the 4th radio', value: { fourth: 4 }, id: 'idFourth' },
]);
const test2Selected = ref('first');

// Name, Type, Default, Description
const radioButtonPropTableRows = [
    ['name', 'String', 'n/a', 'Required. Name of radio group'],
    ['value', 'Any', 'n/a', 'Required. Value of radio button'],
    ['id', 'String', 'n/a', 'Required.'],
    ['disabled', 'Boolean', 'false', 'When present, it specifies that the radio button should be disabled.'],
    ['inline', 'Boolean', 'false', 'When present, it specifies that the radio buttons should be displayed inline.'],
    [
        'displayName',
        'String',
        '',
        'Required, if not using the default slot. The text to display next to the radio button.',
    ],
    ['v-model', 'Any', 'n/a', 'Optional. The v-model directive binds the radio button to a data property.'],
];

// Name, Type, Default, Description
const radioButtonGroupPropTableRows = [
    ['id', 'String', 'n/a', 'Required.'],
    ['label', 'String', 'n/a', 'Required. Corresponds to the legend value describing the group'],
    ['name', 'String', `''`, 'Required, if using the default slot. Maps to the name for each radio input'],
    [
        'options',
        'Array',
        'undefined',
        'Optional. Must provide if not using the default slot. Allows radio input values to be passed as an array.',
    ],
    ['inline', 'Boolean', 'false', 'Optional. Attribute is passed down to children when using the options attribute'],
];

const { $prism } = useNuxtApp();
const radioButtonComponentCode = ref('');
const radioButtonGroupComponentCode = ref('');
const docCode = ref('');
if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import, import/no-unresolved */
    const radioButtonComponentSource = await import('@energysage/es-ds-components/components/es-radio-button.vue?raw');
    // eslint-disable-next-line max-len
    const radioButtonGroupComponentSource = await import(
        '@energysage/es-ds-components/components/es-radio-button-group.vue?raw'
    );
    const docSource = await import('./radio-button.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import, import/no-unresolved */

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
                id="idFruitsInline"
                label="Please choose your favorite fruit.">
                <es-radio-button
                    v-for="fruit in fruits"
                    :id="`id_${fruit.key}2`"
                    :key="fruit.key"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    name="inline"
                    :value="fruit.key"
                    inline />
            </es-radio-button-group>
        </div>

        <div class="my-500">
            <h2>Stacked</h2>
            <es-radio-button-group
                id="idFruitsStacked"
                label="Please choose your favorite fruit.">
                <es-radio-button
                    v-for="fruit in fruits"
                    :id="`id_${fruit.key}3`"
                    :key="fruit.key"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    name="stacked"
                    :value="fruit.key" />
            </es-radio-button-group>
        </div>

        <div class="my-500">
            <h2>Disabled</h2>
            <es-radio-button-group
                id="idFruitsDisabled"
                label="Please choose your favorite fruit.">
                <es-radio-button
                    v-for="fruit in fruits"
                    :id="`id_${fruit.key}4`"
                    :key="fruit.key"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    name="disabled"
                    :value="fruit.key"
                    disabled />
            </es-radio-button-group>
        </div>

        <div class="my-500">
            <h2>Using options prop</h2>
            <es-radio-button-group
                id="idRadioGroupUsingOptionsProp"
                v-model="test2Selected"
                :options="test2Options"
                label="Radios using options"
                name="radioGroupUsingOptionsProp" />
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
            comp-title="Radio button component"
            :comp-code="radioButtonComponentCode"
            comp-source="es-ds-components/src/lib-components/es-radio-button.vue" />

        <ds-doc-source
            comp-title="Radio button group component"
            :comp-code="radioButtonGroupComponentCode"
            comp-source="es-ds-components/src/lib-components/es-radio-button-group.vue" />

        <ds-doc-source
            doc-title="Radio button & radio button group documentation"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/radio-button.vue" />
    </div>
</template>
