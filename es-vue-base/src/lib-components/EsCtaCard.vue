<template>
    <div class="EsCtaCard">
        <EsCard
            :href="url || null"
            :tag="url ? 'b-link' : 'div'"
            :target="cardTarget"
            class="EsCtaCard"
            :class="{ 'bg-gray text-white': dark }"
            :variant="url ? 'interactive' : 'display'"
            v-bind="$attrs"
            v-on="$listeners">
            <div class="flex-layout-outer">
                <div
                    v-if="headingFirst"
                    class="h3 heading-first text-center"
                    :class="{ 'text-white': dark }">
                    {{ heading }}
                </div>
                <div
                    v-if="image"
                    class="image-wrapper"
                    :style="`width:${imageWidth}; height:${imageHeight};`">
                    <img
                        lazy
                        class="image d-block h-100 w-100"
                        :width="imageWidth"
                        :height="imageHeight"
                        :src="image"
                        :alt="imageAltText">
                </div>
                <div class="flex-layout-inner d-flex justify-content-center w-100">
                    <div class="content-area d-flex flex-column">
                        <div
                            class="h3 heading-default"
                            :class="[subtitle ? 'mb-50' : 'mb-0', { 'text-white': dark, 'd-none': headingFirst }]">
                            {{ heading }}
                        </div>
                        <div v-if="subtitle">
                            {{ subtitle }}
                        </div>
                    </div>
                    <slot name="cta" />
                </div>
            </div>
        </EsCard>
    </div>
</template>

<script lang="js">
import EsCard from './EsCard.vue';

export default {
    name: 'EsCtaCard',
    components: {
        EsCard,
    },
    props: {
        contextDomain: {
            type: String,
            default: '',
        },
        dark: {
            type: Boolean,
            default: false,
        },
        heading: {
            type: String,
            required: true,
        },
        headingFirst: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            default: '',
        },
        imageAltText: {
            type: String,
            default: '',
        },
        imageHeight: {
            type: String,
            default: '',
        },
        imageWidth: {
            type: String,
            default: '',
        },
        subtitle: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            default: '',
        },
    },
    computed: {
        newTab() {
            if (window?.location) {
                return !this.url?.includes(window?.location?.host);
            }
            // Any string includes '', so this defaults to false
            return !this.url?.includes(this.contextDomain);
        },
        cardTarget() {
            return this.newTab ? '_blank' : '_self';
        },
    },
};
</script>
<style lang="scss" scoped>
@use 'sass:map';
@import '~@energysage/es-bs-base/scss/includes';
@import '~@energysage/es-bs-base/scss/bootstrap';
.EsCtaCard {
    .flex-layout-outer {
        container-name: outer;
        container-type: inline-size;
    }

    .flex-layout-inner {
        flex-direction: column;
    }

    .image-wrapper {
        margin: 0 auto map.get($spacers, 100);
    }

    .image {
        object-fit: contain;
    }

    .content-area {
        align-items: center;
        margin-bottom: map.get($spacers, 100);
        text-align: center;
    }

    .form-area {
        align-items: center;
        container-name: form;
        container-type: inline-size;
        text-align: center;
    }

    @container card (min-width: 600px) {
        .flex-layout-outer {
            display: flex;
        }

        .image-wrapper {
            margin: 0 map.get($spacers, 100) 0 0;
        }

        .heading-default {
            display: block !important;
        }

        .heading-first {
            display: none;
        }
    }

    @container outer (min-width: 700px) {
        .flex-layout-inner {
            flex-direction: row;
        }

        .content-area {
            align-items: start;
            margin-block: auto;
            margin-right: map.get($spacers, 50);
            text-align: start;
            width: 50%;
        }

        .form-area {
            align-items: end;
            margin-block: auto;
            margin-left: map.get($spacers, 50);
            text-align: end;
            width: 50%;
        }
    }

    @container form (max-width: 389px) {
        .cta-button {
            width: 100%;
        }
    }
}
</style>
