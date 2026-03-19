<script setup lang="ts">
import { PhCaretCircleRight } from '@phosphor-icons/vue';

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
    <ph-caret-circle-right :size="width" />
</template>
