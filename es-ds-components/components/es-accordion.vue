<script setup lang="ts">
import AccordionTab from 'primevue/accordiontab';

interface Props {
  id: string;
  headingTag?: "h3" | "h4";
}

const props = withDefaults(defineProps<Props>(), {
  headingTag: "h3",
});
</script>

<template>
  <accordion-tab>
      <slot />
  </accordion-tab>
</template>
