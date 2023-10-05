<template>
    <div>
        <p class="pb-200">
            Extended from <b-link href="https://github.com/EnergySage/es-cdgm/blob/main/frontend/components/CircularProgress.vue">
                <code>es-cdgm</code> codebase
            </b-link>
        </p>
        <es-progress-circle
            class="mb-100"
            :value="value"
            height="100px" />
        <div class="d-flex flex-nowrap">
            <es-button
                size="sm"
                class="mr-50"
                @click="value = value - 10">
                -10%
            </es-button>
            <es-button
                size="sm"
                @click="value = value + 10">
                +10%
            </es-button>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsProgressCircle.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-progress-circle.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsProgressCircleDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            value: 10,
            heightRange: [50, 60, 70, 80, 90, 100],
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-progress-circle.vue');
            const compSource = await import(
                '!raw-loader!@energysage/es-vue-base/src/lib-components/EsProgressCircle.vue'
            );
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
