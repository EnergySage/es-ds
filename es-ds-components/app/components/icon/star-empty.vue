<script setup lang="ts">
import { PhStar } from '@phosphor-icons/vue';

interface Props {
    height?: string;
    width?: string;
}
withDefaults(defineProps<Props>(), {
    height: '20px',
    width: '20px',
});
</script>

<template>
    <ph-star :size="width" />
</template>
