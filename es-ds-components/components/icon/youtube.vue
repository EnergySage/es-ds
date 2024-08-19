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
            d="m13.4 19 5.5-3-5.5-3.3v6.4Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.5.4a15.5 15.5 0 1 0 0 31 15.5 15.5 0 0 0 0-31ZM26.1 15V16.9a18 18 0 0 1-.4 4c0 .5-.3.9-.6 1.2-.4.4-.9.6-1.4.7-1 .3-2.7.5-6.3.5h-1.6c-8.6 0-8.7-.3-9.6-1l-.2-.2-.7-1a17.5 17.5 0 0 1-.4-4.3V14.9c0-1.4.1-2.7.4-4 .1-.5.3-.9.7-1.2.3-.4.8-.6 1.3-.7 1-.3 2.8-.5 6.3-.5h1.6c8.6 0 8.7.3 9.6 1l.2.2c.3.3.6.7.7 1.1A17.5 17.5 0 0 1 26 15Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconYoutube',
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
