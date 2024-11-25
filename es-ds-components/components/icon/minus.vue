<script lang="ts">
export default {
    name: 'IconMinus',
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
            d="M3 12a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z" />
    </svg>
</template>
