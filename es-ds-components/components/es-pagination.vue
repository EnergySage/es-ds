<template>
    <paginator
        :rows="perPage"
        :totalRecords="totalRows"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{currentPage} of {totalPages}"
        :aria-controls="listId"
        :pt="passThrough">
        <template #prevpagelinkicon><IconChevronLeft /></template>
        <template #nextpagelinkicon><IconChevronRight /></template>
    </paginator>
</template>

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
    }
});

const passThrough = {
    root: { class: ['pagination', {'justify-content-center': props.align=='center'}] },
    firstPageButton: { class: 'paginator-button'},
    previousPageButton: { class: 'paginator-button'},
    nextPageButton: { class: 'paginator-button'},
    lastPageButton: { class: 'paginator-button'},
    current: { class: 'px-100 current-page-report'},
};

</script>
