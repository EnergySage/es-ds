<template>
    <div
        class="d-flex support-holder align-items-center"
        v-bind="$attrs"
        v-on="$listeners">
        <div class="image-holder mr-100">
            <a
                target="_blank"
                aria-label="Help"
                :href="link">
                <b-img
                    width="64px"
                    height="64px"
                    :class="`image image-bg-${variant}`"
                    :src="src"
                    alt="Help Image" />
            </a>
        </div>
        <div class="text-holder d-flex flex-column">
            <div class="title">
                <div class="h5 mb-25 font-size-base font-weight-bold">
                    <slot
                        v-if="hasTitle"
                        name="title" />
                    <template v-else>
                        Need help signing up?
                    </template>
                </div>
            </div>
            <div class="link">
                <a
                    target="_blank"
                    class="font-size-75 supportLink"
                    :href="link">
                    <slot
                        v-if="hasLinkCopy"
                        name="linkCopy" />
                    <template v-else>
                        Schedule a free call with your EnergySage Advisor.
                    </template>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import { BImg } from 'bootstrap-vue';

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
         * Image src
         *
         */
        src: {
            type: String,
            required: true,
        },
        /**
         * Support Variant
         */
        variant: {
            type: String,
            required: false,
            default: 'warm',
            validator: (val) => ['warm', 'cool'].includes(val),
        },
    },
    computed: {
        hasTitle() {
            return !!this.$slots.title;
        },
        hasLinkCopy() {
            return !!this.$slots.linkCopy;
        },
    },
};
</script>

<style lang="scss" scoped>
@use "~@energysage/es-bs-base/scss/variables" as variables;

.support-holder {
    max-width: 325px;

    .image-holder {
        height: 64px;
        width: 64px;

        .image {
            border-radius: 2rem;
            object-fit: contain;

            &.image-bg-warm {
                background: linear-gradient(141.22deg, variables.$yellow 8.76%, variables.$pink 100%);
            }

            &.image-bg-cool {
                background: variables.$teal-300;
            }
        }
    }
}
</style>
