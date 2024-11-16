<script setup lang="ts">
const props = defineProps({
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
});
</script>

<template>
    <es-card
        class="align-items-center d-flex flex-column py-200 text-center"
        :class="props.horizontalPadding"
        v-bind="$attrs">
        <!-- avoiding use of an <h2> tag here for long-form content SEO reasons,
            but preserving heading semantics for screen readers -->
        <div
            role="heading"
            aria-level="2"
            class="font-weight-semibold font-size-300"
            :class="[{ 'order-1': props.imageFirst }, props.verticalSpacing]">
            <slot name="heading"> Easily find what solar costs in your area </slot>
        </div>
        <div
            v-if="$slots.image"
            class="mx-auto w-100"
            :class="props.verticalSpacing">
            <slot name="image" />
        </div>
        <div
            class="w-100"
            :class="{ 'order-2': props.imageFirst }">
            <div
                v-if="$slots.subtitle"
                class="es-cta-card-subtitle"
                :class="props.verticalSpacing">
                <slot name="subtitle" />
            </div>
            <slot name="cta" />
        </div>
    </es-card>
</template>

<style lang="scss" scoped>
.es-cta-card {
    &-subtitle {
        :deep(p:last-child) {
            margin-bottom: 0;
        }
    }
}
</style>
