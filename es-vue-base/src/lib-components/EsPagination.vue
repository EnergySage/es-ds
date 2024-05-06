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
            height: 3rem;
            width: 3rem;
            background-color: transparent;
            border: 0;
            font-weight: variables.$font-weight-semibold;
            font-size: variables.$font-size-300;
        }
    }

    .ellipses {
        .page-link {
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: variables.$gray-900;
        }
    }

    .page-number {
        .page-link {
            border-radius: variables.$border-radius-sm;
        }

        &.active {
            .page-link {
                background-color: variables.$orange-50;
                color: variables.$gray-900;
            }
        }
    }

    .prev-next {
        .page-link {
            border-radius: variables.$border-radius-sm;
            display: flex;
            align-items: center;

            &:not(.disabled):hover {
                background-color: variables.$gray-50;
            }
        }
    }
}
</style>
