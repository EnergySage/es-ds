<script setup lang="ts">
interface Props {
    alignMobile?: 'left' | 'center' | 'right';
    background?: 'none' | 'blue-300-radial' | 'dark-blue';
    hasButton?: boolean;
    variant?: 'default' | 'stacked' | 'wide';
    // deprecated
    dark?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    alignMobile: 'center',
    background: 'none',
    hasButton: false,
    variant: 'default',
    // deprecated
    dark: false,
});

const lgFirst = computed(() => {
    if (props.variant === 'stacked') {
        return '12';
    }

    if (props.variant === 'wide') {
        return props.hasButton ? '8' : '6';
    }

    return props.hasButton ? '7' : '4';
});

const lgSecond = computed(() => {
    if (props.variant === 'stacked') {
        return '12';
    }

    if (props.variant === 'wide') {
        return props.hasButton ? '4' : '6';
    }

    return props.hasButton ? '5' : '8';
});

const xxlFirst = computed(() => {
    if (props.variant === 'stacked') {
        return '12';
    }

    if (props.variant === 'wide') {
        return props.hasButton ? '8' : '6';
    }

    return props.hasButton ? '8' : '5';
});

const xxlSecond = computed(() => {
    if (props.variant === 'stacked') {
        return '12';
    }

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
                'bg-dark-blue border-dark-blue text-white': dark || background === 'dark-blue',
                'bg-blue-300-radial-gradient': background === 'blue-300-radial',
                'px-100 px-lg-200': variant === 'default',
                'px-100 px-lg-300': variant === 'wide',
            },
        ]"
        v-bind="$attrs">
        <es-row>
            <es-col
                class="text-lg-left"
                :class="{
                    [`text-${alignMobile}`]: true,
                    'mb-100': variant === 'stacked',
                    'mb-200 my-lg-auto': variant !== 'stacked',
                }"
                :lg="lgFirst"
                :xxl="xxlFirst">
                <!-- avoiding use of an <h2> tag here for long-form content SEO reasons,
                    but preserving heading semantics for screen readers -->
                <div
                    role="heading"
                    aria-level="2"
                    class="font-weight-semibold"
                    :class="{
                        'font-size-300': variant === 'default' || variant === 'stacked',
                        'mb-50': $slots.subtitle,
                        'mb-0': !$slots.subtitle,
                        'text-white': dark || background === 'dark-blue',
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
                class="d-flex justify-content-center my-auto"
                :class="{
                    'justify-content-lg-end': variant !== 'stacked',
                }"
                :lg="lgSecond"
                :xxl="xxlSecond">
                <slot name="cta" />
            </es-col>
        </es-row>
    </es-card>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

.bg-blue-300-radial-gradient {
    background:
        radial-gradient(
            44.92% 45.42% at 5.14% 6.4%,
            rgba(133, 178, 255, 0) 0%,
            var(--Primary-colors-Blue-300, #85b2ff) 100%
        ),
        #fff;

    @include breakpoints.media-breakpoint-up(md) {
        background:
            radial-gradient(
                95.61% 111.81% at -0.65% 0%,
                rgba(133, 178, 255, 0) 0%,
                var(--Primary-colors-Blue-300, #85b2ff) 100%
            ),
            #fff;
    }
}
</style>
