<script setup lang="ts">
import Skeleton from 'primevue/skeleton';

defineProps({
    animation: {
        type: String,
        default: 'wave',
        validator: (val: string) => ['wave', 'fade', 'none'].includes(val as string),
    },
    height: {
        type: String,
        default: '1rem',
    },
    width: {
        type: String,
        default: 'auto',
    },
    size: {
        type: String,
        default: null,
    },
});

</script>

<template>
    <skeleton
        :height="size ? size : height"
        :width="size ? size : width"
        class="es-skeleton rounded-xs mb-25 bg-gray-200"
        :class="{
            'es-skeleton-wave': animation=='wave',
            'es-skeleton-fade': animation=='fade'}" />
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

@keyframes skeleton-animate-wave {
    0% {transform: translateX(-100%);}
    100% {transform: translateX(100%);}
}

@keyframes skeleton-animate-fade {
    0% {opacity: 1;}
    100% {opacity: .4;}
}

.es-skeleton {
    overflow: hidden;

    &-wave:after {
        content: "";
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        z-index: 1;
        // wave animation from PrimeVue Skeleton
        background-image: linear-gradient(90deg, rgba(variables.$white, 0), rgba(variables.$white, 0.4), rgba(variables.$white, 0));
        animation-name: skeleton-animate-wave;
        animation-duration: 1.2s;
        animation-timing-function: ease;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: normal;
        animation-fill-mode: none;
        animation-play-state: running;
    }

    &-fade {
        // fade animation from Bootstrap Skeleton
        animation-name: skeleton-animate-fade;
        animation-duration: 0.875s;
        animation-timing-function: ease-in-out;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-fill-mode: none;
        animation-play-state: running;
    }
}
</style>
