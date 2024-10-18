<script>
export default {
    name: 'IconShield',
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
            d="M11.56 1.102a1 1 0 0 1 .88 0l7.81 3.818a1.837 1.837 0 0 1 .994 1.287 14.395 14.395 0 0 1-5.854 14.641l-1.67 1.168a3 3 0 0 1-3.44 0L8.61 20.85A14.394 14.394 0 0 1 2.757 6.207v-.001A1.837 1.837 0 0 1 3.75 4.92h.001l7.809-3.818Z"
            fill="none" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.56 1.102a1 1 0 0 1 .88 0l7.81 3.818a1.837 1.837 0 0 1 .994 1.287 14.395 14.395 0 0 1-5.854 14.641l-1.67 1.168a3 3 0 0 1-3.44 0L8.61 20.85A14.394 14.394 0 0 1 2.757 6.207v-.001A1.837 1.837 0 0 1 3.75 4.92h.001l7.809-3.818Zm1.014 19.276 1.67-1.168a12.395 12.395 0 0 0 5.055-12.528L12 3.113l-7.3 3.57a12.393 12.393 0 0 0 5.057 12.526l1.67 1.169a1 1 0 0 0 1.147 0Z" />
    </svg>
</template>
