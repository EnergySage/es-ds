<script>
export default {
    name: 'IconLockOn',
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
            d="M2 12a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-8Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 11a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H5Zm-3 1a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-8Z" />
        <path
            d="M6.172 3.172A4 4 0 0 1 9 2h6a4 4 0 0 1 4 4v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a4 4 0 0 1 1.172-2.828Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 4a2 2 0 0 0-2 2v3h10V6a2 2 0 0 0-2-2H9Zm-2.828-.828A4 4 0 0 1 9 2h6a4 4 0 0 1 4 4v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a4 4 0 0 1 1.172-2.828Z" />
    </svg>
</template>
