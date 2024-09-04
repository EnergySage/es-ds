<!-- eslint-disable max-len -->
<script lang="ts">
export default {
    name: 'IconBolt',
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
        <path d="M16.986 11.967a.852.852 0 0 0-.739-.425h-2.793l.475-8.695a.845.845 0 0 0-.654-.874.854.854 0 0 0-.976.492L6.967 14.998a.836.836 0 0 0 .076.798.845.845 0 0 0 .705.382h2.3l-.789 6.835a.845.845 0 0 0 .84.943.844.844 0 0 0 .74-.425l6.147-10.715a.844.844 0 0 0 0-.85Zm-5.57 7.14.425-3.684a.86.86 0 0 0-.213-.663.854.854 0 0 0-.637-.28H9.03l2.946-6.912-.254 4.772a.828.828 0 0 0 .229.629c.161.17.382.263.62.263h2.216l-3.363 5.867-.008.009Z" />
    </svg>
</template>
