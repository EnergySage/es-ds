<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<template>
    <div>
        <h1>
            EsErrorPage component
        </h1>
        <p>
            The Error Page component is intended to be used in error pages across nuxt apps.
        </p>
        <div class="my-450">
            <h2>
                Error 404
            </h2>
            <es-error-page>
                <template #errorType>
                    <h1 class="font-weight-boldest display-3">
                        404
                    </h1>
                </template>
                <template #errorMsg>
                    <h2>
                        Oops! We are terribly sorry, but there is nothing bright to see here.
                    </h2>
                </template>
            </es-error-page>
            <h2>
                Error 403
            </h2>
            <es-error-page>
                <template #errorType>
                    <h1 class="font-weight-boldest display-3">
                        403
                    </h1>
                </template>
                <template #errorMsg>
                    <h2>
                        Oops! If you're seeing this message, there's a good chance you have
                        cookies or referrers turned off in your browser.
                    </h2>
                </template>
            </es-error-page>
            <h2>
                Error 500
            </h2>
            <es-error-page>
                <template #errorType>
                    <h1 class="font-weight-boldest display-3">
                        404
                    </h1>
                </template>
                <template #errorMsg>
                    <h2>
                        Oops! We are terribly sorry, but our server is not so bright today.
                        Please try again.
                    </h2>
                </template>
            </es-error-page>
            <h2>
                503 Error
            </h2>
            <es-error-page>
                <template #errorType>
                    <h1 class="font-weight-boldest display-3">
                        503
                    </h1>
                </template>
                <template #errorMsg>
                    <h2>
                        Service unavailable: The page you are requesting is temporarily unavailable.
                    </h2>
                </template>
            </es-error-page>
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
