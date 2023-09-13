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
// @import '~@energysage/es-bs-base/scss/includes';
@use '~@energysage/es-bs-base/scss/bootstrap.import' as *;

.pagination::v-deep {
    .page-number, .prev-next, .ellipses {
        .page-link {
            background-color: transparent;
            border: 0;
            color: $dark;
        }
    }

    .page-number, .ellipses {
        display: block !important; // override number limit on mobile viewports

        @media only screen and (min-width: 370px) {  // mid-xs breakpoint; only compressed further below 370px
            margin-left: $pagination-padding-y-sm;
            margin-right: $pagination-padding-y-sm;
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
                color: $black;
                font-weight: bold;
            }
        }

        &.active {
            .page-link {
                background: linear-gradient($white, $white) padding-box,
                    linear-gradient(to bottom right, $yellow-500, $pink-500) border-box;
                border: 2px solid transparent;
                border-radius: 50em;
                color: $black;
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

            @include media-breakpoint-up(sm) {
                padding-left: $pagination-padding-x;
                padding-right: $pagination-padding-x;
            }
        }

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
