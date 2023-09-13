<template>
    <div class="position-relative">
        <h1>
            Horizontal List
        </h1>
        <h2>
            Left Aligned No Dots
        </h2>
        <div class="my-450">
            <es-horizontal-list id="docs-1">
                <div
                    v-for="index in 10"
                    :key="index"
                    class="large-block-holder bg-primary mr-200 text-center text-white py-450">
                    {{ index }}
                </div>
            </es-horizontal-list>
            <h2 class="mt-5">
                Center Aligned With Dots
            </h2>
            <es-horizontal-list
                id="docs-2"
                class="center-holder overflow-hidden"
                dots>
                <div
                    v-for="index in 3"
                    :key="index"
                    class="center-block-holder bg-primary mr-50 text-center text-white py-450">
                    {{ index }}
                </div>
            </es-horizontal-list>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsHorizontalList.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-horizontal-list.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsHorizontalListDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-horizontal-list.vue');
            // eslint-disable-next-line max-len
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsHorizontalList.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

<style lang="scss" scoped>
.large-block-holder {
  height: 185px;
  width: 300px;
}

.center-holder {
    margin: 0 auto;
    width: 350px;
}

.center-block-holder {
    height: 185px;
    width: 170px;
}
</style>
