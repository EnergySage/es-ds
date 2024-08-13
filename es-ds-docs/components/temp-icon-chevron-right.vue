<script setup lang="ts">
// NOTE: This is temporary and should be replaced by an icon in es-ds-components
const props = defineProps({
    /**
        * Width
        */
    width: {
        type: String,
        default: '24px',
        required: false,
    },
    /**
        * Height
        */
    height: {
        type: String,
        default: '24px',
        required: false,
    },
});
</script>

<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.293 3.293a1 1 0 0 1 1.414 0l8 8a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414-1.414L14.586 12 7.293 4.707a1 1 0 0 1 0-1.414Z" />
    </svg>
</template>
