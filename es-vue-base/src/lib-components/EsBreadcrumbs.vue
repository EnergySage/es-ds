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
@import '~@energysage/es-bs-extends/scss/includes';

.breadcrumb {
    padding: 0;
    margin: 0;

    .active {
        font-weight: $font-weight-bold;
        margin-right: 0;
    }

    .breadcrumb-item {
        margin-right: 0.5rem;
        padding-left: 0;

       &::before {
            padding-right: 0.5rem;
        }
    }
}
</style>
