<template>
    <div>
        <h1>
            Badge
        </h1>
        <p>
            Extended from <b-link
                href="https://bootstrap-vue.org/docs/components/badge"
                target="_blank">
                bootstrap-vue badge
            </b-link>
        </p>
        <div class="my-500">
            <es-badge>
                Primary
            </es-badge>
            <es-badge
                class="ml-50"
                variant="success">
                Success
            </es-badge>
            <es-badge
                class="ml-50"
                variant="warning">
                Warning
            </es-badge>
            <es-badge
                class="ml-50"
                variant="danger">
                Danger
            </es-badge>
            <es-badge
                class="ml-50"
                variant="info">
                Info
            </es-badge>
            <es-badge
                class="ml-50"
                variant="dark">
                Dark
            </es-badge>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsBadge.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-badge.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsBadgeDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-badge.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsBadge.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
