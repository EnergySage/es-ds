<script>
export default {
    name: 'IconPersonCross',
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
            d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 7a6 6 0 1 1 12 0A6 6 0 0 1 6 7Zm.649 8a2 2 0 0 0-1.986 1.752l-.39 3.124A1 1 0 0 0 5.266 21H17a1 1 0 1 1 0 2H5.266a3 3 0 0 1-2.977-3.372l.39-3.124A4 4 0 0 1 6.649 13H7a1 1 0 1 1 0 2h-.351Zm9.644-1.707a1 1 0 0 1 1.414 0l1.793 1.793 1.793-1.793a1 1 0 0 1 1.414 1.414L20.914 16.5l1.793 1.793a1 1 0 0 1-1.414 1.414L19.5 17.914l-1.793 1.793a1 1 0 0 1-1.414-1.414l1.793-1.793-1.793-1.793a1 1 0 0 1 0-1.414Z" />
    </svg>
</template>
