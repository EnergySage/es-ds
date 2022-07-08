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
            d="M3.879 1.879A3 3 0 0 1 6 1h7.56a3 3 0 0 1 2.097.855l4.44 4.342A3.003 3.003 0 0 1 21 8.342V20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 .879-2.121Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.879 1.879A3 3 0 0 1 6 1h7.56a3 3 0 0 1 2.097.855l4.44 4.342A3.003 3.003 0 0 1 21 8.342V20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 .879-2.121ZM6 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.342a1.001 1.001 0 0 0-.301-.715l-4.44-4.342A1 1 0 0 0 13.56 3H6Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13 6V2h2v4a1 1 0 0 0 1 1h4v2h-4a3 3 0 0 1-3-3Z" />
    </svg>
</template>
<script>
export default {
    name: 'PaperIcon',
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
