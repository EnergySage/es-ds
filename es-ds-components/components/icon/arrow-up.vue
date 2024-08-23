<script>
export default {
    name: 'ArrowUpIcon',
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
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.293 3.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1-1.414 1.414L13 6.414V20a1 1 0 1 1-2 0V6.414l-5.293 5.293a1 1 0 0 1-1.414-1.414l7-7Z"
        />
    </svg>
</template>
