<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 31 32"
        fill="currentColor">
        <path
            fill="none"
            d="M0 .4h31v31H0z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.5.4a15.5 15.5 0 1 0 0 31 15.5 15.5 0 0 0 0-31Zm-4.74 23.8H7.04V13.02h3.72V24.2ZM8.9 11.47a1.93 1.93 0 1 1 .05-3.86 1.94 1.94 0 1 1 0 3.86H8.9Zm15.28 12.71h-3.72v-5.98c0-1.5-.53-2.53-1.86-2.53a2.03 2.03 0 0 0-1.9 1.36c-.1.3-.14.6-.13.9v6.25h-3.72s.05-10.13 0-11.16h3.72v1.59a3.72 3.72 0 0 1 3.36-1.86c2.39-.02 4.25 1.58 4.25 5v6.43Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconLinkedin',
    props: {
        /**
         * Width
         */
        width: {
            type: String,
            default: '31px',
            required: false,
        },
        /**
         * Height
         */
        height: {
            type: String,
            default: '32px',
            required: false,
        },
    },
};
</script>
