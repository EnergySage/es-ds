<script setup lang="ts">
const props = defineProps({
    constrained: {
        type: Boolean,
        default: false,
    },
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
});

const showSecondaryCta = computed(() => {
    return !!props.secondaryCtaText && !!props.secondaryCtaUrl;
});
</script>

<template>
    <es-card
        class="p-100 px-sm-200 text-center text-lg-left"
        :class="{
            'px-md-100 py-md-200': constrained,
            'px-md-300': !constrained,
        }">
        <es-row class="align-items-lg-center justify-content-xl-between">
            <es-col
                class="EsSupportCard-contentColumn d-flex flex-column justify-content-lg-center position-relative"
                :class="{ 'pr-lg-0': constrained }"
                cols="12"
                lg="8">
                <!-- h2 is first in DOM order for semantics; using order utility classes to rearrange -->
                <h2
                    class="align-items-center d-flex font-size-300 justify-content-center justify-content-lg-start mb-150 mb-lg-100 order-1"
                    :class="{
                        'pl-lg-100': constrained,
                        'pl-lg-200': !constrained,
                    }">
                    <slot name="headline" />
                </h2>
                <div class="EsSupportCard-imageContainer mb-150 mb-lg-0 order-0">
                    <slot name="image">
                        <nuxt-img
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
                <div
                    class="EsSupportCard-description font-size-75 font-size-lg-100 mb-150 mb-lg-0 order-2"
                    :class="{
                        'pl-lg-100': constrained,
                        'pl-lg-200': !constrained,
                    }">
                    <slot name="description" />
                </div>
            </es-col>
            <es-col
                cols="12"
                lg="4"
                xxl="3">
                <es-button
                    class="w-100"
                    :class="{ 'mb-100': showSecondaryCta }"
                    :href="primaryCtaUrl"
                    :target="primaryCtaTarget"
                    variant="primary">
                    {{ primaryCtaText }}
                </es-button>
                <es-button
                    v-if="showSecondaryCta"
                    class="w-100"
                    :href="secondaryCtaUrl"
                    outline
                    :target="secondaryCtaTarget"
                    variant="primary">
                    {{ secondaryCtaText }}
                </es-button>
            </es-col>
        </es-row>
    </es-card>
</template>

<style lang="scss">
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

@include breakpoints.media-breakpoint-up(lg) {
    .EsSupportCard {
        &-contentColumn {
            /* account for the size of the image */
            min-height: 100px;
            /* 15px standard column padding + 100px image width */
            padding-left: 115px;
        }

        &-description {
            /* limit line length on larger breakpoints */
            max-width: 450px;
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
