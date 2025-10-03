<script lang="ts">
export default {
    name: 'IconArrowClockwise',
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
        orientation: {
            type: String,
            default: 'clockwise',
            required: false,
        },
    },
};
</script>
<template>
    <svg
        :class="{
            'counter-clockwise': orientation === 'counter-clockwise',
        }"
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor">
        <!-- eslint-disable-next-line max-len -->
        <path
            d="M3.246 7.123c.997-1.81 2.591-3.418 4.485-4.222 1.894-.905 4.087-1.106 6.08-.704 2.193.403 3.788 1.408 5.183 3.016.2.201.4.503.598.704l.4-2.513c.099-.603.597-.905 1.195-.905.499.1.897.704.798 1.206l-.897 5.127c0 .301-.2.502-.4.603-.198.1-.398.201-.597.201h-.2l-4.983-.905a1.042 1.042 0 0 1-.798-1.206c.1-.503.598-.905 1.197-.804l2.79.603c-.1-.302-.299-.503-.598-.804-1.096-1.307-2.492-2.111-4.086-2.413-1.595-.402-3.39-.2-4.884.503A7.896 7.896 0 0 0 4.94 8.028c-.797 1.507-1.096 3.216-.897 4.925.2 1.709.897 3.317 2.093 4.524 1.097 1.206 2.692 2.11 4.286 2.311 1.595.302 3.39 0 4.785-.703a8.444 8.444 0 0 0 3.488-3.518c.2-.503.798-.704 1.296-.503.498.201.698.804.498 1.307-.797 2.11-2.292 3.619-4.186 4.624-1.395.703-2.89 1.005-4.485 1.005-.598 0-1.096 0-1.695-.1-2.093-.403-3.987-1.408-5.382-2.916a10.256 10.256 0 0 1-2.691-5.629c-.2-2.211.2-4.322 1.196-6.232Z" />
    </svg>
</template>

<style lang="scss" scoped>
.counter-clockwise {
    transform: scale(-1, 1);
}
</style>
