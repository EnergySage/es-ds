<template>
    <div>
        <h1>
            Rating
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/form-rating">
                bootstrap-vue form-rating
            </b-link>
        </p>
        <div class="my-450">
            <h2>
                Form Input
            </h2>
            <es-rating
                :read-only="false"
                @change="changeEvent" />
            <h2 class="mt-450">
                Static Display
            </h2>
            <div
                v-for="i in 11"
                :key="i">
                <es-rating
                    :rating="(i-1)/2" />
            </div>
        </div>
        <div class="d-flex flex-column flex-md-row">
            <div class="rating bg-gray-50 justify-content-center mb-200 mb-md-0 mr-md-200">
                <es-rating :rating="4.5" />
            </div>
            <div class="rating bg-blue-50 justify-content-center mb-200 mb-md-0 mr-md-200">
                <es-rating :rating="4.5" />
            </div>
            <div class="rating bg-blue-900 justify-content-center mb-200 mb-md-0 mr-md-200">
                <es-rating :rating="4.5" />
            </div>
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsRating.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-rating.vue" />
    </div>
</template>

<script lang="js">

export default {
    name: 'EsRatingDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-rating.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsRating.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        changeEvent($event) {
            // eslint-disable-next-line no-alert
            alert($event);
        },
    },
};
</script>

<style lang="scss">
.code-holder {
    .code-input {
        appearance: textfield;

        &.lg {
            font-size: 3rem;
            height: 6rem;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            appearance: none;
        }
    }
}

</style>
