<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 57 55"
        fill="currentColor">
        <path
            d="M55.2 48.5H53v-3.7c0-.5-.4-.8-.9-.8h-3.5V21.3H54a.8.8 0 0 0 .5-1.6l-26-18.6a.9.9 0 0 0-1 0L1.7 19.7c-.3.3-.4.6-.3 1 0 .3.4.6.8.6h5.2V44H3.9c-.4 0-.8.3-.8.8v3.7H.8c-.4 0-.8.4-.8.8v4.5c0 .5.4.9.8.9h54.4c.5 0 .8-.4.8-.9v-4.5c0-.4-.3-.8-.8-.8ZM46.9 44h-4.5V21.3H47V44ZM32 44V21.3h8.7V44H32Zm-16.6 0V21.3H24V44h-8.6Zm10.3-22.7h4.6V44h-4.6V21.3ZM28 2.8l23.2 16.8H4.8L28 2.8ZM9 21.3h4.7V44H9V21.3ZM4.9 45.7h46.5v2.8H4.8v-2.8ZM54.3 53H1.7v-2.8h52.6V53Z"
            fill-rule="evenodd" />
    </svg>
</template>
<script>
export default {
    name: 'IconBank',
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
