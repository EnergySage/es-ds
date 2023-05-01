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
            d="M15.5.4a15.5 15.5 0 1 0 0 31 15.5 15.5 0 0 0 0-31Zm5.7 8.1h-2a2 2 0 0 0-1.6.5c-.3.4-.4 1-.4 1.4V13h3.9l-.5 4h-3.4v10h-4V17H9.8v-4h3.4v-2.8a5.1 5.1 0 0 1 1.3-3.9A5 5 0 0 1 18.2 5l3 .1v3.5Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconFacebook',
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
