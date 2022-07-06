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
            d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 5a1 1 0 0 1 1 1v6.172a1 1 0 0 0 .293.707l2.414 2.414a1 1 0 0 1-1.414 1.414l-2.414-2.414a3 3 0 0 1-.879-2.12V6a1 1 0 0 1 1-1Z" />
    </svg>
</template>
<script>
export default {
    name: 'ClockIcon',
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
