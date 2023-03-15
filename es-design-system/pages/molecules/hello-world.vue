<template>
    <div>
        <h1>
            HelloWorld component
        </h1>
        <div class="border-top py-3">
            <!-- this is the normal usage of a component and changes to HelloWorld.vue
                 will require the es-vue-base to get rebuilt -->
            <hello-world>
                Component from es-vue-base
            </hello-world>
        </div>
        <div class="border-top border-bottom py-3">
            <!-- this is for the active development of a component and changes can reload when made here
                 the code you'd like to see in HelloWorld.vue should be in this div -->
            <div>
                <h1>
                    Hello World.
                </h1>
                <p>
                    Component from es-design-system
                </p>
            </div>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/HelloWorld.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/hello-world.vue" />
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
            const docSource = await import('!raw-loader!./hello-world.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/HelloWorld.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
