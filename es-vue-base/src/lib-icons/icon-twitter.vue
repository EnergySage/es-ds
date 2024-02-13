<template>
     <svg
    :style="{
      height: height,
      width: width,
    }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 31 32"
    fill="currentColor"
  >
    <path fill="none" d="M0 0.4h31v31H0z" />
    <polygon
      fill="white"
      points="16.18 14.46 11.22 7.58 8.58 7.58 14.73 16.11 15.5 17.18 15.5 17.18 20.76 24.48 23.41 24.48 16.96 15.53 16.18 14.46"
    />
    <path
      fill="currentColor"
      d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0ZM19.95 25.67l-5.33-7.51-6.67 7.51h-1.72l7.63-8.59L6.23 6.33h5.82l5.05 7.12 6.32-7.12h1.72l-7.28 8.19h0l7.91 11.15h-5.82Z"
    />
  </svg>
</template>
<script>
export default {
    name: 'IconTwitter',
    props: {
        /**
         * Width
         */
        width: {
            type: String,
            default: '31px',
            required: false,
        },
        /**
         * Height
         */
        height: {
            type: String,
            default: '32px',
            required: false,
        },
    },
};
</script>
