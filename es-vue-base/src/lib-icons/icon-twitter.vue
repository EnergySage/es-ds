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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 31.799c8.725 0 15.799-7.074 15.799-15.799S24.725.201 16 .201.201 7.275.201 16 7.275 31.799 16 31.799Zm8.863-24.686H21.81l-5.034 5.751-4.35-5.75H6.125l7.53 9.843-7.136 8.157h3.055l5.507-6.294 4.813 6.293h6.145L18.19 14.737l6.67-7.624Zm-2.435 16.172h-1.693L9.693 8.845h1.814z"
            fill="currentColor"
            style="stroke-width: 1.15203" />
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
