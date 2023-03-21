<template>
    <div>
        <h1>
            Tabs
        </h1>
        <p class="mb-450">
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/tabs">
                bootstrap-vue tabs
            </b-link>
        </p>

        <div class="mb-450">
            <h2>
                Basic example
            </h2>
            <es-tabs>
                <es-tab title="Tab 1">
                    <p>
                        Content 1
                    </p>
                </es-tab>
                <es-tab title="Tab 2">
                    <p>
                        Content 2
                    </p>
                </es-tab>
                <es-tab title="Tab 3">
                    <p>
                        Content 3
                    </p>
                </es-tab>
            </es-tabs>
        </div>

        <div class="mb-450">
            <h2>
                Selecting the active tab programmatically
            </h2>
            <es-tabs
                v-model="tabIndexButtons"
                class="mb-200">
                <es-tab title="Tab 1">
                    <p>
                        Content 1
                    </p>
                </es-tab>
                <es-tab title="Tab 2">
                    <p>
                        Content 2
                    </p>
                </es-tab>
                <es-tab title="Tab 3">
                    <p>
                        Content 3
                    </p>
                </es-tab>
            </es-tabs>
            <div class="mb-100">
                <es-button
                    class="mb-50"
                    size="sm"
                    @click="tabIndexButtons = 0">
                    Select tab 1
                </es-button>
                <es-button
                    class="mb-50"
                    size="sm"
                    @click="tabIndexButtons = 1">
                    Select tab 2
                </es-button>
                <es-button
                    class="mb-50"
                    size="sm"
                    @click="tabIndexButtons = 2">
                    Select tab 3
                </es-button>
            </div>
        </div>

        <div class="mb-450">
            <h2>
                Showing separate content based on the active tab
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    lg="6">
                    <es-tabs
                        v-model="tabIndexContent"
                        class="mb-200">
                        <es-tab title="Tab 1">
                            <p>
                                Content 1
                            </p>
                        </es-tab>
                        <es-tab title="Tab 2">
                            <p>
                                Content 2
                            </p>
                        </es-tab>
                        <es-tab title="Tab 3">
                            <p>
                                Content 3
                            </p>
                        </es-tab>
                    </es-tabs>
                </b-col>
                <b-col
                    cols="12"
                    lg="6">
                    <div
                        v-if="tabIndexContent === 0"
                        class="bg-gray-300 p-200 rounded-lg text-center">
                        Content associated with tab 1
                    </div>
                    <div
                        v-if="tabIndexContent === 1"
                        class="bg-gray-300 p-200 rounded-lg text-center">
                        Content associated with tab 2
                    </div>
                    <div
                        v-if="tabIndexContent === 2"
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
            tabIndexButtons: 0,
            tabIndexContent: 0,
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
