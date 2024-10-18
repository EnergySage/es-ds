<script>
export default {
    name: 'IconStateCo',
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

<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 144.81"
        fill="currentColor">
        <path
            d="M192.68 35.07c-.67-8.59-1.34-17.19-2-25.77-.07-.91-.6-9.18-.72-9.28-.13-.11-11.94.74-13.22.82-13.22.77-26.44 1.43-39.67 1.96C92.3 4.58 47.48 4.97 2.69 3.97 1.78 50.72.89 97.49 0 144.24c38.29.85 76.61.75 114.89-.33 12.55-.34 25.1-.8 37.63-1.37 4.35-.19 8.71-.39 13.05-.62 1.68-.08 3.34-.16 5.02-.26.33-.02 1-.04 1-.04 9.47-.51 18.94-1.07 28.41-1.69l-7.32-104.87"
            style="stroke-width: 0" />
    </svg>
</template>
