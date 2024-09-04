<script setup lang="ts">
import Paginator from 'primevue/paginator';

const props = defineProps({
    totalRows: {
        type: Number,
        required: true,
    },
    perPage: {
        type: Number,
        required: true,
    },
    listId: {
        type: String,
        required: true,
    },
    align: {
        type: String,
        default: 'left',
    },
});

const model = defineModel<number>();
const first = ref();

watch(model, (newVal) => {
    first.value = (newVal - 1) * props.perPage;
});

const updatePage = (newFirst: number) => {
    model.value = (newFirst / props.perPage) + 1;
};

const passThrough = {
    root: {
        class: ['pagination',
            { 'justify-content-center': props.align === 'center', 'justify-content-end': props.align === 'right' }],
    },
    firstPageButton: { class: 'paginator-button' },
    previousPageButton: { class: 'paginator-button' },
    nextPageButton: { class: 'paginator-button' },
    lastPageButton: { class: 'paginator-button' },
    current: { class: 'px-100 current-page-report' },
};

</script>

<template>
    <paginator
        v-model:first="first"
        :rows="perPage"
        :total-records="totalRows"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        current-page-report-template="{currentPage} of {totalPages}"
        :aria-controls="listId"
        :pt="passThrough"
        @update:first="updatePage">
        <template #prevpagelinkicon>
            <icon-chevron-left />
        </template>
        <template #nextpagelinkicon>
            <icon-chevron-right />
        </template>
    </paginator>
</template>
