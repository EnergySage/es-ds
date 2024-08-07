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
            <div>
                <div class="custom-control custom-control-inline custom-radio">
                    <RadioButton class="custom-control-input" inputClass="custom-radio-input" v-model="fruit" inputId="fruit1" value="apple" />
                    <label for="fruit1" class="custom-control-label">Apple</label>
                </div>
                <div class="custom-control custom-control-inline custom-radio">
                    <RadioButton class="custom-control-input" inputClass="custom-radio-input" v-model="fruit" inputId="fruit2" value="banana" />
                    <label for="fruit2" class="custom-control-label">Banana</label>
                </div>
                <div class="custom-control custom-control-inline custom-radio">
                    <RadioButton class="custom-control-input" inputClass="custom-radio-input" v-model="fruit" inputId="fruit3" value="cherry" />
                    <label for="fruit3" class="custom-control-label">Cherry</label>
                </div>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Stacked
            </h2>
            <div>
                <div class="custom-control custom-radio">
                    <RadioButton class="custom-control-input" inputClass="custom-radio-input" v-model="fruit" inputId="fruit1" value="apple" />
                    <label class="custom-control-label" for="fruit1">Apple</label>
                </div>
                <div class="custom-control custom-radio">
                    <RadioButton class="custom-control-input" inputClass="custom-radio-input" v-model="fruit" inputId="fruit2" value="banana" />
                    <label class="custom-control-label" for="fruit2">Banana</label>
                </div>
                <div class="custom-control custom-radio">
                    <RadioButton class="custom-control-input" inputClass="custom-radio-input" v-model="fruit" inputId="fruit3" value="cherry" />
                    <label class="custom-control-label" for="fruit3">Cherry</label>
                </div>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Disabled
            </h2>
            <div>
                <div class="custom-control custom-radio">
                    <RadioButton class="custom-control-input" inputClass="custom-radio-input" disabled v-model="fruit" inputId="fruit1" value="apple" />
                    <label class="custom-control-label" for="fruit1">Apple</label>
                </div>
                <div class="custom-control custom-radio">
                    <RadioButton class="custom-control-input" inputClass="custom-radio-input" disabled v-model="fruit" inputId="fruit2" value="banana" />
                    <label class="custom-control-label" for="fruit2">Banana</label>
                </div>
                <div class="custom-control custom-radio">
                    <RadioButton class="custom-control-input" inputClass="custom-radio-input" disabled v-model="fruit" inputId="fruit3" value="cherry" />
                    <label class="custom-control-label" for="fruit3">Cherry</label>
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

const fruit = ref('');

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
