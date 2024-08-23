<script>
export default {
    name: 'IconFlag',
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
            d="M15.6369 8.87295L18.7994 5.19737C19.0191 4.94421 19.0669 4.5879 18.9236 4.27848C18.7803 3.97843 18.4745 3.78153 18.1306 3.78153H5.91083V2.93765C5.91083 2.42194 5.48089 2 4.95541 2C4.42994 2 4 2.42194 4 2.93765V21.0624C4 21.5781 4.42994 22 4.95541 22C5.48089 22 5.91083 21.5781 5.91083 21.0624V13.9644H18.1306C18.4745 13.9644 18.7803 13.7675 18.9236 13.4674C19.0669 13.1674 19.0191 12.8111 18.7994 12.5485L15.6369 8.87295ZM5.91083 12.2391V5.49742H16.2484L13.8217 8.31974C13.5446 8.63854 13.5446 9.10736 13.8217 9.42616L16.2484 12.2485H5.91083V12.2391Z"
            fill-rule="evenodd"
        />
    </svg>
</template>
