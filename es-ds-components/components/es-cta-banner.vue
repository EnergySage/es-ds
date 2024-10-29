<script setup lang="ts">
const props = defineProps({
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
});

const lgFirst = computed(() => {
    if (props.variant === 'wide') {
        return props.hasButton ? '8' : '6';
    }

    return props.hasButton ? '7' : '4';
});

const lgSecond = computed(() => {
    if (props.variant === 'wide') {
        return props.hasButton ? '4' : '6';
    }

    return props.hasButton ? '5' : '8';
});

const xxlFirst = computed(() => {
    if (props.variant === 'wide') {
        return props.hasButton ? '8' : '6';
    }

    return props.hasButton ? '8' : '5';
});

const xxlSecond = computed(() => {
    if (props.variant === 'wide') {
        return props.hasButton ? '4' : '6';
    }

    return props.hasButton ? '4' : '7';
});
</script>

<template>
    <es-card
        :class="[
            {
                'bg-dark-blue border-dark-blue text-white': dark,
                'px-100 px-lg-200': variant === 'default',
                'px-100 px-lg-300': variant === 'wide',
            },
        ]"
        v-bind="$attrs">
        <es-row>
            <es-col
                class="mb-200 my-lg-auto text-center text-lg-left"
                :lg="lgFirst"
                :xxl="xxlFirst">
                <!-- avoiding use of an <h2> tag here for long-form content SEO reasons,
                    but preserving heading semantics for screen readers -->
                <div
                    role="heading"
                    aria-level="2"
                    class="font-weight-semibold"
                    :class="{
                        'font-size-300': variant === 'default',
                        'mb-50': $slots.subtitle,
                        'mb-0': !$slots.subtitle,
                        'text-white': dark,
                        h2: variant === 'wide',
                    }">
                    <slot name="heading"> Easily find what solar costs in your area </slot>
                </div>
                <p
                    v-if="$slots.subtitle"
                    class="mb-0">
                    <slot name="subtitle" />
                </p>
            </es-col>
            <es-col
                class="d-flex justify-content-center justify-content-lg-end my-auto"
                :lg="lgSecond"
                :xxl="xxlSecond">
                <slot name="cta" />
            </es-col>
        </es-row>
    </es-card>
</template>
