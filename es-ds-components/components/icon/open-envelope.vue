<script>
export default {
    name: 'IconOpenEnvelope',
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
            d="M9.133 2.787a5 5 0 0 1 5.735 0l6 4.2A5 5 0 0 1 23 11.083V19a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-7.917a5 5 0 0 1 2.132-4.096l6-4.2Z"
            fill="none"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 3.883a3 3 0 0 0-1.72.542l-6 4.2A3 3 0 0 0 3 11.083V19a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-7.917a3 3 0 0 0-1.28-2.458l-6-4.2A3 3 0 0 0 12 3.883ZM9.133 2.787a5 5 0 0 1 5.735 0l6 4.2A5 5 0 0 1 23 11.083V19a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-7.917a5 5 0 0 1 2.132-4.096l6-4.2Z"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="m8.876 15.782-7.5-6.001 1.249-1.562 7.5 6.001a3 3 0 0 0 3.75 0l7.5-6 1.25 1.56-7.501 6.002a5 5 0 0 1-6.248 0Z"
        />
    </svg>
</template>
