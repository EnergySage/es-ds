<template>
    <!-- TODO: Has a11y issue; https://github.com/bootstrap-vue/bootstrap-vue/issues/7147 -->
    <b-pagination
        v-bind="$attrs"
        class="mb-0"
        first-number
        last-number
        page-class="page-number font-size-sm mx-sm-50"
        ellipsis-class="ellipses mx-sm-50"
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
        .page-link {
            background-color: transparent;
            border: 0;
            color: variables.$dark;
        }
    }

    .page-number, .ellipses {
        display: block !important; // override number limit on mobile viewports

        @media only screen and (min-width: 370px) {  // mid-xs breakpoint; only compressed further below 370px
            margin-left: variables.$pagination-padding-y-sm;
            margin-right: variables.$pagination-padding-y-sm;
        }
    }

    .ellipses {
        .page-link {
            text-align: center;
        }
    }

    .page-number {
        .page-link {
            height: 2.25rem;
            width: 2.25rem;

            &:hover {
                background-color: transparent;
                color: variables.$black;
                font-weight: bold;
            }
        }

        &.active {
            .page-link {
                background: linear-gradient(variables.$white, variables.$white) padding-box,
                    linear-gradient(to bottom right, variables.$yellow-500, variables.$pink-500) border-box;
                border: 2px solid transparent;
                border-radius: 50em;
                color: variables.$black;
                font-weight: bold;
                padding: 0;
            }
        }
    }

    .prev-next {
        /* stylelint-disable-next-line no-descending-specificity */
        .page-link {
            padding-left: 0;
            padding-right: 0;

            @include breakpoints.media-breakpoint-up(sm) {
                padding-left: variables.$pagination-padding-x;
                padding-right: variables.$pagination-padding-x;
            }
        }

        &.disabled {
            .page-link {
                svg {
                    color: variables.$gray-500;
                }
            }
        }

        &:not(.disabled):hover {
            .page-link {
                svg {
                    fill: variables.$black;
                    stroke: variables.$black;
                    stroke-width: 1;
                }
            }
        }
    }
}
</style>
