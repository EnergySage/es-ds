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
@use "~@energysage/es-bs-base/scss/variables" as variables;

.breadcrumb {
    .active span {
        font-weight: variables.$font-weight-bold;
    }
    font-size: variables.$font-size-50;
}
</style>
