<script setup lang="ts">
const propTableRows = ref([
    ['disabled', 'Boolean', 'false', 'Disables the toggle.'],
    ['ariaLabel', 'String', 'undefined', 'Accessible label for toggle.'],
    ['label', 'String', "''", 'Optional label to display below toggle.'],
]);
const slotTableRows = ref([['text', 'n/a', 'Optional text to display to the right of the toggle.']]);

const checked = ref(true);
const disabledChecked = ref(true);
const dynamicToggle = ref(false);

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-toggle.vue?raw');

        const docSource = await import('./toggle.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Toggle</h1>
        <p>
            Extended from
            <nuxt-link
                href="https://reka-ui.com/docs/components/switch/"
                target="_blank">
                Reka UI Switch
            </nuxt-link>
        </p>

        <div class="my-500">
            <h2>No text</h2>
            <es-toggle class="mb-100" />
            <es-toggle
                v-model="checked"
                class="mb-100" />
        </div>
        <div class="my-500">
            <h2>With label</h2>
            <es-toggle
                class="mb-100"
                label="ON" />
            <es-toggle
                v-model="dynamicToggle"
                class="mb-100"
                :label="dynamicToggle ? 'YES' : 'NO'" />
        </div>
        <div class="my-500">
            <h2>With text</h2>
            <es-toggle class="mb-300">
                <template #text>
                    <p class="mb-0">Add a battery (avg cost is $13k)</p>
                </template>
            </es-toggle>
            <es-toggle class="mb-300">
                <template #text>
                    <p class="mb-0 font-size-100">Marketing emails</p>
                    <p class="mb-0 font-size-75">Receive updates about new features and promotions</p>
                </template>
            </es-toggle>
            <es-toggle class="mb-300">
                <template #text>
                    <p class="mb-0 font-size-100">Two-factor authentication</p>
                    <p class="mb-0 font-size-75 font-weight-bold">Add an extra layer of security to your account</p>
                </template>
            </es-toggle>
        </div>
        <div class="my-500">
            <h2>Disabled</h2>
            <es-toggle
                class="mb-300"
                disabled />
            <es-toggle
                v-model="disabledChecked"
                class="mb-300"
                disabled />
        </div>

        <div class="my-500">
            <h2>EsToggle props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <div class="my-500">
            <h2>EsToggle slots</h2>
            <ds-prop-table
                :columns="['Name', 'Default', 'Description']"
                :rows="slotTableRows"
                :widths="{
                    md: ['3', '4', '5'],
                }" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-toggle.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/toggle.vue" />
    </div>
</template>
