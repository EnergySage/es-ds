<script lang="ts">
export default {
    name: 'IconSearch',
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
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            d="M10.5 3.545a6.955 6.955 0 1 0 0 13.91 6.955 6.955 0 0 0 0-13.91ZM2 10.5a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0Z"
            clip-rule="evenodd" />
        <path
            fill-rule="evenodd"
            d="M15.293 16.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414Z"
            clip-rule="evenodd" />
    </svg>
</template>
