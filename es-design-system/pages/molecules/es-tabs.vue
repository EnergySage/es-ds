<template>
    <div>
        <h1>
            Tabs
        </h1>
        <p class="mb-450">
            Extended from <b-link
                href="https://bootstrap-vue.org/docs/components/tabs"
                target="_blank">
                bootstrap-vue tabs
            </b-link>
        </p>

        <div class="mb-450">
            <h2>
                Basic example
            </h2>
            <es-tabs>
                <es-tab title="Item One">
                    <p>
                        Content One
                    </p>
                </es-tab>
                <es-tab title="Item Two">
                    <p>
                        Content Two
                    </p>
                </es-tab>
                <es-tab title="Item Three">
                    <p>
                        Content Three
                    </p>
                </es-tab>
                <es-tab title="Item Four">
                    <p>
                        Content Four
                    </p>
                </es-tab>
            </es-tabs>
        </div>

        <div class="mb-450">
            <h2>
                Using v-model
            </h2>
            <p>
                If you need to select tabs programmatically or trigger a UI change elsewhere when a
                tab is selected, you can use the <code>v-model</code> directive to bind the
                active index to a data value.
            </p>
            <div class="mb-100">
                <es-button
                    class="mb-50"
                    :disabled="tabIndexProgrammatic === 0"
                    @click="tabIndexProgrammatic = 0">
                    Select tab one
                </es-button>
                <es-button
                    class="mb-50"
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
                        <es-tab title="Item One">
                            <p>
                                Content One
                            </p>
                        </es-tab>
                        <es-tab title="Item Two">
                            <p>
                                Content Two
                            </p>
                        </es-tab>
                        <es-tab title="Item Three">
                            <p>
                                Content Three
                            </p>
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
            comp-source="es-vue-base/src/lib-components/EsTabs.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-tabs.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsTabsDocs',
    data() {
        return {
            tabIndexProgrammatic: 0,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-tabs.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsTabs.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
