<script>
export default {
    name: 'IconPersonAdd',
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
            d="M17 7c0 2.75-2.25 5-5 5S7 9.75 7 7s2.25-5 5-5 5 2.25 5 5Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 7a6 6 0 1 1 12 0A6 6 0 0 1 6 7Zm13 5a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1ZM6.649 15a2 2 0 0 0-1.986 1.752l-.39 3.124A1 1 0 0 0 5.266 21H17a1 1 0 1 1 0 2H5.266a3 3 0 0 1-2.977-3.372l.39-3.124A4 4 0 0 1 6.649 13a1 1 0 1 1 0 2Z" />
    </svg>
</template>
