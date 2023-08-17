<template>
    <es-card
        class="align-items-center d-flex flex-column py-200 text-center"
        :class="horizontalPadding"
        v-bind="$attrs"
        v-on="$listeners">
        <!-- avoiding use of an <h2> tag here for long-form content SEO reasons,
            but preserving heading semantics for screen readers" -->
        <div
            role="heading"
            aria-level="2"
            class="font-weight-semibold font-size-300"
            :class="[{ 'order-1': imageFirst }, verticalSpacing]">
            <slot name="heading">
                Easily find what solar costs in your area
            </slot>
        </div>
        <div
            v-if="$slots.image"
            class="mx-auto w-100"
            :class="verticalSpacing">
            <slot name="image" />
        </div>
        <div
            class="w-100"
            :class="{ 'order-2': imageFirst }">
            <div
                v-if="$slots.subtitle"
                class="EsCtaCard-subtitle"
                :class="verticalSpacing">
                <slot name="subtitle" />
            </div>
            <slot name="cta" />
        </div>
    </es-card>
</template>

<script lang="js">
import EsCard from './EsCard.vue';

export default {
    name: 'EsCtaCard',
    components: {
        EsCard,
    },
    props: {
        imageFirst: {
            type: Boolean,
            default: false,
        },
        horizontalPadding: {
            type: String,
            default: 'px-100',
        },
        verticalSpacing: {
            type: String,
            default: 'mb-150',
        },
    },
};
</script>

<style lang="scss" scoped>
.EsCtaCard {
    &-subtitle {
        ::v-deep p:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
