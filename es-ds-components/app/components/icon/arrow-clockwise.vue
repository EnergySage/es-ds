<script setup lang="ts">
import { PhArrowClockwise } from "@phosphor-icons/vue";

interface Props {
    height?: string;
    orientation?: 'clockwise' | 'counter-clockwise';
    width?: string;
}
withDefaults(defineProps<Props>(), {
    height: '24px',
    orientation: 'clockwise',
    width: '24px',
});
</script>

<template>
    <ph-arrow-clockwise :mirrored="orientation === 'counter-clockwise'" :size="width" />
</template>
