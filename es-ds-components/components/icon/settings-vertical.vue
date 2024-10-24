<script>
export default {
    name: 'IconSettingsVertical',
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
        viewBox="0 0 24 24"
        fill="currentColor">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 2a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Zm7 0a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm7 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1ZM5 8a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm14 2a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V11a1 1 0 0 1 1-1Zm-7 8a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Z" />
        <circle
            cx="5"
            cy="7"
            r="3"
            fill="none" />
        <circle
            cx="19"
            cy="9"
            r="2"
            fill="none" />
        <circle
            cx="12"
            cy="17"
            r="2"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.999 9.3a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-1-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13 17a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-1-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM6 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM5 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
    </svg>
</template>
