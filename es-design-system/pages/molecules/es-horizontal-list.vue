<template>
    <div class="position-relative">
        <es-horizontal-list>
            <div
                v-for="index in 10"
                :key="index"
                class="block-holder">
                <div class="bg-primary mr-3 text-center text-white py-5">
                    {{ index }}
                </div>
            </div>
        </es-horizontal-list>
        <es-horizontal-list
            class="mt-5"
            centered
            dots>
            <div
                v-for="index in 3"
                :key="index"
                class="block-holder">
                <div class="bg-primary mr-3 text-center text-white py-5">
                    {{ index }}
                </div>
            </div>
        </es-horizontal-list>
    </div>
</template>
<script>

import { EsHorizontalList } from '@energysage/es-vue-base';

export default {
    name: 'EsHorizontalListDocs',
    components: {

        EsHorizontalList,
    },
};
</script>
<style lang="scss" scoped>
.block-holder {
    width: 200px !important;
}
</style>
