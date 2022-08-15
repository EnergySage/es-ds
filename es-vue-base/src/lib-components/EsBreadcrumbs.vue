<template>
    <b-breadcrumb
        v-bind="$attrs"
        v-on="$listeners" />
</template>
<script>
import { BBreadcrumb } from 'bootstrap-vue';

export default {
    name: 'EsBreadcrumb',
    components: {
        BBreadcrumb,
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.breadcrumb {
    .active span {
        font-weight: $font-weight-bold;
    }
}
</style>
