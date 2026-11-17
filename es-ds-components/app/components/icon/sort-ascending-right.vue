<script setup lang="ts">
// this is a custom icon made in the style of Phosphor
// because the sort-descending icon in Phosphor is nonsensical and confusing
// and also because we need both left and right versions
interface Props {
    height?: string;
    width?: string;
}
withDefaults(defineProps<Props>(), {
    height: '24px',
    width: '24px',
});
</script>

<template>
    <svg
        :height="height"
        :width="width"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M139.45 85.662a8 8 0 0 1 0-11.32l32-32a8 8 0 0 1 11.32 0l32 32a8.004 8.004 0 0 1-11.32 11.32l-18.34-18.35v140.69a8 8 0 0 1-16 0V67.312l-18.34 18.35a8 8 0 0 1-11.32 0"
            fill="currentColor" />
        <path
            d="M46.887 39.996a8 8 0 0 0-8 8 8 8 0 0 0 8 8h94.224a8 8 0 0 0 8-8 8 8 0 0 0-8-8zM83.65 85.775a8 8 0 0 0-8 8 8 8 0 0 0 8 8h57.461a8 8 0 0 0 8-8 8 8 0 0 0-8-8zM109.125 131.553a8 8 0 0 0-8 8 8 8 0 0 0 8 8h31.986a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"
            fill="currentColor"
            transform="matrix(1 0 0 -1 0 256)" />
    </svg>
</template>
