<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 28"
        fill="currentColor">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14Zm0-14.425c-.724-1.49-2.697-4.264-4.532-5.633C8.145 6.955 6 6.191 6 8.622c0 .486.28 4.079.444 4.662.571 2.029 2.653 2.546 4.504 2.233-3.236.547-4.06 2.36-2.281 4.173 3.376 3.443 4.852-.864 5.23-1.967.07-.203.102-.297.103-.217 0-.08.033.014.102.216v.001c.38 1.104 1.856 5.41 5.231 1.967 1.778-1.813.955-3.626-2.28-4.173 1.85.313 3.931-.204 4.503-2.232.164-.584.444-4.177.444-4.663 0-2.431-2.145-1.667-3.468-.68-1.834 1.369-3.807 4.144-4.532 5.633Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconBluesky',
    props: {
        /**
         * Width
         */
        width: {
            type: String,
            default: '31px',
            required: false,
        },
        /**
         * Height
         */
        height: {
            type: String,
            default: '32px',
            required: false,
        },
    },
};
</script>
