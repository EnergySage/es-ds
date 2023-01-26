<template>
    <div>
        <h1>
            Breadcrumbs
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/breadcrumb">
                bootstrap-vue breadcrumbs
            </b-link>
        </p>
        <div class="my-5">
            <es-breadcrumbs :items="items" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsBreadcrumbs.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-breadcrumbs.vue" />
    </div>
</template>
<script>
import { EsBreadcrumbs } from '@energysage/es-vue-base';

export default {
    name: 'EsBreadcrumbsDocs',
    components: {
        EsBreadcrumbs,
    },
    data() {
        return {
            compCode: '',
            docCode: '',
            items: [
                {
                    text: 'Home',
                    to: '#',
                },
                {
                    text: 'Details',
                    to: '#',
                },
                {
                    text: 'Search',
                    active: true,
                },
            ],
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-breadcrumbs.vue');
            // eslint-disable-next-line max-len
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsBreadcrumbs.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
