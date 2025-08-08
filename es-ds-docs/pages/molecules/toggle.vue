<script setup lang="ts">
const propTableRows = ref([['disabled', 'boolean', 'false', 'Disables the toggle']]);

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
                href="https://v3.primevue.org/inputswitch/"
                target="_blank">
                PrimeVue InputSwitch
            </nuxt-link>
        </p>

        <div class="my-500">
            <h2>Default</h2>
            <div>
                <es-toggle />
            </div>
        </div>

        <div class="my-500">
            <h2>EsToggle Props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-toggle.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/toggle.vue" />
    </div>
</template>

<style lang="scss" scoped>
.multiple-buttons {
    gap: 1rem;
}
</style>
