<template>
    <es-modal
        :id="`preview-modal-${fileName}`"
        hide-footer
        :visible="visible"
        size="xl"
        body-class="border-top p-0"
        @hidden="$emit('hidden')">
        <template #modal-title>
            {{ fileName }}
        </template>
        <div class="d-md-none d-block file-preview text-center">
            <b-img
                fluid
                :lazy="true"
                class="file-preview"
                :src="fileSource"
                :alt="fileName" />
        </div>
        <div class="d-none d-md-block">
            <div class="px-450 py-200 bg-gray-200">
                <div class="card bg-white file-preview">
                    <b-img
                        fluid
                        :lazy="true"
                        class="file-preview rounded-img"
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
         * Image or file source for preview
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

.rounded-img {
    border-radius: $card-inner-border-radius !important;
}

</style>
