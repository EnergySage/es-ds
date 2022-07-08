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
            d="M7.879 1.879A3 3 0 0 1 10 1h4.685a3 3 0 0 1 2.097.855l3.315 3.242A3 3 0 0 1 21 7.242V16a3 3 0 0 1-3 3h-1v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h1V4a3 3 0 0 1 .879-2.121Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.879 1.879A3 3 0 0 1 10 1h4.685a3 3 0 0 1 2.097.855l3.315 3.242A3 3 0 0 1 21 7.242V16a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3V4a3 3 0 0 1 .879-2.121ZM10 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7.242a1.001 1.001 0 0 0-.301-.715l-3.315-3.242A1 1 0 0 0 14.685 3H10Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 8a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2a1 1 0 1 1 2 0v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h2a1 1 0 0 1 0 2H6Z" />
    </svg>
</template>
<script>
export default {
    name: 'CopyIcon',
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
