<script>
export default {
    name: 'IconImage',
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
}
</script>

<template>
    <svg
        :style="{
            height,
            width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path
            d="M2.464 2.464A5 5 0 0 1 6 1h12a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5V6a5 5 0 0 1 1.464-3.536Z"
            fill="none"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm-3.536-.536A5 5 0 0 1 6 1h12a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5V6a5 5 0 0 1 1.464-3.536Z"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM5 8.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Zm11 2.466a3 3 0 0 1 2.217.973l4.032 4.397.036.04c.13.14.32.347.457.59.182.32.258.656.258 1.034v.133A4.867 4.867 0 0 1 18.133 23H6a1 1 0 0 1-.74-1.673l8.526-9.379A3.003 3.003 0 0 1 16 10.966Zm-.734 2.328L8.26 21h9.873A2.867 2.867 0 0 0 21 18.133V18a.502.502 0 0 0-.003-.056.786.786 0 0 0-.045-.058 5.736 5.736 0 0 0-.159-.178l-.021-.024-4.03-4.393a1.002 1.002 0 0 0-1.476.003Z"
        />
    </svg>
</template>
