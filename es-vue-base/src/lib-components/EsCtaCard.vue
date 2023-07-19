<template>
    <EsCard
        :href="url || null"
        :tag="url ? 'b-link' : 'div'"
        :target="newTab ? '_blank' : '_self'"
        :variant="url ? 'interactive' : 'display'"
        class="d-inline-block"
        :class="{'d-lg-inline-flex': !narrow}"
        v-bind="$attrs"
        v-on="$listeners">
        <div>
            <div
                v-if="headingFirst"
                class="h3 text-center"
                :class="{'d-lg-none': !narrow}">
                {{ heading }}
            </div>
            <div
                v-if="image"
                class="mx-auto mb-100"
                :class="{'mr-lg-150 mb-lg-0': !narrow}"
                :style="`width:${imageWidth}; height:${imageHeight};`">
                <b-img
                    :lazy="lazy"
                    class="image d-block h-100 w-100"
                    :width="imageWidth"
                    :height="imageHeight"
                    :src="image"
                    :alt="imageAltText" />
            </div>
            <slot name="image" />
        </div>
        <div
            class="text-center"
            :class="{'text-lg-left my-lg-auto': !narrow}">
            <div
                class="h3"
                :class="{ 'd-none': headingFirst, 'd-lg-block': !narrow}">
                {{ heading }}
            </div>
            <p v-if="subtitle">
                {{ subtitle }}
            </p>
            <slot name="cta" />
        </div>
    </EsCard>
</template>

<script lang="js">
import { BImg } from 'bootstrap-vue';
import EsCard from './EsCard.vue';

export default {
    name: 'EsCtaCard',
    components: {
        BImg,
        EsCard,
    },
    props: {
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
        lazy: {
            type: Boolean,
            default: true,
        },
        narrow: {
            type: Boolean,
            default: false,
        },
        newTab: {
            type: Boolean,
            default: false,
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
};
</script>
