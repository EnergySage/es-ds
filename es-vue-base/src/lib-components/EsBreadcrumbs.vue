<template>
    <b-breadcrumb
        v-bind="$attrs"
        v-on="$listeners" />
</template>
<script>
export default {
    name: 'EsBreadcrumb',
};
</script>

<style lang="scss" scoped>
@import '@energysage/es-bs-base/scss/includes';

.breadcrumb {
    .active span {
        font-weight: $font-weight-bold;
    }
}
</style>
