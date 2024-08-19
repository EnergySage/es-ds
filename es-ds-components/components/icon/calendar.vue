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
            d="M6 3a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h12a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5H6Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6ZM1 8a5 5 0 0 1 5-5h12a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5V8Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 1a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1ZM1 10a1 1 0 0 1 1-1h20a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconCalendar',
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
