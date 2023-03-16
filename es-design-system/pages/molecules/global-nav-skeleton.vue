<template>
    <div>
        <h1>
            GlobalNav component
        </h1>
        <div class="border-top py-3">
            <!-- this is the normal usage of a component and changes to GlobalNav.vue
                 will require the es-vue-base to get rebuilt -->
            <global-nav>
                Component from es-vue-base
            </global-nav>
        </div>
        <div class="border-top border-bottom py-3">
            <!-- Global Navigation Skeleton development takes place in this div -->
            Navigation Skeleton will be developed here
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/GlobalNav.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/global-nav-skeleton.vue" />
    </div>
</template>
<script>

export default {
    name: 'HelloWorldDocs',
    data() {
        return {
            visible: false,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./global-nav-skeleton.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/GlobalNav.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
