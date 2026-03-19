<script setup lang="ts">
import { PhSlidersHorizontal } from '@phosphor-icons/vue';

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
    <ph-sliders-horizontal :size="width" />
</template>
