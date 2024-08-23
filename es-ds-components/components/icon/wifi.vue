<script>
export default {
    name: 'IconWifi',
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 6c-3.161 0-6.406 1.5-9.257 4.669A1 1 0 1 1 1.257 9.33C4.406 5.831 8.16 4 12 4c3.839 0 7.594 1.832 10.743 5.331a1 1 0 1 1-1.486 1.338C18.406 7.5 15.16 5.999 12 5.999Zm0 6c-1.761 0-3.606.835-5.257 2.669a1 1 0 1 1-1.486-1.338C7.206 11.165 9.56 10 12 10s4.794 1.165 6.743 3.331a1 1 0 1 1-1.486 1.338C15.606 12.835 13.76 12 12 12Zm-2 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
        />
    </svg>
</template>
