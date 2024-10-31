<!-- eslint-disable max-len -->
<script lang="ts">
export default {
    name: 'IconCheck',
    props: {
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
    },
};
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
            d="M20.64 5.232a1 1 0 0 1 .128 1.408l-10 12a1 1 0 0 1-1.475.067l-6-6a1 1 0 1 1 1.414-1.414l5.226 5.226 9.299-11.16a1 1 0 0 1 1.408-.127Z" />
    </svg>
</template>
