<template>
    <b-popover
        ref="popover"
        :show="show"
        :target="target"
        :placement="placement"
        :triggers="triggers"
        :custom-class="`es-popover-${variant}`">
        <template
            v-if="hasTitle"
            #title>
            <!--
            @slot Title
            @binding {string} text or html of the title content
            -->
            <slot name="title" />
            <es-button
                inline
                variant="link"
                class="es-popover-close p-0 float-right"
                @click="onClose">
                <XIcon
                    height="20px"
                    width="20px" />
            </es-button>
        </template>
        <!--
        @slot Popover Content
        @binding {string} text or html of the popover content
        -->
        <template #default>
            <div class="d-flex">
                <slot />
                <es-button
                    v-if="!hasTitle"
                    inline
                    variant="link"
                    class="es-popover-close p-0 pl-50"
                    @click="onClose">
                    <XIcon
                        height="20px"
                        width="20px" />
                </es-button>
            </div>
        </template>
    </b-popover>
</template>

<script lang="js">
import { BPopover } from 'bootstrap-vue';
import XIcon from '../lib-icons/icon-x.vue';
import EsButton from './EsButton.vue';

export default {
    name: 'EsPopover',
    components: {
        BPopover,
        EsButton,
        XIcon,
    },
    props: {
        /**
         * Target
         * (required)
         */
        target: {
            type: String,
            required: true,
        },
        /**
         * Triggers
         * (optional, defaults to 'focus')
         */
        triggers: {
            type: [String, Object],
            required: false,
            default: 'focus',
        },
        /**
         * Placement
         * (optional, defaults to 'auto')
         */
        placement: {
            type: String,
            required: false,
            // eslint-disable-next-line max-len
            validator: (val) => ['auto', 'top', 'bottom', 'right', 'left', 'topleft', 'topright', 'bottomleft', 'bottomright', 'lefttop', 'leftbottom', 'righttop', 'rightbottom'].includes(val),
            default: 'auto',
        },
        /**
         * Show
         * (optional, defaults to 'false')
         */
        show: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Variant
         */
        variant: {
            type: String,
            required: false,
            default: 'dark',
            validator: (val) => ['light', 'dark'].includes(val),
        },
    },
    computed: {
        hasTitle() {
            return !!this.$slots.title;
        },
    },
    methods: {
        onClose() {
            this.$refs.popover.$emit('close');
        },
    },
};
</script>

<style lang="scss">
@use "~@energysage/es-bs-base/scss/variables" as variables;

/* stylelint-disable no-descending-specificity */
.es-popover-light {
    &.popover {
        background-color: variables.$white;
        border: 1px solid variables.$white;
    }
    // styling for all arrow backgrounds
    &.bs-popover-bottom, &.bs-popover-auto[x-placement^=bottom] {
        > .arrow {
            &::before {
                border-bottom-color: variables.$white;
            }

            &::after {
                border-bottom-color: variables.$white;
                top: 1px;
            }
        }
    }

    &.bs-popover-top, &.bs-popover-auto[x-placement^=top] {
        > .arrow {
            &::before {
                border-top-color: variables.$white;
            }

            &::after {
                border-top-color: variables.$white;
                bottom: 1px;
            }
        }
    }

    &.bs-popover-right, &.bs-popover-auto[x-placement^=right] {
        > .arrow {
            &::before {
                border-right-color: variables.$white;
            }

            &::after {
                border-right-color: variables.$white;
                left: 1px;
            }
        }
    }

    &.bs-popover-left, &.bs-popover-auto[x-placement^=left] {
        > .arrow {
            &::before {
                border-left-color: variables.$white;
            }

            &::after {
                border-left-color: variables.$white;
                right: 1px;
            }
        }
    }

    .popover-header {
        background-color: variables.$white;
        border-bottom-color: variables.$white;
        color: variables.$gray-900;

        &::before {
            border-bottom-color: variables.$white;
        }
    }

    .popover-body {
        color: variables.$gray-900;
    }

    .es-popover-close {
        color: variables.$gray-900;
    }
}

.es-popover-dark {
    .es-popover-close, a {
        color: variables.$white;
    }
}
</style>
