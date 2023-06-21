<template>
    <div>
        <b-progress
            aria-describedby="es-progress"
            class="EsProgress bg-gray-300 rounded-0"
            :class="{ 'EsProgress--full': value === 100 }"
            :height="height"
            :value="value"
            v-bind="$attrs"
            v-on="$listeners" />
    </div>
</template>

<script lang="js">
import { BProgress } from 'bootstrap-vue';

export default {
    name: 'EsProgress',
    components: {
        BProgress,
    },
    props: {
        height: {
            type: String,
            default: '0.3125rem', // 5px
        },
        value: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.EsProgress {
  ::v-deep .progress-bar {
    border-radius: 0 0.125rem 0.125rem 0;
  }
}

.EsProgress--full {
  ::v-deep .progress-bar {
    border-radius: 0;
  }
}

</style>
