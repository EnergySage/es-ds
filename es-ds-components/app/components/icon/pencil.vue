<script setup lang="ts">
import { PhPencilSimple } from '@phosphor-icons/vue';

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
    <ph-pencil-simple :size="width" />
</template>
