<template>
    <div>
        <h1>
            EsNavBar
        </h1>
        <!--
        <p class="pb-200">
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/navbar">
                bootstrap-vue navbar
            </b-link>
        </p>
        -->

        <es-nav-bar />

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsNavBar.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-nav-bar.vue" />
    </div>
</template>
<script>

export default {
    name: 'EsNavBarDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-nav-bar.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsNavBar.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
