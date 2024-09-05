<script setup>
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-pagination.vue?raw');
    // eslint-disable-next-line import/no-self-import
    const docSource = await import('./pagination.vue?raw');
    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

const perPage = 3;
const items = Array.from({ length: 36 }, (v, i) => `Item ${i}`);

const rows = computed(() => items.length);

const currentPage = ref(1);

const paginationListProps = [
    [
        'totalRows',
        'Number',
        'n/a',
        `
        Required. This is the total number of items in the table or list to be paginated.
        `,
    ],
    [
        'perPage',
        'Number',
        'n/a',
        `
        Required. This is the number of items to be displayed on each page, and along with totalRows determines
        how many pages are needed.
        `,
    ],
    [
        'listId',
        'String',
        'n/a',
        `
        Required. The ID of a list or table element to be paginated, this is input to "aria-controls"
        for accessibility.
        `,
    ],
    [
        'align',
        'String',
        'left',
        `
        Options 'left', 'center', and 'right'. Horizontal alignment applied to the paginator as a whole.
        `,
    ],
];
</script>

<template>
    <div>
        <h1>Pagination</h1>
        <p class="pb-200">
            Extended from
            <nuxt-link
                href="https://v3.primevue.org/paginator/"
                target="_blank">
                PrimeVue paginator
            </nuxt-link>
        </p>

        <div class="mb-500">
            <ul id="paginated-list">
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
                list-id="paginated-list"
                align="center" />
        </div>

        <div class="mb-500">
            <h2>EsPagination props</h2>
            <ds-prop-table :rows="paginationListProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-pagination.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/pagination.vue" />
    </div>
</template>
