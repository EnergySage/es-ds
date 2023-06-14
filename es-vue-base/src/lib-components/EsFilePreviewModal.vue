<template>
    <es-modal
        :id="`preview-modal-${fileName}`"
        hide-footer
        :visible="visible"
        size="xl"
        body-class="border-top p-0"
        @hidden="$emit('hidden')">
        <template #modal-title>
            <div class="d-none d-md-block">
                <slot name="desktop-header" />
            </div>
            <div class="d-md-none d-lock">
                {{ fileName }}
            </div>
        </template>
        <div class="d-md-none d-block file-preview text-center">
            <b-img
                fluid
                rounded="bottom"
                class="file-preview"
                :src="fileSource"
                :alt="fileName" />
        </div>
        <div class="d-none d-md-block">
            <div class="px-450 py-200 bg-gray-200">
                <div class="card bg-white file-preview">
                    <div class="font-weight-bolder border-bottom p-100">
                        {{ fileName }}
                    </div>
                    <b-img
                        fluid
                        rounded="bottom"
                        class="file-preview"
                        :src="fileSource"
                        :alt="fileName" />
                </div>
            </div>
        </div>
    </es-modal>
</template>

<script lang="js">
import { BImg } from 'bootstrap-vue';
import EsModal from './EsModal.vue';

export default {
    name: 'EsFilePreviewModal',
    components: {
        EsModal,
        BImg,
    },
    props: {
        /**
         * Visible
         *
         */
        visible: {
            type: Boolean,
            default: false,
            required: false,
        },
        /**
         * File Name
         * Already formatted, e.g. 'bill.png'
         *
         */
        fileName: {
            type: String,
            default: 'test.png',
            required: false,
        },
        /**
         * File Source
         * Pre-signed URL that leads directly to image
         *
         */
        fileSource: {
            type: String,
            default: '',
            required: false,
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.rounded-bottom {
    border-bottom-left-radius: $card-inner-border-radius !important;
    border-bottom-right-radius: $card-inner-border-radius !important;
}

</style>
