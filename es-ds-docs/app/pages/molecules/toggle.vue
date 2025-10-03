<script setup lang="ts">
const propTableRows = ref([['disabled', 'Boolean', 'false', 'Disables the toggle.']]);
const slotTableRows = ref([['label', 'n/a', 'Label to display to the right of the toggle.']]);

const disabledChecked = ref(true);

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-toggle.vue?raw');

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
            <es-toggle class="mb-300">
                <template #label>
                    <p class="m-0">Add a battery (avg cost is $13k)</p>
                </template>
            </es-toggle>
            <es-toggle class="mb-300">
                <template #label>
                    <p class="m-0 font-size-100">Marketing emails</p>
                    <p class="m-0 font-size-75">Receive updates about new features and promotions</p>
                </template>
            </es-toggle>
            <es-toggle class="mb-300 outline-me">
                <template #label>
                    <p class="m-0 font-size-100">Two-factor authentication</p>
                    <p class="m-0 font-size-75 font-weight-bold">Add an extra layer of security to your account</p>
                </template>
            </es-toggle>
        </div>
        <div class="my-500">
            <h2>Disabled</h2>
            <es-toggle
                class="mb-300"
                disabled
                ><template #label>
                    <p class="m-0">Add a battery (avg cost is $13k)</p>
                </template></es-toggle
            >
            <es-toggle
                v-model="disabledChecked"
                class="mb-300"
                disabled
                ><template #label>
                    <p class="m-0 font-size-100">Two-factor authentication</p>
                    <p class="m-0 font-size-75 font-weight-bold">Add an extra layer of security to your account</p>
                </template>
            </es-toggle>
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

<style lang="scss">
.outline-me {
    border: 1px solid red;
}
</style>
