<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 152.79"
        fill="currentColor">
        <path
            d="M.01 151.15c.14.16 12.84.46 14.22.49 14.21.46 28.42.77 42.65.96 47.72.61 95.45-.26 143.12-2.61-1.4-24.96-2.79-49.94-4.17-74.91-.93-25.03-1.87-50.06-2.82-75.08 0 0-.92.05-1.38.06-1.73.09-3.46.17-5.2.26-4.02.17-8.05.36-12.06.53-12.76.53-25.53.94-38.29 1.23-32.31.74-64.64.75-96.95.03-8.26-.18-16.53-.41-24.8-.7-.81-.02-8.57-.35-8.62-.3-.26.25-.64 16.91-.72 18.77-1.18 31.27-2.37 62.54-3.56 93.81-.35 9.18-.7 18.37-1.04 27.55-.04.96-.48 9.82-.38 9.92"
            style="stroke-width: 0" />
    </svg>
</template>

<script>
export default {
    name: 'IconStateWy',
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
