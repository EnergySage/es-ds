<script setup lang="ts">
interface Props {
  allowMultipleExpand?: boolean;
  initialExpandedId?: number;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  allowMultipleExpand: false,
  initialExpandedId: 0,
  variant: "default",
});
</script>

<template>
  <div class="rounded" role="tablist" :activeIndex="initialExpandedId">
    <slot />
  </div>
</template>
