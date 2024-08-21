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
            d="M11.806 3C6.929 3 3 6.565 3 12a1 1 0 1 1-2 0C1 5.435 5.85 1 11.806 1c4.759 0 8.742 2.543 10.141 6.68a1 1 0 0 1-1.894.64C18.973 5.127 15.853 3 11.806 3ZM22 11a1 1 0 0 1 1 1c0 6.565-4.85 11-10.806 11-4.758 0-8.742-2.543-10.141-6.68a1 1 0 0 1 1.894-.64c1.08 3.193 4.2 5.32 8.247 5.32C17.071 21 21 17.435 21 12a1 1 0 0 1 1-1Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.242 3.03a1 1 0 0 1 .728 1.213l-1 4a1 1 0 0 1-1.212.727l-4-1a1 1 0 1 1 .485-1.94l3.03.757.757-3.03a1 1 0 0 1 1.212-.727ZM2.03 15.758a1 1 0 0 1 1.213-.728l4 1a1 1 0 1 1-.486 1.94l-3.03-.757-.757 3.03a1 1 0 1 1-1.94-.485l1-4Z" />
    </svg>
</template>
<script>
export default {
    name: 'IconArrowCycle',
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
