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
            <div>
                <div v-for="fruit in fruits" class="custom-control custom-control-inline custom-radio">
                    <RadioButton
                        class="custom-control-input"
                        inputClass="custom-radio-input"
                        v-model="selectedFruit"
                        :inputId="`${fruit.key}-inline`"
                        name="inline"
                        :value="fruit.name" />
                    <label :for="`${fruit.key}-inline`" class="custom-control-label">{{ fruit.name }}</label>
                </div>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Stacked
            </h2>
            <p>
                Please choose your favorite fruit.
            </p>
            <div>
                <div v-for="fruit in fruits" class="custom-control custom-radio">
                    <RadioButton
                        class="custom-control-input"
                        inputClass="custom-radio-input"
                        v-model="selectedFruit"
                        :inputId="`${fruit.key}-stacked`"
                        name="stacked"
                        :value="fruit.name" />
                    <label :for="`${fruit.key}-stacked`" class="custom-control-label">{{ fruit.name }}</label>
                </div>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Disabled
            </h2>
            <p>
                Please choose your favorite fruit.
            </p>
            <div>
                <div v-for="fruit in fruits" class="custom-control custom-radio">
                    <RadioButton
                        disabled
                        class="custom-control-input"
                        inputClass="custom-radio-input"
                        v-model="selectedFruit"
                        :inputId="`${fruit.key}-disabled`"
                        name="disabled"
                        :value="fruit.name" />
                    <label :for="`${fruit.key}-disabled`" class="custom-control-label">{{ fruit.name }}</label>
                </div>
            </div>
        </div>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/radio-button.vue" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedFruit = ref('');
const fruits = ref([
    { name: 'Apple', key: 'A' },
    { name: 'Banana', key: 'M' },
    { name: 'Cherry', key: 'P' },
]);

const { $prism } = useNuxtApp();
const docCode = ref("");

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const docSource = await import("./radio-button.vue?raw");
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>
