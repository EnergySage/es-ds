<!-- eslint-disable max-len -->
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.293 6.293a1 1 0 0 1 1.414 0l8 8a1 1 0 0 1-1.414 1.414L12 8.414l-7.293 7.293a1 1 0 0 1-1.414-1.414l8-8Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconChevronUp',
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
