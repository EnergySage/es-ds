<script setup lang="ts">
import { PhMagnifyingGlass } from '@phosphor-icons/vue';

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
    <ph-magnifying-glass :size="width" />
</template>
