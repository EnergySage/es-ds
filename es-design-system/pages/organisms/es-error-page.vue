<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<template>
    <div>
        <h1>
            Error page
        </h1>
        <p>
            The Error Page component is intended to be used in error pages across nuxt apps.
            The four types of error codes explicitly handled include 403, 404, 500 and 503.
            This component is intended to take over the entire page between the header and footer.
        </p>
        <div class="my-500">
            <h2>
                Error 403
            </h2>
            <es-error-page error-type="403" />
        </div>
        <div class="my-500">
            <h2>
                Error 404
            </h2>
            <es-error-page error-type="404" />
        </div>
        <div class="my-500">
            <h2>
                Error 500
            </h2>
            <es-error-page error-type="500" />
        </div>
        <div class="my-500">
            <h2>
                Error 503
            </h2>
            <es-error-page error-type="503" />
        </div>
        <div class="my-500">
            <h2>
                Error 418 (and how other errors look)
            </h2>
            <es-error-page error-type="418" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsErrorPage.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-error-page.vue" />
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
