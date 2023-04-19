<template>
    <div>
        <h1>
            Pagination
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/pagination">
                bootstrap-vue pagination
            </b-link>
        </p>
        <ul
            id="paginated-list"
            class="my-4">
            <li
                v-for="item in items.slice(perPage * (currentPage - 1), perPage * currentPage)"
                :key="item">
                {{ item }}
            </li>
        </ul>
        <es-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            align="center"
            list-id="paginated-list" />
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsPagination.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-pagination.vue" />
    </div>
</template>

<script>

export default {
    name: 'EsPaginationDocs',
    data() {
        return {
            perPage: 3,
            currentPage: 1,
            items: Array.from({ length: 36 }, (v, i) => `Item ${i}`),
            compCode: '',
            docCode: '',
        };
    },
    computed: {
        rows() {
            return this.items.length;
        },
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-pagination.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsPagination.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
