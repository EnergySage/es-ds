<template>
    <!-- TODO: Has a11y issue; https://github.com/bootstrap-vue/bootstrap-vue/issues/7147 -->
    <b-pagination
        v-bind="$attrs"
        class="mb-0"
        first-number
        last-number
        page-class="page-number mx-0"
        ellipsis-class="ellipses mx-0"
        prev-class="prev-next"
        next-class="prev-next"
        :aria-controls="listID"
        v-on="$listeners">
        <template #prev-text>
            <IconChevronLeft />
        </template>
        <template #next-text>
            <IconChevronRight />
        </template>
        <template #ellipsis-text>
            ...
        </template>
    </b-pagination>
</template>

<script>
import { BPagination } from 'bootstrap-vue';
import IconChevronLeft from '../lib-icons/icon-chevron-left.vue';
import IconChevronRight from '../lib-icons/icon-chevron-right.vue';

export default {
    name: 'EsPagination',
    components: {
        BPagination,
        IconChevronLeft,
        IconChevronRight,
    },
    props: {
        listId: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss">
@use "~@energysage/es-bs-base/scss/mixins/breakpoints" as breakpoints;
@use "~@energysage/es-bs-base/scss/variables" as variables;

.pagination::v-deep {
    .page-number, .prev-next, .ellipses {
        height: 3rem;
        width: 3rem;

        .page-link {
            border: 0;
            font-size: variables.$font-size-300;
            height: 3rem;
            width: 3rem;
        }
    }

    .ellipses {
        .page-link {
            color: variables.$gray-900;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }
    }

    .page-number {
        .page-link {
            border-radius: variables.$pagination-border-radius;
        }
    }

    .prev-next {
        .page-link {
            align-items: center;
            border-radius: variables.$pagination-border-radius;
            display: flex;

            &:not(.disabled):hover {
                background-color: variables.$gray-50;
            }
        }
    }
}
</style>
