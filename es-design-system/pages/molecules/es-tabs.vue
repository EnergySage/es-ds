<template>
    <div>
        <h1>
            Tabs
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/tabs">
                bootstrap-vue tabs
            </b-link>
        </p>
        <es-tabs class="my-5">
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
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsTabs.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-tabs.vue" />
    </div>
</template>
<script>
import { EsTab, EsTabs } from '@energysage/es-vue-base';

export default {
    name: 'EsTabsDocs',
    components: {
        EsTab, EsTabs,
    },
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docSource = await import('!raw-loader!./es-tabs.vue');
        const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsTabs.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.docCode = this.$prism.normalizeCode(docSource.default);
        this.compCode = this.$prism.normalizeCode(compSource.default);
        this.$prism.highlight(this);
    },
};
</script>
