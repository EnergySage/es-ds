<script lang="ts">
export default {
    name: 'IconEnvelope',
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
            d="M1.879 3.879A3 3 0 0 1 4 3h16a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6a3 3 0 0 1 .879-2.121Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4ZM1.879 3.879A3 3 0 0 1 4 3h16a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6a3 3 0 0 1 .879-2.121Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="m8.876 14.782-7.5-6.001 1.249-1.562 7.5 6.001a3 3 0 0 0 3.75 0l7.5-6 1.25 1.56-7.501 6.002a5 5 0 0 1-6.248 0Z" />
    </svg>
</template>
