<script lang="ts">
export default {
    name: 'IconLinkOut',
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
            d="M5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5a1 1 0 1 1 2 0v5a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h5a1 1 0 1 1 0 2H5Zm10.076-1.383A1 1 0 0 1 16 2h5a.997.997 0 0 1 1 1v5a1 1 0 0 1-1.707.707L18.5 6.914l-4.293 4.293a1 1 0 0 1-1.414-1.414L17.086 5.5l-1.793-1.793a1 1 0 0 1-.217-1.09ZM19.914 5.5l.086.086v-.172l-.086.086ZM18.586 4l-.086.086L18.414 4h.172Z" />
    </svg>
</template>
