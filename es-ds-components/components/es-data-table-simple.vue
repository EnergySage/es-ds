<template>
  <div :class="tableClass"
        class="table-responsive">
    <table v-if="$slots.default || items.length" class="table table-borderless" :class="{ 'table-striped': striped }">
      <template v-if="$slots.default">
        <slot />
      </template>
      <tbody v-else>
        <template v-if="isSingleCol">
          <tr v-for="(item, index) in computedItems" :key="`${index}${item}`">
            <td>
              {{ item }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in computedItems" :key="`${index}${item[0]}`">
            <td class="col-sm-7">
              {{ item[0] }}
            </td>
            <td class="col-sm-4">
              <b>{{ item[1] }}</b>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  fields: {
    type: Array,
    default: null,
  },
  items: {
    type: Array,
    default: () => [],
  },
  tableClass: {
    type: [Array, String],
    default: null,
  },
  striped: {
    type: Boolean,
    default: false,
  },
});

const isSingleCol = computed(() => !props.fields);
const computedItems = computed(() => {
  if (!props.items.length && !useSlots().default) {
    throw new Error('Neither items prop nor slot content is defined.');
  }
  // If there are no fields, just return the items as a single-column array
  if (!props.fields) {
    return props.items;
  }
  if (props.fields.length !== props.items.length) {
    throw new Error('The number of fields and items must be the same.');
    }
  // If fields and items are both present, map them together
  return props.fields.map((field, index) => [field, props.items[index]]);
});
</script>
