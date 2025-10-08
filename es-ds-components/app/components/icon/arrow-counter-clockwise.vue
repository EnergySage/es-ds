<script setup lang="ts">
import { PhArrowCounterClockwise } from "@phosphor-icons/vue";

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
    <ph-arrow-counter-clockwise :size="width" />
</template>
