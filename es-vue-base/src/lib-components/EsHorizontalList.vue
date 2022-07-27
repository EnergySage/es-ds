<template>
    <div>
        Nothing
    </div>
</template>

<script lang="js">

export default {
    name: 'EsHorizontalList',
    props: {
        /**
         * Show dots under or not
         */
        dots: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Center the items horizontally
         */
        centered: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            settings: {
            },
        };
    },
};
</script>

<style lang="scss">
@import '~@energysage/es-bs-extends/scss/includes';

</style>
