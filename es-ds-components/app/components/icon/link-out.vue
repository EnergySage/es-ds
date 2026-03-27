<script setup lang="ts">
import { PhArrowSquareOut } from '@phosphor-icons/vue';

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
    <ph-arrow-square-out :size="width" />
</template>
