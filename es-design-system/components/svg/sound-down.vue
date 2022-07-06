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
            d="M15 12a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z" />
        <path
            d="M9.572 3.614C10.886 2.245 13 3.304 13 5.043v13.914c0 1.753-2.141 2.804-3.446 1.41a1.15 1.15 0 0 1-.018-.02L6.566 17H3c-1.142 0-2-.952-2-2.041V9.04C1 7.951 1.86 7 3 7h3.573l2.971-3.356a.988.988 0 0 1 .028-.03Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="m10.998 5.02.002.023v13.914c0 .01 0 .019-.002.024l-2.956-3.33-.014-.017A1.98 1.98 0 0 0 6.58 15H3.012A.064.064 0 0 1 3 14.959V9.04c0-.02.007-.033.012-.04H6.59a1.98 1.98 0 0 0 1.452-.642l2.956-3.339ZM9.572 3.613C10.886 2.245 13 3.304 13 5.043v13.914c0 1.753-2.141 2.804-3.446 1.41l-.018-.02L6.566 17H3c-1.142 0-2-.952-2-2.041V9.04C1 7.951 1.86 7 3 7h3.573l2.971-3.356.028-.03Z" />
    </svg>
</template>
<script>
export default {
    name: 'SoundDownIcon',
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
