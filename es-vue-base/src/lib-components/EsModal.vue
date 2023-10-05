<template>
    <b-modal
        :id="id"
        :size="size"
        :scrollable="scrollable"
        :visible="visible"
        title-class="h2"
        :hide-footer="hideFooter"
        centered
        static
        class="modal-lightbox"
        v-bind="$attrs"
        v-on="$listeners">
        <template #modal-title>
            <slot name="modal-title" />
        </template>
        <template #modal-header-close>
            <XIcon
                class="text-gray-900"
                height="26px"
                width="26px" />
        </template>
        <slot />
        <template #modal-footer>
            <slot name="modal-footer" />
        </template>
    </b-modal>
</template>

<script lang="js">
import { BModal } from 'bootstrap-vue';
import XIcon from '../lib-icons/icon-x.vue';

export default {
    name: 'EsModal',
    components: {
        BModal,
        XIcon,
    },
    props: {
        /**
         * ID
         */
        id: {
            type: String,
            required: true,
        },
        /**
         * Size
         */
        size: {
            type: String,
            default: 'md',
            validator: (val) => ['sm', 'md', 'lg', 'xl'].includes(val),

        },
        /**
         * Scrollable
         */
        scrollable: {
            type: Boolean,
            default: true,
        },
        /**
         * Visible
         */
        visible: {
            type: Boolean,
            default: false,
        },
        /**
         * Hide Footer
         */
        hideFooter: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
@use "~@energysage/es-bs-base/scss/mixins/breakpoints" as breakpoints;

// TODO: Move this into es-bs-base ?
.modal-lightbox {
    @include breakpoints.media-breakpoint-down(md) {
        .modal-dialog {
            margin: 0;
            min-height: 100%;
            min-width: 100%;

            .modal-content {
                border-radius: 0;
            }
        }
    }
}
</style>
