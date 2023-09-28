<template>
    <div>
        <!-- MOBILE PREVIEW START -->
        <div
            class="mobile-preview"
            :class="mobileView ? '' : 'd-block d-md-none'">
            <div
                class="card thumbnail-border">
                <b-row
                    align-v="center"
                    class="p-3">
                    <b-col
                        cols="2">
                        <div
                            v-if="!loading"
                            class="text-success p-0">
                            <icon-circle-check />
                        </div>
                        <div v-else>
                            <es-progress-circle
                                :value="percentLoaded"
                                :show-percentage="false"
                                height="24px" />
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
                            aria-label="close-file-mobile"
                            @click="$emit('removeFile',fileName)">
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
                        <template v-if="mimeType && mimeType.includes('image') && fileSource">
                            <b-link
                                v-if="!loading"
                                aria-label="show-preview-mobile-image"
                                @click="$emit('showPreview',fileName)">
                                {{ previewText }}
                            </b-link>
                        </template>
                        <template v-else>
                            <b-link
                                v-if="!loading"
                                aria-label="show-preview-mobile-file"
                                :href="fileSource"
                                target="_blank">
                                {{ previewText }}
                            </b-link>
                        </template>
                    </b-col>
                </b-row>
            </div>
        </div>
        <!-- MOBILE PREVIEW END -->
        <!-- DESKTOP/TABLET PREVIEW START -->
        <div
            class="desktop-preview"
            :class="mobileView ? 'd-none' : 'd-none d-md-block'">
            <div class="thumbnail-outer-wrapper position-relative">
                <div class="float-right d-flex">
                    <b-link
                        v-if="!loading"
                        aria-label="close-file-desktop"
                        class="text-gray-800 text-decoration-none icon-button"
                        @click="$emit('removeFile',fileName)">
                        <icon-circle-x />
                        <div class="svg-fill-wrapper bg-white" />
                    </b-link>
                </div>

                <b-link
                    v-if="mimeType.includes('image')"
                    class="text-decoration-none text-gray-800"
                    aria-label="show-preview-desktop-image"
                    :disabled="loading"
                    @click="$emit('showPreview',fileName)">
                    <div
                        :class="{
                            'card': true,
                            'overflow-hidden': !loading,
                            'thumbnail-inner-wrapper-x': !loading,
                            'thumbnail-inner-wrapper': loading,
                        }">
                        <template v-if="!loading">
                            <div class="h-100">
                                <b-img
                                    class="image-preview"
                                    :src="fileSource"
                                    :alt="fileName" />
                            </div>
                        </template>
                        <template v-else>
                            <div class="h-100 d-flex align-items-center justify-content-center">
                                <es-progress-circle
                                    v-if="percentLoaded"
                                    :show-percentage="percentLoaded"
                                    :value="percentLoaded"
                                    circle
                                    height="65px" />
                                <b-spinner
                                    v-if="!percentLoaded"
                                    role="status"
                                    label="Loading" />
                            </div>
                        </template>
                    </div>
                </b-link>
                <b-link
                    v-if="mimeType.includes('application')"
                    class="text-decoration-none text-gray-800"
                    aria-label="show-preview-desktop-file"
                    :disabled="loading"
                    :href="fileSource"
                    target="_blank">
                    <div
                        :class="{
                            'card': true,
                            'overflow-hidden': !loading,
                            'thumbnail-inner-wrapper-x': !loading,
                            'thumbnail-inner-wrapper': loading,
                        }">
                        <template v-if="!loading">
                            <div
                                class="h-100 d-flex align-items-center justify-content-center">
                                <icon-file-pdf v-if="mimeType.includes('pdf')" />
                                <icon-file-docx v-else-if="mimeType.includes('docx')" />
                                <icon-file-doc v-else />
                            </div>
                        </template>
                        <template v-else>
                            <div class="h-100 d-flex align-items-center justify-content-center">
                                <es-progress-circle
                                    :value="percentLoaded"
                                    height="65px" />
                            </div>
                        </template>
                    </div>
                </b-link>
            </div>
            <div class="font-weight-bolder text-truncate pt-2 pt-md-3">
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
import IconFileDoc from '../lib-icons/icon-file-doc.vue';
import IconFileDocx from '../lib-icons/icon-file-docx.vue';
import IconFilePdf from '../lib-icons/icon-file-pdf.vue';
import IconTrashCan from '../lib-icons/icon-trash-can.vue';
import EsProgressCircle from './EsProgressCircle.vue';

export default {
    name: 'EsFileThumbnail',
    components: {
        BImg,
        BLink,
        IconCircleCheck,
        IconCircleX,
        IconTrashCan,
        IconFilePdf,
        IconFileDocx,
        IconFileDoc,
        EsProgressCircle,
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
            required: false,
        },
        /**
         * Mime Type
         * File format, e.g. 'application/pdf', 'image/jpg'
         */
        mimeType: {
            type: String,
            default: 'application/pdf',
            required: false,
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
         * The progress of the upload, out of 100
         */
        percentLoaded: {
            type: Number,
            default: 0,
        },
        /**
         * To show the mobile view in desktop
         */
        mobileView: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        loading() {
            return (this.percentLoaded !== 100);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.desktop-preview {
    width: 165px;
}

.thumbnail-border {
    border: 2px solid $card-border-color;
}

.thumbnail-border-failure {
    border: 2px solid $danger;
}

.thumbnail-outer-wrapper {
    height: 165px;
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
    top: -18px;
    width: 160px;
    z-index: -1;

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
    z-index: -1;

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
    border-radius: 1rem;
    height: 20px;
    position: absolute;
    right: 2px;
    top: 4px;
    width: 20px;
    z-index: -1;
}

.image-preview {
    height: 200%;
    float: left;
}
</style>
