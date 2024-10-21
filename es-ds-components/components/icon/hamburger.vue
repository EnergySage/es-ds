<script>
export default {
    name: 'IconHamburger',
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
            d="M2 5c0-.55228.44772-1 1-1h18c.5523 0 1 .44772 1 1s-.4477 1-1 1H3c-.55228 0-1-.44772-1-1Zm0 7c0-.5523.44772-1 1-1h18c.5523 0 1 .4477 1 1s-.4477 1-1 1H3c-.55228 0-1-.4477-1-1Zm0 7c0-.5523.44772-1 1-1h18c.5523 0 1 .4477 1 1s-.4477 1-1 1H3c-.55228 0-1-.4477-1-1Z" />
    </svg>
</template>
