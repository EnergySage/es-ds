<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 161.66 200"
        fill="currentColor">
        <path
            d="M109.02 39.9c-1.48.04-15.02.46-15.18.3-.11-.1-.16-9.56-.17-10.59-.17-9.8-.33-19.61-.49-29.42C63.49.67 33.79.61 4.11 0L0 199.46c53.89 1.09 107.81.53 161.66-1.7-2.38-53.11-4.78-106.22-7.14-159.32-15.17.63-30.33 1.12-45.5 1.46"
            style="stroke-width: 0" />
    </svg>
</template>

<script>
export default {
    name: 'IconStateUt',
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
