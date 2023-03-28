<template>
    <b-pagination
        v-bind="$attrs"
        class="mb-0"
        page-class="page-number font-size-sm mx-25 mx-sm-50"
        ellipsis-class="page-number mx-25 mx-sm-50"
        prev-class="prev-next"
        next-class="prev-next"
        first-class="prev-next"
        last-class="prev-next"
        :aria-controls="listID"
        v-on="$listeners">
        <template #prev-text>
            <IconChevronLeft />
        </template>
        <template #next-text>
            <IconChevronRight />
        </template>
        <template #first-text>
            <IconCircleChevronLeft />
        </template>
        <template #last-text>
            <IconCircleChevronRight />
        </template>
    </b-pagination>
</template>

<script>
import { BPagination } from 'bootstrap-vue';
import IconChevronLeft from '../lib-icons/icon-chevron-left.vue';
import IconChevronRight from '../lib-icons/icon-chevron-right.vue';
import IconCircleChevronLeft from '../lib-icons/icon-circle-chevron-left.vue';
import IconCircleChevronRight from '../lib-icons/icon-circle-chevron-right.vue';

export default {
    name: 'EsPagination',
    components: {
        BPagination,
        IconChevronLeft,
        IconChevronRight,
        IconCircleChevronLeft,
        IconCircleChevronRight,
    },
    props: {
        listId: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss">
@import '~@energysage/es-bs-base/scss/includes';

.pagination {
    .page-number, .prev-next {
        .page-link {
            background-color: transparent;
            color: $dark;
            border: 0;
        }
    }

    .page-number {
        .page-link {
            height: 2.25rem;
            width: 2.25rem;

            &:hover {
                background-color: transparent;
                color: $black;
                font-weight: bold;
            }
        }

        &.active {
            .page-link {
                background: linear-gradient($white, $white) padding-box,
                    linear-gradient(to bottom right, #f6b140, #c84486) border-box;
                border: 2px solid transparent;
                border-radius: 50em;
                color: $black;
                font-weight: bold;
            }
        }
    }

    .prev-next {
        &.disabled {
            .page-link {
                svg {
                    color: $gray-500;
                }
            }
        }

        &:not(.disabled):hover {
            .page-link {
                svg {
                    fill: $black;
                    stroke: $black;
                    stroke-width: 1;
                }
            }
        }
    }
}
</style>
