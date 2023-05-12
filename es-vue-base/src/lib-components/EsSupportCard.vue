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
                <div class="EsSupportCard-imageContainer mb-150 mb-lg-0">
                    <slot name="image">
                        <b-img
                            v-if="imageAltText && imageSrc"
                            :alt="imageAltText"
                            class="bg-teal-200 rounded-circle"
                            height="100px"
                            :src="imageSrc"
                            width="100px" />
                    </slot>
                </div>
                <!--
                    we are giving 'EsSupportCard-description' a unique class (that we don't use directly in this
                    component) for consuming applications to use in targeting ::v-deep styles on <p> tags to remove
                    the natural <p> bottom margin, for example.

                    e.g. a CMS rich text component may generate a <p> tag within this that automatically
                    gets a bottom margin, which throws off the vertical centering. we are intentionally leaving
                    the removal of that bottom margin up to consuming applications rather than removing it on all
                    <p> tags within this element, in case they may want two <p> tags or any other markup in here.
                -->
                <div class="EsSupportCard-description font-size-75 font-size-lg-100 mb-150 mb-lg-0 pl-lg-200">
                    <slot name="description" />
                </div>
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
            default: '',
        },
        imageSrc: {
            type: String,
            default: '',
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

        &-imageContainer {
            /* account for 15px standard column padding */
            left: 15px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
