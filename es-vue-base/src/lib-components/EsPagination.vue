<template>
    <b-pagination
        v-bind="$attrs"
        class="mb-0"
        first-number
        last-number
        page-class="page-number font-size-sm mx-25 mx-sm-50"
        ellipsis-class="ellipses mx-25 mx-sm-50"
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

<style lang="scss">
@import '~@energysage/es-bs-base/scss/includes';

.pagination {
    .page-number, .prev-next, .ellipses {
        .page-link {
            background-color: transparent;
            color: $dark;
            border: 0;
        }
    }

    .page-number {
        display: block !important; // override number limit on mobile
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
                padding: 0;
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

        .page-link {
            padding-left: 0;
            padding-right: 0;

            @include media-breakpoint-up(sm) {
                padding-left: 0.75rem;
                padding-right: 0.75rem;
            }
        }
    }

    .ellipses {
        display: block !important; // override hide ellipses on mobile
        .page-link {
            text-align: center;
        }
    }
}
</style>
