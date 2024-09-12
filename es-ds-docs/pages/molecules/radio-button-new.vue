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
</script>

<template>
    <div>
        <div class="my-500">
            <h2>Basic Radio Button</h2>
            <es-radio-button-new
                v-for="fruit in fruits"
                :id="`id_${fruit.key}1`"
                :key="fruit.key"
                v-model="selectedFruit"
                name="basic"
                :value="fruit.key"
                >{{ fruit.name }}</es-radio-button-new
            >
        </div>

        <div class="my-500">
            <h2>Inline</h2>
            <es-radio-button-group-new
                id="idFruitsInline"
                label="Please choose your favorite fruit.">
                <es-radio-button-new
                    v-for="fruit in fruits"
                    :id="`id_${fruit.key}2`"
                    :key="fruit.key"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    name="inline"
                    :value="fruit.key"
                    inline />
            </es-radio-button-group-new>
        </div>

        <div class="my-500">
            <h2>Stacked</h2>
            <es-radio-button-group-new
                id="idFruitsStacked"
                label="Please choose your favorite fruit.">
                <es-radio-button-new
                    v-for="fruit in fruits"
                    :id="`id_${fruit.key}3`"
                    :key="fruit.key"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    name="stacked"
                    :value="fruit.key" />
            </es-radio-button-group-new>
        </div>

        <div class="my-500">
            <h2>Disabled</h2>
            <es-radio-button-group-new
                id="idFruitsDisabled"
                label="Please choose your favorite fruit.">
                <es-radio-button-new
                    v-for="fruit in fruits"
                    :id="`id_${fruit.key}4`"
                    :key="fruit.key"
                    v-model="selectedFruit"
                    :display-name="fruit.name"
                    name="disabled"
                    :value="fruit.key"
                    disabled />
            </es-radio-button-group-new>
        </div>

        <div class="my-500">
            <h2>Using options prop</h2>
            <es-radio-button-group-new
                id="idRadioGroupUsingOptionsProp"
                v-model="test2Selected"
                :options="test2Options"
                label="Radios using options"
                name="radioGroupUsingOptionsProp" />
            <div>selected: {{ test2Selected }}</div>
        </div>
    </div>
</template>
