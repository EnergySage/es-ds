<script lang="ts">
export default {
    name: 'IconPlay',
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
            d="M6.257 3.033c.09.024.176.06.254.107l14.196 8.153a1.004 1.004 0 0 1 .205 1.117.996.996 0 0 1-.43.467l-13.97 7.982a.993.993 0 0 1-.614.136.995.995 0 0 1-.711-.413.996.996 0 0 1-.187-.6V4.018a.994.994 0 0 1 .498-.883.994.994 0 0 1 .759-.102Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.511 3.14a.994.994 0 0 0-1.013-.005.994.994 0 0 0-.498.883v15.964a.994.994 0 0 0 .498.883.994.994 0 0 0 1.013-.005l13.97-7.983a.997.997 0 0 0 .387-1.373c-.045-.08-.1-.15-.16-.211M17.983 12 7 18.277V5.723L17.984 12Z" />
    </svg>
</template>
