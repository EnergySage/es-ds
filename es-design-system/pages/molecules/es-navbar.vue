<template>
    <div>
        <h1>
            EsNavbar
        </h1>
        <!--
        <p class="pb-200">
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/navbar">
                bootstrap-vue navbar
            </b-link>
        </p>
        -->

        <es-navbar />

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsNavbar.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-navbar.vue" />
    </div>
</template>
<script>

export default {
    name: 'EsNavbarDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-navbar.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsNavbar.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
