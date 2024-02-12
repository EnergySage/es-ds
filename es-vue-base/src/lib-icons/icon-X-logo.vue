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
            path d="M18.4554 13.55L30 0H27.2673L17.2475 11.77L9.23762 0H0L12.099 17.79L0 32H2.73267L13.3168 19.58L21.7723 32H31L18.4455 13.55H18.4554ZM14.7129 17.95L13.4851 16.18L3.72277 2.08H7.92079L15.7921 13.46L17.0198 15.23L27.2574 30.02H23.0594L14.703 17.95H14.7129Z" 
            fill="black" />
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
