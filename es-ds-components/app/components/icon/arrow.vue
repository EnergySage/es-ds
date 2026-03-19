<script setup lang="ts">
import ArrowDown from './arrow-down.vue';
import ArrowLeft from './arrow-left.vue';
import ArrowRight from './arrow-right.vue';
import ArrowUp from './arrow-up.vue';

interface Props {
    height?: string;
    orientation?: 'down' | 'left' | 'right' | 'top';
    width?: string;
}
withDefaults(defineProps<Props>(), {
    height: '24px',
    orientation: 'top',
    width: '24px',
});
</script>

<template>
    <arrow-down v-if="orientation === 'down'" :size="width" />
    <arrow-left v-else-if="orientation === 'left'" :size="width" />
    <arrow-right v-else-if="orientation === 'right'" :size="width" />
    <arrow-up v-else :size="width" />
</template>
