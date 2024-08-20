<!-- eslint-disable max-len -->
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
            d="M4.227 6.366A1 1 0 0 1 5 6h13.79a3 3 0 0 1 2.985 3.299l-.6 6A3 3 0 0 1 18.19 18H8.64a3.001 3.001 0 0 1-2.943-2.412L4.02 7.196a1 1 0 0 1 .208-.83Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.227 6.366A1 1 0 0 1 5 6h13.79a3 3 0 0 1 2.985 3.299l-.6 6A3 3 0 0 1 18.19 18H8.64a3.001 3.001 0 0 1-2.943-2.412L4.02 7.196a1 1 0 0 1 .208-.83ZM6.22 8l1.439 7.196a1 1 0 0 0 .98.804h9.551a1 1 0 0 0 .995-.9l.6-6A1 1 0 0 0 18.79 8H6.22Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 3a1 1 0 0 1 1-1h1.22a2 2 0 0 1 1.94 1.514l.81 3.244a1 1 0 0 1-1.94.484L3.22 4H2a1 1 0 0 1-1-1Zm6 18a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm8 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconCart',
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
