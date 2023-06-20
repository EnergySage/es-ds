<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<template>
    <div>
        <h1>
            EsErrorPage component
        </h1>
        <p>
            The Error Page component is intended to be used in error pages across nuxt apps.
            The four types of error codes explicitly handled include 403, 404, 500 and 503.
        </p>
        <div class="my-450">
            <h2>
                Error 403
            </h2>
            <es-error-page error-type="403" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsErrorPage.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-error-page.vue" />
    </div>
</template>
<script>

export default {
    name: 'EsErrorDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            errorTitle: 'font-weight-boldest display-3',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-error-page.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsErrorPage.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
