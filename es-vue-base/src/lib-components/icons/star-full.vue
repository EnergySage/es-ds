<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
            d="M9.538 1.11a.5.5 0 0 1 .924 0l2.066 4.967a.5.5 0 0 0 .421.307l5.363.43a.5.5 0 0 1 .286.878l-4.086 3.5a.5.5 0 0 0-.161.496l1.248 5.233a.5.5 0 0 1-.747.543l-4.591-2.805a.5.5 0 0 0-.522 0l-4.59 2.804a.5.5 0 0 1-.748-.542l1.248-5.233a.5.5 0 0 0-.16-.496l-4.087-3.5a.5.5 0 0 1 .286-.878l5.363-.43a.5.5 0 0 0 .421-.307L9.538 1.11Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconStarFull',
    props: {
        /**
         * Width
         */
        width: {
            type: String,
            default: '20px',
            required: false,
        },
        /**
         * Height
         */
        height: {
            type: String,
            default: '20px',
            required: false,
        },
    },
};
</script>
