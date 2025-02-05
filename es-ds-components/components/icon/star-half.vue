<script lang="ts">
export default {
    name: 'IconStarHalf',
    props: {
        /**
         * Width
         */
        width: {
            type: String,
            default: '20px',
            required: false,
        },
        /**
         * Height
         */
        height: {
            type: String,
            default: '20px',
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
        viewBox="0 0 20 20">
        <mask
            id="halfFull"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            :width="width"
            :height="height">
            <path
                d="M10 0L12.645 6.35942L19.5106 6.90983L14.2798 11.3906L15.8779 18.0902L10 14.5L4.12215 18.0902L5.72025 11.3906L0.489435 6.90983L7.35497 6.35942L10 0Z"
                fill="currentColor" />
        </mask>
        <g mask="url(#halfFull)">
            <path
                d="M10 1.30198L12.0661 6.26946C12.2101 6.61569 12.5357 6.85226 12.9095 6.88223L18.2723 7.31216L14.1864 10.8122C13.9016 11.0561 13.7773 11.4389 13.8643 11.8037L15.1126 17.0368L10.5213 14.2325C10.2012 14.037 9.79876 14.037 9.47874 14.2325L4.88743 17.0368L6.13574 11.8037C6.22275 11.4389 6.09838 11.0561 5.81359 10.8122L1.72769 7.31216L7.0905 6.88223C7.46429 6.85226 7.7899 6.61569 7.93391 6.26946L10 1.30198Z"
                fill="white"
                stroke="currentColor"
                stroke-linejoin="round" />
            <path
                d="M9.9051 14.2195V2.50412C9.9051 1.95741 9.15339 1.80732 8.94344 2.31211L7.37735 6.07744C7.30534 6.25056 7.14254 6.36885 6.95564 6.38383L1.59283 6.81376C1.1495 6.8493 0.969741 7.40256 1.30751 7.69189L5.3934 11.1919C5.5358 11.3139 5.59799 11.5053 5.55448 11.6876L4.30617 16.9208C4.20298 17.3534 4.67361 17.6954 5.05315 17.4635L9.66572 14.6462C9.81441 14.5554 9.9051 14.3937 9.9051 14.2195Z"
                fill="currentColor" />
        </g>
    </svg>
</template>
