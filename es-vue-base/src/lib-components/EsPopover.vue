<template>
    <b-popover
        ref="popover"
        :show="show"
        :target="target"
        :placement="placement"
        :triggers="triggers"
        :custom-class="customClass">
        <template
            v-if="hasTitle"
            #title>
            <!--
            @slot Title
            @binding {string} text or html of the title content
            -->
            <slot name="title" />
            <EsButton
                variant="link"
                class="p-0 float-right"
                @click="onClose">
                <XIcon
                    height="20px"
                    width="20px" />
            </EsButton>
        </template>
        <!--
        @slot Popover Content
        @binding {string} text or html of the popover content
        -->
        <template #default>
            <div class="d-flex popover-content-wrapper">
                <slot />
                <div v-if="!hasTitle">
                    <EsButton
                        variant="link"
                        class="p-0"
                        @click="onClose">
                        <XIcon
                            height="20px"
                            width="20px" />
                    </EsButton>
                </div>
            </div>
        </template>
    </b-popover>
</template>

<script lang="js">
import { BPopover } from 'bootstrap-vue';
import EsButton from '@/src/lib-components/EsButton.vue';
import XIcon from '@/src/lib-icons/x.vue';

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
            default: 'click',
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
        customClass: {
            type: String,
            required: false,
            default: 'es-popover-dark',
            validator: (val) => ['es-popover-light', 'es-popover-dark'].includes(val),
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
@import '~@energysage/es-bs-base/scss/includes';

.es-popover-light {
    &.popover {
        background-color: $white;
        border: 1px solid $primary;
    }
    // styling for all arrow backgrounds
    &.bs-popover-bottom, &.bs-popover-auto[x-placement^=bottom] {
        > .arrow {
            &::before {
                border-bottom-color: $primary;
            }
            &::after {
                top: 1px;
                border-bottom-color: $white;
            }
        }
    }
    &.bs-popover-top, &.bs-popover-auto[x-placement^=top] {
        > .arrow {
            &::before {
                border-top-color: $primary;
            }
            &::after {
                bottom: 1px;
                border-top-color: $white;
            }
        }
    }
    &.bs-popover-right, &.bs-popover-auto[x-placement^=right] {
        > .arrow {
            &::before {
                border-right-color: $primary;
            }
            &::after {
                left: 1px;
                border-right-color: $white;
            }
        }
    }
    &.bs-popover-left, &.bs-popover-auto[x-placement^=left] {
        > .arrow {
            &::before {
                border-left-color: $primary;
            }
            &::after {
                right: 1px;
                border-left-color: $white;
            }
        }
    }
    .popover-header {
        color: $black;
        background-color: $white;
        border-bottom-color: $white;
        &::before {
            border-bottom-color: $white;
        }
        .btn, .btn:hover, .btn:active {
            color: $black;
        }
    }
    .popover-body {
        color: $black;
        .btn, .btn:hover, .btn:active {
            color: $black;
        }
    }
}

.es-popover-dark {
    // styling for this color scheme will need to be added as default values for popovers are updated
    .popover-header {
        .btn, .btn:hover, .btn:active {
            color: $white;
        }
    }
    .popover-body {
        .btn, .btn:hover, .btn:active {
            color: $white;
        }
    }
}
.popover-content-wrapper {
    a {
        color: #e0eff5;
        font-weight: $font-weight-bold;
    }
}
</style>
