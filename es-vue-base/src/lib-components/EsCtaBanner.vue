<template>
    <div>
        <EsCard
            :class="{ 'bg-gray text-white': dark }"
            v-bind="$attrs"
            v-on="$listeners">
            <b-row>
                <b-col
                    cols="12"
                    lg="6"
                    class="mb-200 my-lg-auto text-center text-lg-left">
                    <!-- eslint-disable-next-line vuejs-accessibility/heading-has-content -->
                    <div
                        class="h2"
                        :class="{'text-white': dark, 'mb-0': !subtitle}">
                        {{ heading }}
                    </div>
                    <div v-if="subtitle">
                        {{ subtitle }}
                    </div>
                </b-col>
                <b-col
                    cols="12"
                    lg="6"
                    class="my-auto d-flex justify-content-center justify-content-lg-end">
                    <slot name="cta" />
                </b-col>
            </b-row>
        </EsCard>
    </div>
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
        heading: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            default: '',
        },
    },
};
</script>
