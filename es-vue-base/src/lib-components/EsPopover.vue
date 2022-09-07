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
            <div class="d-flex">
                <slot />
                <div v-if="!hasTitle">
                    <EsButton
                        variant="link"
                        class="p-0 float-right"
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
            default: 'es-popover-light',
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
        background-color: $white !important;
        border: 1px solid !important;
        border-color: $primary;
    }
    .arrow::after {
        border-bottom-color: $white !important;
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
        // background-color: white;

        color: $black;
        .btn, .btn:hover, .btn:active {
            color: $black;
        }
    }
}

    // .bs-popover-top {
    //     > .arrow {
    //         &::before {
    //             border-top-color: $pink;
    //         }
    //         &::after {
    //             border-top-color: $pink;
    //         }
    //     }
    // }
    // .bs-popover-left {
    //     > .arrow {
    //         &::before {
    //             border-left-color: $pink;
    //         }
    //         &::after {
    //             border-left-color: $pink;
    //         }
    //     }
    // }
    // .bs-popover-right {
    //     > .arrow {
    //         &::before {
    //             border-right-color: $pink;
    //         }
    //         &::after {
    //             border-right-color: $pink;
    //         }
    //     }
    // }
.es-popover-dark {
    &.popover {
        background-color: $gray-900 !important;
    }
    .popover-header {
        color: $white;
        background-color: $gray-900;
        border-bottom-color: $gray-900;
        &::before {
            border-bottom-color: $gray-900;
        }
        .btn, .btn:hover, .btn:active {
            color: $white;
        }
    }
    .popover-body {
        color: $white;
        .btn, .btn:hover, .btn:active {
            color: $white;
        }
    }
}
</style>
