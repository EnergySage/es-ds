<script>
export default {
    name: 'IconSettingsHorizontal',
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
}
</script>

<template>
    <svg
        :style="{
            height,
            width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <circle
            cx="9"
            cy="5"
            r="2"
            fill="none"
        />
        <circle
            cx="17"
            cy="12"
            r="2"
            fill="none"
        />
        <circle
            cx="7"
            cy="19"
            r="2"
            fill="none"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 5a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1Zm8 0a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H11a1 1 0 0 1-1-1Zm-8 7a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm16 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM2 19a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm6 0a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Z"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM6 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm11 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-3 1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-7 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-3 1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
        />
    </svg>
</template>
