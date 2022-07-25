<template>
    <div
        class="d-flex support-holder align-items-center"
        v-bind="$attrs"
        v-on="$listeners">
        <div class="image-holder mr-3">
            <b-img
                class="image h-100"
                :src="repImage"
                :alt="repName" />
        </div>
        <div class="text-holder d-flex flex-column">
            <div class="title">
                <h5 class="mb-1 font-size-base font-weight-bold">
                    <slot />
                </h5>
            </div>
            <div class="link">
                <a
                    target="_blank"
                    class="supportLink"
                    :href="link">
                    Schedule a free call with {{ repName }}, your EnergySage specialist.
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import { BImg } from 'bootstrap-vue';
import benr from '@/src/assets/imgs/benr.png';

export default {
    name: 'EsSupport',
    components: {
        BImg,
    },
    props: {
        /**
         * Link
         */
        link: {
            default: '',
            type: String,
            required: true,
        },
        /**
         * EA Name
         */
        repName: {
            type: String,
            required: true,
        },
    },
    computed: {
        repImage() {
            // TODO: switch/case for other reps
            return benr;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-extends/scss/includes';

.support-holder {
    max-width: 325px;

    .image-holder {
        height: 64px;
        width: 64px;

        .image {
            // TODO: Move into es-bs-extends
            background: linear-gradient(141.22deg, #F6B140 8.76%, #CA4A89 100%);
            border-radius: 2rem;
            object-fit: contain;
        }
    }
}

</style>
