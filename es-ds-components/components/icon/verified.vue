<script lang="ts">
export default {
    name: 'IconVerified',
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path
            d="M21.231 11.156v.85a9.231 9.231 0 1 1-5.474-8.438m5.474 1.053-9.23 9.24-2.77-2.77"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
</template>
