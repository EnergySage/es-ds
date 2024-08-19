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
            d="M8.763 2a3 3 0 0 1 2.684 1.659l.894 1.788a1.001 1.001 0 0 0 .895.553H20a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4.763Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.763 2a3 3 0 0 1 2.684 1.659l.894 1.788a1.001 1.001 0 0 0 .895.553H20a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4.763Zm.527 2.15A1 1 0 0 0 8.763 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-6.764a3 3 0 0 1-2.684-1.659L9.66 4.553a1 1 0 0 0-.37-.404Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconFolder',
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
