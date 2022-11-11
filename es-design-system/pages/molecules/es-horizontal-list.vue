<template>
    <div class="position-relative">
        <h1>
            Horizontal List
        </h1>
        <h2>
            Left Aligned No Dots
        </h2>
        <es-horizontal-list id="docs-1">
            <div
                v-for="index in 10"
                :key="index"
                class="large-block-holder bg-primary mr-4 text-center text-white py-5">
                {{ index }}
            </div>
        </es-horizontal-list>
        <h2 class="mt-5">
            Center Aligned With Dots
        </h2>
        <es-horizontal-list
            id="docs-2"
            class="center-holder overflow-hidden"
            dots>
            <div
                v-for="index in 3"
                :key="index"
                class="center-block-holder bg-primary mr-2 text-center text-white py-5">
                {{ index }}
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
.large-block-holder {
  height: 185px;
  width: 300px;
}

.center-holder {
    margin: 0 auto;
    width: 350px;
}

.center-block-holder {
    height: 185px;
    width: 170px;
}
</style>
