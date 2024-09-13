<script setup>
const tabIndexProgrammatic = ref(0);

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-tabs.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./tabs.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Tabs</h1>
        <p>
            Extended from
            <a
                href="https://v3.primevue.org/tabview/"
                target="_blank">
                PrimeVue TabView
            </a>
        </p>
        <p>
            Per our writing guidelines, please ensure the title is in
            <a
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </a>
        </p>

        <div class="my-500">
            <h2>Basic example</h2>
            <es-tabs>
                <es-tab title="Item one">
                    <p>Content one</p>
                </es-tab>
                <es-tab title="Item two">
                    <p>Content two</p>
                </es-tab>
                <es-tab title="Item three">
                    <p>Content three</p>
                </es-tab>
                <es-tab title="Item four">
                    <p>Content four</p>
                </es-tab>
            </es-tabs>
        </div>

        <div class="my-500">
            <h2>Using v-model</h2>
            <p>
                If you need to select tabs programmatically or trigger a UI change elsewhere when a tab is selected,
                you can use the <code>v-model</code> directive to bind the active index to a data value.
            </p>
            <div class="mb-100">
                <es-button
                    class="mb-50 mr-50"
                    :disabled="tabIndexProgrammatic === 0"
                    @click="tabIndexProgrammatic = 0">
                    Select tab one
                </es-button>
                <es-button
                    class="mb-50 mr-50"
                    :disabled="tabIndexProgrammatic === 1"
                    @click="tabIndexProgrammatic = 1">
                    Select tab two
                </es-button>
                <es-button
                    class="mb-50"
                    :disabled="tabIndexProgrammatic === 2"
                    @click="tabIndexProgrammatic = 2">
                    Select tab three
                </es-button>
            </div>
            <b-row>
                <b-col
                    cols="12"
                    lg="8">
                    <es-tabs
                        v-model="tabIndexProgrammatic"
                        class="mb-200">
                        <es-tab title="Item one">
                            <p>Content one</p>
                        </es-tab>
                        <es-tab title="Item two">
                            <p>Content two</p>
                        </es-tab>
                        <es-tab title="Item three">
                            <p>Content three</p>
                        </es-tab>
                    </es-tabs>
                </b-col>
                <b-col
                    cols="12"
                    lg="4">
                    <div
                        v-if="tabIndexProgrammatic === 0"
                        class="bg-gray-300 p-200 rounded-lg text-center">
                        Content associated with tab 1
                    </div>
                    <div
                        v-if="tabIndexProgrammatic === 1"
                        class="bg-gray-300 p-200 rounded-lg text-center">
                        Content associated with tab 2
                    </div>
                    <div
                        v-if="tabIndexProgrammatic === 2"
                        class="bg-gray-300 p-200 rounded-lg text-center">
                        Content associated with tab 3
                    </div>
                </b-col>
            </b-row>
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-tabs.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/tabs.vue" />
    </div>
</template>
