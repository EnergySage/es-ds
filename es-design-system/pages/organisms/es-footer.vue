<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<template>
    <div>
        <h1>
            EsFooter component
        </h1>
        <p>
            The footer is a specialized component intended for use outside the normal content
            container. See below.
        </p>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFooter.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-footer.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsFooterDocs',
    // use a custom layout so the footer can be full-width at the bottom of the page
    layout: 'footer',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-footer.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsFooter.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
