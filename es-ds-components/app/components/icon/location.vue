<script lang="ts">
export default {
    name: 'IconLocation',
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
            d="M5.636 3.636A9 9 0 0 1 21 10c0 1.017-.108 1.912-.389 2.76-.283.853-.724 1.608-1.33 2.365a.985.985 0 0 1-.025.03l-6.5 7.5a1 1 0 0 1-1.512 0l-6.5-7.5a1.017 1.017 0 0 1-.024-.03c-.607-.757-1.048-1.512-1.331-2.365C3.108 11.912 3 11.017 3 10a9 9 0 0 1 2.636-6.364Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.636 3.636A9 9 0 0 1 21 10c0 1.017-.108 1.912-.389 2.76-.283.853-.724 1.608-1.33 2.365a.985.985 0 0 1-.025.03l-6.5 7.5a1 1 0 0 1-1.512 0l-6.5-7.5a1.017 1.017 0 0 1-.024-.03c-.607-.757-1.048-1.512-1.331-2.365C3.108 11.912 3 11.017 3 10a9 9 0 0 1 2.636-6.364ZM12 3a7 7 0 0 0-7 7c0 .875.093 1.545.287 2.131.192.577.497 1.122.982 1.729L12 20.473l5.731-6.613c.485-.607.79-1.152.981-1.729.195-.586.288-1.256.288-2.131a7 7 0 0 0-7-7Z" />
    </svg>
</template>
