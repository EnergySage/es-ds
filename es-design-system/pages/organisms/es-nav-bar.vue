<template>
    <div>
        <h1>
            EsNavBar
        </h1>
        <p>
            The nav bar is a specialized component intended for use outside the normal content
            container. See above.
        </p>

        <!-- print out EsNavBar's mounted() script here so the rip-the-nav utility can access it -->
        <!-- eslint-disable vue/no-v-html -->
        <pre
            class="d-none"
            v-html="navScriptSource" />
        <!-- eslint-enable vue/no-v-html -->

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
    // use a custom layout so the nav can be full-width at the top of the page
    layout: 'nav',
    async asyncData() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsNavBar.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        // retrieve EsNavBar's mounted() script here so the rip-the-nav utility can access it
        const compSourceText = compSource.default;
        const scriptRegex = /\/\/ CUSTOM GLOBAL-NAV SCRIPT STARTS([\s\S]+)\/\/ CUSTOM GLOBAL-NAV SCRIPT ENDS/;
        const navScriptSource = compSourceText.match(scriptRegex)[0];

        return {
            navScriptSource,
        };
    },
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
