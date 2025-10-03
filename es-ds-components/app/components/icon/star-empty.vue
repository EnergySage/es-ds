<script lang="ts">
export default {
    name: 'IconStarEmpty',
    props: {
        /**
         * Width
         */
        width: {
            type: String,
            default: '20px',
            required: false,
        },
        /**
         * Height
         */
        height: {
            type: String,
            default: '20px',
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
        viewBox="0 0 20 20"
        fill="white">
        <path
            d="M10 1.30198L12.0661 6.26946C12.2101 6.61569 12.5357 6.85226 12.9095 6.88223L18.2723 7.31216L14.1864 10.8122C13.9016 11.0561 13.7773 11.4389 13.8643 11.8037L15.1126 17.0368L10.5213 14.2325C10.2012 14.037 9.79876 14.037 9.47874 14.2325L4.88743 17.0368L6.13574 11.8037C6.22275 11.4389 6.09838 11.0561 5.81359 10.8122L1.72769 7.31216L7.0905 6.88223C7.46429 6.85226 7.7899 6.61569 7.93391 6.26946L10 1.30198Z"
            stroke="currentColor"
            stroke-linejoin="round" />
    </svg>
</template>
