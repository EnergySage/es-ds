<template>
    <div
        class="d-flex support-holder align-items-center"
        v-bind="$attrs"
        v-on="$listeners">
        <div class="image-holder mr-3">
            <a
                target="_blank"
                :aria-label="repName"
                :href="link">
                <b-img
                    width="64px"
                    height="64px"
                    class="image"
                    :src="repImage"
                    :alt="repName" />
            </a>
        </div>
        <div class="text-holder d-flex flex-column">
            <div class="title">
                <div class="h5 mb-1 font-size-base font-weight-bold">
                    <slot>
                        Need help signing up?
                    </slot>
                </div>
            </div>
            <div class="link">
                <a
                    target="_blank"
                    class="supportLink"
                    :href="link">
                    Schedule a free call with {{ repName }}, your EnergySage Advisor.
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
@import '~@energysage/es-bs-base/scss/includes';

.support-holder {
    max-width: 325px;

    .image-holder {
        height: 64px;
        width: 64px;

        .image {
            // TODO: Move into es-bs-base
            background: linear-gradient(141.22deg, #f6b140 8.76%, #ca4a89 100%);
            border-radius: 2rem;
            object-fit: contain;
        }
    }
}
</style>
