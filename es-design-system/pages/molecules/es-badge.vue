<template>
    <div>
        <h1>
            Badges
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/badge">
                bootstrap-vue badge
            </b-link>
        </p>
        <es-badge>
            Primary
        </es-badge>
        <es-badge variant="success">
            Success
        </es-badge>
        <es-badge variant="danger">
            Danger
        </es-badge>
        <es-badge variant="warning">
            Warning
        </es-badge>
        <es-badge variant="info">
            Info
        </es-badge>
        <es-badge variant="dark">
            Dark
        </es-badge>
        <EsCollapse
            id="docsource"
            class="mt-5">
            <template #title>
                <h2 class="mb-0">
                    Component Source
                </h2>
            </template>
            <CodeBlock
                :code="compcode"
                source="es-vue-base/src/lib-components/EsBadge.vue" />
        </EsCollapse>
        <EsCollapse
            id="docsource"
            class="mt-5">
            <template #title>
                <h2 class="mb-0">
                    Documentation Source
                </h2>
            </template>
            <CodeBlock
                :code="doccode"
                source="es-design-system/pages/molecules/es-badge.vue" />
        </EsCollapse>
    </div>
</template>
<script>
import { EsBadge, EsCollapse } from '@energysage/es-vue-base';

export default {
    name: 'EsBadgeDocs',
    components: {
        EsBadge,
        EsCollapse,
    },
    data() {
        return {
            doccode: null,
            compcode: null,
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docsource = await import('!raw-loader!./es-badge.vue');
        const compsource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsBadge.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.doccode = this.$prism.normalizeCode(docsource.default);
        this.compcode = this.$prism.normalizeCode(compsource.default);
        this.$prism.highlight(this);
    },
};
</script>
