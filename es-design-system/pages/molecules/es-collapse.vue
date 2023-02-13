<template>
    <div>
        <h1>
            Collapse
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/collapse">
                bootstrap-vue collapse
            </b-link>
        </p>
        <EsCollapse
            id="testId"
            visible
            class="p-5 my-5"
            @shown="shownEvent">
            <template #title>
                <h2 class="mb-0">
                    My Title
                </h2>
            </template>
            <!-- eslint-disable max-len -->
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex mi, ut suscipit libero condimentum id.
                Pellentesque eu diam vel nisi molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris
                vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare.
                Maecenas quis turpis sit amet sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                Donec eleifend elit quam.
            </p>
        <!-- eslint-enable max-len -->
        </EsCollapse>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsCollapse.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-collapse.vue" />
    </div>
</template>
<script>

export default {
    name: 'EsCollapseDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-collapse.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsCollapse.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        shownEvent() {
            // eslint-disable-next-line no-console
            console.log('shown');
        },
    },
};
</script>
