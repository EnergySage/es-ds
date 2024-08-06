<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 32"
        fill="currentColor">
        <path
            d="M44.9 0h-40A4.9 4.9 0 0 0 0 4.8v22a5 5 0 0 0 4.8 5h40a5 5 0 0 0 4.9-5v-22c0-2.6-2.2-4.8-4.9-4.8Zm-40 1.7h40c1.7 0 3.1 1.4 3.1 3.1v3.8H1.7V4.8c0-1.7 1.4-3.1 3.1-3.1Zm40 28.3h-40a3.1 3.1 0 0 1-3.2-3V10.3H48V27c0 1.7-1.4 3.1-3.1 3.1ZM16 20.8c0 .4-.4.8-.9.8H6a.8.8 0 1 1 0-1.7h9.3c.5 0 .9.4.9.9Z"
            fill-rule="evenodd" />
    </svg>
</template>
<script>
export default {
    name: 'IconCreditCard',
    props: {
        /**
         * Width
         */
        width: {
            type: String,
            default: '32px',
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
