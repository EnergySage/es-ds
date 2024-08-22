<!-- eslint-disable max-len -->
<script>
export default {
    name: 'IconArrow',
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
            default: 'top',
            required: false,
        },
    },
    computed: {
        classFromOrientation() {
            return `orientation-${this.orientation}`;
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
        :class="classFromOrientation"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 3a1 1 0 0 1 1 1v13.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414L11 17.586V4a1 1 0 0 1 1-1Z" />
    </svg>
</template>

<style lang="scss" scoped>
.orientation-down {
    transform: rotate(0deg);
}

.orientation-left {
    transform: rotate(90deg);
}

.orientation-top {
    transform: rotate(180deg);
}

.orientation-right {
    transform: rotate(270deg);
}
</style>
