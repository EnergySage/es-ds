<template>
    <es-card class="p-100 px-sm-200 px-md-300 text-center text-lg-left">
        <b-row class="align-items-lg-center justify-content-xl-between">
            <b-col
                class="EsSupportCard-contentColumn d-lg-flex flex-lg-column justify-content-lg-center position-relative"
                cols="12"
                lg="8">
                <h2 class="align-items-center d-flex font-size-300 justify-content-center justify-content-lg-start mb-150 mb-lg-100 pl-lg-200">
                    <slot name="headline" />
                </h2>
                <b-img
                    :alt="imageAltText"
                    class="EsSupportCard-image bg-teal-200 mb-150 mb-lg-0 rounded-circle"
                    height="100px"
                    :src="imageSrc"
                    width="100px" />
                <p class="font-size-75 font-size-lg-100 mb-150 mb-lg-0 pl-lg-200">
                    <slot name="description" />
                </p>
            </b-col>
            <b-col
                cols="12"
                lg="4"
                xxl="3">
                <es-button
                    class="w-100"
                    :class="{ 'mb-100': showSecondaryCta }"
                    :href="primaryCtaUrl"
                    :target="primaryCtaTarget"
                    variant="secondary">
                    {{ primaryCtaText }}
                </es-button>
                <es-button
                    v-if="showSecondaryCta"
                    class="w-100"
                    :href="secondaryCtaUrl"
                    outline
                    :target="secondaryCtaTarget"
                    variant="secondary">
                    {{ secondaryCtaText }}
                </es-button>
            </b-col>
        </b-row>
    </es-card>
</template>

<script lang="js">
import { BCol, BImg, BRow } from 'bootstrap-vue';
import EsButton from './EsButton.vue';
import EsCard from './EsCard.vue';

export default {
    name: 'EsSupportCard',
    components: {
        BCol,
        BImg,
        BRow,
        EsButton,
        EsCard,
    },
    props: {
        imageAltText: {
            type: String,
            required: true,
        },
        imageSrc: {
            type: String,
            required: true,
        },
        primaryCtaTarget: {
            type: String,
            default: '_blank',
        },
        primaryCtaText: {
            type: String,
            required: true,
        },
        primaryCtaUrl: {
            type: String,
            required: true,
        },
        secondaryCtaTarget: {
            type: String,
            default: '_blank',
        },
        secondaryCtaText: {
            type: String,
            default: '',
        },
        secondaryCtaUrl: {
            type: String,
            default: '',
        },
    },
    computed: {
        showSecondaryCta() {
            return !!this.secondaryCtaText && !!this.secondaryCtaUrl;
        },
    },
};
</script>

<style lang="scss">
@import '~@energysage/es-bs-base/scss/includes';

@include media-breakpoint-up(lg) {
    .EsSupportCard {
        &-contentColumn {
            /* account for the size of the image */
            min-height: 100px;
            /* 15px standard column padding + 100px image width */
            padding-left: 115px;
        }

        &-image {
            /* account for 15px standard column padding */
            left: 15px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
