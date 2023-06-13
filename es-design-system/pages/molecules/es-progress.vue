<template>
    <div>
        <h1>
            Progress
        </h1>
        <p>
            Default variant extended from <b-link href="https://bootstrap-vue.org/docs/components/progress">
                bootstrap-vue progress
            </b-link>
        </p>
        <p class="pb-200">
            Circle variant extended from <b-link href="https://github.com/EnergySage/es-cdgm/blob/main/frontend/components/CircularProgress.vue">
                <code>es-cdgm</code> codebase
            </b-link>
        </p>
        <h2>
            Default Variant
        </h2>
        <h3>
            Three Steps
        </h3>
        <div class="mb-100">
            <es-progress :value="0" />
        </div>
        <div class="mb-100">
            <es-progress :value="33" />
        </div>
        <div class="mb-100">
            <es-progress :value="67" />
        </div>
        <div class="mb-100">
            <es-progress :value="100" />
        </div>
        <h3>
            Animated Transition
        </h3>
        <div class="mb-100">
            <es-progress :value="value" />
        </div>
        <div class="mb-100">
            <es-button
                class="px-50"
                size="sm"
                @click="value = Math.max(value - 20, 0)">
                <icon-minus
                    height="16px"
                    width="16px" />
                <span class="sr-only">Remove</span>
                20%
            </es-button>
            <es-button
                class="px-50"
                size="sm"
                @click="value = Math.min(value + 20, 100)">
                <icon-plus
                    height="16px"
                    width="16px" />
                <span class="sr-only">Add</span>
                20%
            </es-button>
        </div>
        <p class="mb-300">
            value: {{ value }}
        </p>
        <h2>
            Circular Variant
        </h2>
        <p>
            Height is a required property for the circular variant. The height range for best results is 70px-100px.
        </p>
        <p>
            Height: 70px
        </p>
        <div class="mb-100 d-flex flex-nowrap">
            <es-progress
                :value="0"
                circle
                height="70px" />
            <es-progress
                :value="5"
                circle
                height="70px" />
            <es-progress
                :value="36"
                circle
                height="70px" />
            <es-progress
                :value="96"
                circle
                height="70px" />
            <es-progress
                :value="100"
                circle
                height="70px" />
        </div>
        <p>
            Height: 100px
        </p>
        <div class="mb-100 d-flex flex-nowrap">
            <es-progress
                :value="0"
                circle
                height="100px" />
            <es-progress
                :value="5"
                circle
                height="100px" />
            <es-progress
                :value="36"
                circle
                height="100px" />
            <es-progress
                :value="87"
                circle
                height="100px" />
            <es-progress
                :value="87"
                circle
                height="100px" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsProgress.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-progress.vue" />
    </div>
</template>
<script>

export default {
    name: 'EsProgressDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            value: 20,
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-progress.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsProgress.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
