<script lang="ts">
export default {
    name: 'IconPencil',
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
            d="M3.626 15.34 15.863 3.104l.016-.015a3.56 3.56 0 0 1 5.034 5.032l-.016.016L8.658 20.374a3 3 0 0 1-1.533.82l-3.929.787a1 1 0 0 1-1.177-1.177l.786-3.93a3 3 0 0 1 .82-1.533Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.268 4.526 5.04 16.756a1 1 0 0 0-.273.51l-.492 2.46 2.458-.493a1 1 0 0 0 .51-.273L19.475 6.73a1.56 1.56 0 0 0-2.206-2.204ZM3.626 15.34 15.863 3.103l.016-.015a3.56 3.56 0 0 1 5.034 5.032l-.016.016L8.658 20.374a3 3 0 0 1-1.533.82l-3.929.787a1 1 0 0 1-1.177-1.177l.786-3.93a3 3 0 0 1 .82-1.533Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="m16.793 10.207-3-3 1.414-1.414 3 3-1.414 1.414Z" />
    </svg>
</template>
