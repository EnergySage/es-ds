<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path
            d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.64 8.732a1 1 0 0 1 .128 1.408l-5 6a1 1 0 0 1-1.475.067l-3-3a1 1 0 1 1 1.414-1.414l2.226 2.226 4.299-5.16a1 1 0 0 1 1.408-.127Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Z" />
    </svg>
</template>
<script>
export default {
    name: 'CircleCheckIcon',
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
