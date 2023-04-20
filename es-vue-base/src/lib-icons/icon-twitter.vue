<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 31 32"
        fill="currentColor">
        <path
            fill="none"
            d="M0 .4h31v31H0z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.5.4a15.5 15.5 0 1 0 0 31 15.5 15.5 0 0 0 0-31Zm8.6 11v.7A12.6 12.6 0 0 1 4.7 22.7h1c2 0 4-.6 5.5-1.8a4.5 4.5 0 0 1-4.1-3.1 4.2 4.2 0 0 0 2-.1 4.5 4.5 0 0 1-3.6-4.3v-.1c.6.3 1.3.5 2 .6a4.5 4.5 0 0 1-1.3-6 12.6 12.6 0 0 0 9.2 4.7l-.2-1A4.5 4.5 0 0 1 23 8.5c1-.2 2-.6 2.9-1-.4 1-1 1.8-2 2.4.9-.1 1.8-.3 2.6-.7-.6.9-1.4 1.7-2.3 2.3Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconTwitter',
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
