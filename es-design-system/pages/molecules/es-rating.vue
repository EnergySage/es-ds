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
        <div class="my-5">
            <h2>
                Form Input
            </h2>
            <es-rating
                :read-only="false"
                @change="changeEvent" />
            <h2 class="mt-5">
                Static Display
            </h2>
            <es-rating
                :rating="3.9" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsRating.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-rating.vue" />
    </div>
</template>
<script>
import { EsRating } from '@energysage/es-vue-base';

export default {
    name: 'EsRatingDocs',
    components: {
        EsRating,
    },
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docSource = await import('!raw-loader!./es-rating.vue');
        const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsRating.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.docCode = this.$prism.normalizeCode(docSource.default);
        this.compCode = this.$prism.normalizeCode(compSource.default);
        this.$prism.highlight(this);
    },
    methods: {
        changeEvent($event) {
            // eslint-disable-next-line no-alert
            alert($event);
        },
    },
};
</script>
