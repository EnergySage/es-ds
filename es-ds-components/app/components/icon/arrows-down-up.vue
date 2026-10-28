<script setup lang="ts">
import { PhArrowsDownUp } from '@phosphor-icons/vue';

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
    <ph-arrows-down-up :size="width" />
</template>
