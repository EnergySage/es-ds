<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none">
        <path
            d="m10 1.302 2.066 4.967a1 1 0 0 0 .843.613l5.363.43-4.086 3.5a1 1 0 0 0-.322.992l1.249 5.233-4.592-2.804a1 1 0 0 0-1.042 0l-4.592 2.804 1.249-5.233a1 1 0 0 0-.322-.992l-4.086-3.5 5.362-.43a1 1 0 0 0 .844-.613L10 1.302Z"
            stroke="currentColor" />
    </svg>
</template>
<script>
export default {
    name: 'IconStarEmpty',
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
