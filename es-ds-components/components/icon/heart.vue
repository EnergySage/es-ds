<script>
export default {
    name: 'IconHeart',
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
            d="M12 4.5c1-1 2.8-2.5 5-2.5 3.3 0 6 2.7 6 6 0 2.8-1.3 8.3-10 13.6-.3.2-.6.3-1 .3-.3 0-.7-.1-1-.3C2.3 16.3 1 10.8 1 8c0-3.3 2.7-6 6-6 2.2 0 4 1.5 5 2.5Z"
            fill="none"
        />
        <path d="M17 2c-2.2 0-4 1.5-5 2.5C11 3.5 9.2 2 7 2 3.7 2 1 4.7 1 8c0 2.8 1.3 8.3 10 13.6.3.2.7.3 1 .3.4 0 .7-.1 1-.3C21.7 16.3 23 10.8 23 8c0-3.3-2.7-6-6-6Zm-5 17.9C4.2 15.1 3 10.4 3 8c0-2.2 1.8-4 4-4s4.2 2.6 4.2 2.6c.2.3.5.4.8.4.3 0 .6-.1.8-.4 0 0 2-2.6 4.2-2.6s4 1.8 4 4c0 2.4-1.2 7.1-9 11.9Z" />
    </svg>
</template>
