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
}
</script>

<template>
    <svg
        :style="{
            height,
            width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 31 32"
        fill="currentColor"
    >
        <path
            fill="none"
            d="M0 0.4h31v31H0z"
        />
        <polygon
            fill="white"
            points="15.67 14.46 10.87 7.58 8.31 7.58 14.27 16.11 15.02 17.18 15.02 17.18 20.11 24.48 22.68 24.48 16.43 15.53 15.67 14.46"
        />
        <path
            fill="currentColor"
            d="M15.5 0C6.94 0 0 7.16 0 16s6.94 16 15.5 16 15.5-7.16 15.5-16S24.06 0 15.5 0ZM19.33 25.67l-5.16-7.51-6.46 7.51h-1.67l7.39-8.59L6.04 6.33h5.64l4.89 7.12 6.12-7.12h1.67l-7.05 8.19h0l7.66 11.15s-5.64 0-5.64 0Z"
        />
    </svg>
</template>
