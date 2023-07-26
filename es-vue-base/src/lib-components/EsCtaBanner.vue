<template>
    <es-card
        class="px-100 px-lg-300"
        :class="[{ 'bg-gray text-white': dark }]"
        v-bind="$attrs"
        v-on="$listeners">
        <b-row>
            <b-col
                class="mb-200 my-lg-auto text-center text-lg-left"
                :lg="lgFirst">
                <h2
                    :class="{
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
                :lg="lgSecond">
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
        lgFirst: {
            type: String,
            default: '6',
        },
        lgSecond: {
            type: String,
            default: '6',
        },
    },
};
</script>
