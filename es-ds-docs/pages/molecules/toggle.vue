<script setup lang="ts">
const propTableRows = ref([
    ['disabled', 'Boolean', 'false', 'Disables the toggle.'],
    ['ariaLabel', 'String', 'undefined', 'Accessible label for toggle.'],
    ['hasValue', 'Boolean', 'false', 'Display ON/OFF values below toggle.'],
    ['onValue', 'String', "'ON'", 'Text to display when toggle is checked (requires hasValue).'],
    ['offValue', 'String', "'OFF'", 'Text to display when toggle is unchecked (requires hasValue).'],
]);
const slotTableRows = ref([['text', 'n/a', 'Content to display to the right of the toggle.']]);
const checked = ref(true);
const disabledChecked = ref(true);

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
            <h2>Default</h2>
            <div>
                <es-toggle />
            </div>

            <h2 class="mt-500">Checked</h2>
            <div>
                <es-toggle v-model="checked" />
            </div>

            <h2 class="mt-500">With Value Label</h2>
            <div>
                <es-toggle has-value />
                <es-toggle
                    has-value
                    on-value="YES"
                    off-value="NO" />
            </div>

            <h2 class="mt-500">With Text Label</h2>
            <div class="mb-300">
                <es-toggle>
                    <template #text>
                        <h4 class="mb-0">Enable notifications</h4>
                    </template>
                </es-toggle>
            </div>
            <div class="mb-300">
                <es-toggle>
                    <template #text>
                        <h4>Marketing emails</h4>
                        <p class="mb-0">Receive updates about new features and promotions</p>
                    </template>
                </es-toggle>
            </div>
            <div class="mb-300">
                <es-toggle v-model="checked">
                    <template #text>
                        <h4>Two-factor authentication</h4>
                        <p class="mb-0">Add an extra layer of security to your account</p>
                    </template>
                </es-toggle>
            </div>

            <h2 class="mt-500">Disabled</h2>
            <div>
                <es-toggle disabled />
            </div>
            <div class="mt-200">
                <es-toggle
                    v-model="disabledChecked"
                    disabled />
            </div>
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
