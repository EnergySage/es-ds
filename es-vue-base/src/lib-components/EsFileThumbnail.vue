<template>
    <div>
        <!-- MOBILE PREVIEW START -->
        <div class="mobile-preview d-block d-md-none">
            <div
                class="card thumbnail-border">
                <b-row
                    align-v="center"
                    class="p-3">
                    <b-col
                        cols="2">
                        <div
                            v-if="success"
                            class="text-success p-2">
                            <icon-circle-check />
                        </div>
                        <div
                            v-if="!success && percentLoaded"
                            class="pr-1">
                            <es-progress
                                :value="percentLoaded"
                                circle
                                :show-percentage="false"
                                height="50px" />
                        </div>
                    </b-col>
                    <b-col
                        cols="8"
                        class="p-0">
                        <div class="font-weight-bolder text-gray-800 pl-0">
                            {{ fileName }}
                        </div>
                    </b-col>
                    <b-col
                        cols="2">
                        <b-link
                            class="text-gray-900 float-right icon-button"
                            @click="$emit('removeFile')">
                            <icon-trash-can />
                        </b-link>
                    </b-col>
                </b-row>
                <b-row
                    align-v="center"
                    class="px-3 pb-3">
                    <b-col cols="2" />
                    <b-col
                        cols="10"
                        class="pl-0">
                        <b-link
                            v-if="success"
                            @click="$emit('showPreview')">
                            {{ previewText }}
                        </b-link>
                    </b-col>
                </b-row>
            </div>
        </div>
        <!-- MOBILE PREVIEW END -->
        <!-- DESKTOP/TABLET PREVIEW START -->
        <div class="desktop-preview d-none d-md-block">
            <div class="thumbnail-outer-wrapper">
                <div class="float-right d-flex">
                    <b-link
                        v-if="success"
                        class="text-gray-800 text-decoration-none icon-button"
                        @click="$emit('removeFile')">
                        <icon-circle-x />
                        <div class="svg-fill-wrapper bg-white" />
                    </b-link>
                    <div
                        v-if="!success"
                        class="pt-2" />
                </div>

                <b-link
                    class="text-decoration-none text-gray-800"
                    :disabled="!success"
                    @click="$emit('showPreview')">
                    <div
                        :class="{
                            'card': true,
                            'thumbnail-inner-wrapper-x': success,
                            'thumbnail-inner-wrapper': !success,
                        }">
                        <template v-if="success">
                            <div
                                v-if="mimeType.includes('image') && fileSource"
                                class="h-100 w-100">
                                <b-img
                                    fluid
                                    class="image-preview"
                                    :src="fileSource"
                                    :alt="fileName" />
                            </div>
                            <div
                                v-else
                                class="h-100 d-flex align-items-center justify-content-center">
                                <icon-pdf-file v-if="mimeType.includes('pdf')" />
                                <icon-doc-file v-if="mimeType.includes('doc') && !(mimeType.includes('docx'))" />
                                <icon-docx-file v-if="mimeType.includes('docx')" />
                            </div>
                        </template>
                        <template v-else>
                            <div class="h-100 d-flex align-items-center justify-content-center">
                                <es-progress
                                    :value="percentLoaded"
                                    circle
                                    height="85px" />
                            </div>
                        </template>
                    </div>
                </b-link>
            </div>
            <div class="font-weight-bolder pt-2 pt-md-3">
                {{ fileName }}
            </div>
            <div
                v-if="fileSize"
                class="font-weight-normal">
                {{ fileSize }}
            </div>
        </div>
        <!-- DESKTOP/TABLET PREVIEW END -->
    </div>
</template>

<script>
import { BImg, BLink } from 'bootstrap-vue';
import IconCircleCheck from '../lib-icons/icon-circle-check.vue';
import IconCircleX from '../lib-icons/icon-circle-x.vue';
import IconDocFile from '../lib-icons/icon-doc-file.vue';
import IconDocxFile from '../lib-icons/icon-docx-file.vue';
import IconPdfFile from '../lib-icons/icon-pdf-file.vue';
import IconTrashCan from '../lib-icons/icon-trash-can.vue';

export default {
    name: 'EsFileThumbnail',
    components: {
        BImg,
        BLink,
        IconCircleCheck,
        IconCircleX,
        IconTrashCan,
        IconPdfFile,
        IconDocxFile,
        IconDocFile,
    },
    props: {
        /**
         * File Name
         * Already formatted, e.g. 'bill.png'
         *
         */
        fileName: {
            type: String,
            default: 'test.png',
            required: true,
        },
        /**
         * Mime Type
         * File format, e.g. 'application/pdf', 'image/jpg'
         */
        mimeType: {
            type: String,
            default: 'application/pdf',
            required: true,
        },
        /**
         * File Source
         * If applicable, the source of the image
         *
         */
        fileSource: {
            type: String,
            default: '',
            required: false,
        },
        /**
         * File Size
         * Already formatted, e.g. '2.4 MB'
         *
         */
        fileSize: {
            type: String,
            default: '',
            required: false,
        },
        /**
         * Text on mobile to preview the file
         *
         */
        previewText: {
            type: String,
            default: 'View preview',
            required: false,
        },
        /**
         * If the upload was successful
         */
        success: {
            type: Boolean,
            default: false,
        },
        /**
         * The progress of the upload, out of 100
         */
        percentLoaded: {
            type: Number,
            default: 0,
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.thumbnail-border {
    border: 2px solid $card-border-color;
}

.thumbnail-border-failure {
    border: 2px solid $danger;
}

.thumbnail-outer-wrapper {
    height: 165px;
    position: relative;
    width: 165px;
    z-index: 2;
    @include media-breakpoint-down(md) {
        height: 110px;
        width: 100px;
    }
}

.thumbnail-inner-wrapper-x {
    border: 2px solid $card-border-color;
    height: 160px;
    overflow: hidden;
    top: -18px;
    width: 160px;
    z-index: -1; // dragons

    @include media-breakpoint-down(md) {
        height: 105px;
        width: 95px;
    }

    &:hover {
        border: 2px solid $gray-900;
    }
}

.thumbnail-inner-wrapper {
    border: 2px solid $card-border-color;
    height: 160px;
    overflow: hidden;
    top: 8px;
    width: 160px;
    z-index: -1; // dragons

    @include media-breakpoint-down(md) {
        height: 105px;
        width: 95px;
    }
}

.icon-button {
    position: relative;
    z-index: 2;
}

a:hover {
    color: $gray-800;
}

.svg-fill-wrapper {
    border-radius: 1rem; // dragons
    height: 20px;
    position: absolute;
    right: 2px;
    top: 4px;
    width: 20px;
    z-index: -1;
}

.image-preview {
    @include media-breakpoint-up(md) {
        min-height: 100px;
    }

    @include media-breakpoint-up(lg) {
        min-height: 150px;
    }
}

</style>
