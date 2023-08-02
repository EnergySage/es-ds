<template>
    <es-card
        :class="[{
            'bg-gray text-white': dark,
            'px-100 px-lg-200': variant === 'default',
            'px-100 px-lg-300': variant === 'wide',
        }]"
        v-bind="$attrs"
        v-on="$listeners">
        <b-row>
            <b-col
                class="mb-200 my-lg-auto text-center text-lg-left"
                :lg="lgFirst"
                :xxl="xxlFirst">
                <h2
                    :class="{
                        'font-size-300': variant === 'default',
                        'mb-50': $slots.subtitle,
                        'mb-0': !$slots.subtitle,
                        'text-white': dark,
                    }">
                    <slot name="heading">
                        Easily find what solar costs in your area
                    </slot>
                </h2>
                <p
                    v-if="$slots.subtitle"
                    class="mb-0">
                    <slot name="subtitle" />
                </p>
            </b-col>
            <b-col
                class="d-flex justify-content-center justify-content-lg-end my-auto"
                :lg="lgSecond"
                :xxl="xxlSecond">
                <slot name="cta" />
            </b-col>
        </b-row>
    </es-card>
</template>

<script lang="js">
import EsCard from './EsCard.vue';

export default {
    name: 'EsCtaBanner',
    components: {
        EsCard,
    },
    props: {
        dark: {
            type: Boolean,
            default: false,
        },
        hasButton: {
            type: Boolean,
            default: false,
        },
        // default or wide
        variant: {
            type: String,
            default: 'default',
        },
    },
    computed: {
        lgFirst() {
            if (this.variant === 'wide') {
                return this.hasButton ? '8' : '6';
            }

            return this.hasButton ? '7' : '4';
        },
        lgSecond() {
            if (this.variant === 'wide') {
                return this.hasButton ? '4' : '6';
            }

            return this.hasButton ? '5' : '8';
        },
        xxlFirst() {
            if (this.variant === 'wide') {
                return this.hasButton ? '8' : '6';
            }

            return this.hasButton ? '8' : '5';
        },
        xxlSecond() {
            if (this.variant === 'wide') {
                return this.hasButton ? '4' : '6';
            }

            return this.hasButton ? '4' : '7';
        },
    }
};
</script>
