<script setup lang="ts">
interface Props {
    alignMobile?: 'left' | 'center' | 'right';
    background?: 'none' | 'blue-300-radial' | 'dark-blue';
    hasButton?: boolean;
    sideImageContainerClass?: string;
    variant?: 'default' | 'stacked' | 'semi-wide' | 'wide';
    // deprecated
    dark?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    alignMobile: 'center',
    background: 'none',
    hasButton: false,
    sideImageContainerClass: 'flex-shrink-0 ml-100',
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

    if (props.variant === 'semi-wide') {
        return props.hasButton ? '7' : '5';
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

    if (props.variant === 'semi-wide') {
        return props.hasButton ? '5' : '7';
    }

    return props.hasButton ? '5' : '8';
});

const xlFirst = computed(() => {
    if (props.variant === 'semi-wide') {
        return props.hasButton ? '7' : '5';
    }

    return lgFirst.value;
});

const xlSecond = computed(() => {
    if (props.variant === 'semi-wide') {
        return props.hasButton ? '5' : '7';
    }

    return lgSecond.value;
});

const xxlFirst = computed(() => {
    if (props.variant === 'stacked') {
        return '12';
    }

    if (props.variant === 'wide') {
        return props.hasButton ? '8' : '6';
    }

    if (props.variant === 'semi-wide') {
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

    if (props.variant === 'semi-wide') {
        return props.hasButton ? '4' : '6';
    }

    return props.hasButton ? '4' : '7';
});
</script>

<template>
    <es-card
        class="es-card position-relative"
        :class="[
            {
                'bg-dark-blue border-dark-blue text-white': dark || background === 'dark-blue',
                'bg-blue-300-radial-gradient': background === 'blue-300-radial',
                'es-card--default': variant === 'default',
                'es-card--semi-wide': variant === 'semi-wide',
                'es-card--wide': variant === 'wide',
            },
        ]"
        v-bind="$attrs">
        <es-row>
            <es-col
                class="d-flex text-lg-left position-static"
                :class="{
                    [`text-${alignMobile}`]: true,
                }"
                :lg="lgFirst"
                :xl="xlFirst"
                :xxl="xxlFirst">
                <div
                    class="flex-grow-1"
                    :class="{
                        'pb-100': variant === 'stacked',
                        'pb-200 pb-lg-0 my-lg-auto': variant !== 'stacked',
                    }">
                    <!-- avoiding use of an <h2> tag here for long-form content SEO reasons,
                    but preserving heading semantics for screen readers -->
                    <div
                        role="heading"
                        aria-level="2"
                        class="font-weight-semibold"
                        :class="{
                            'font-size-300': ['default', 'semi-wide', 'stacked'].includes(variant),
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
                </div>
                <div
                    v-if="$slots.sideImage"
                    :class="sideImageContainerClass">
                    <slot name="sideImage" />
                </div>
            </es-col>
            <es-col
                class="d-flex justify-content-center my-auto"
                :class="{
                    'justify-content-lg-end': variant !== 'stacked',
                }"
                :lg="lgSecond"
                :xl="xlSecond"
                :xxl="xxlSecond">
                <slot name="cta" />
            </es-col>
        </es-row>
    </es-card>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-card {
    /* allow utility classes passed in to override these */
    padding-left: 1rem;
    padding-right: 1rem;
}

@include breakpoints.media-breakpoint-up(lg) {
    .es-card--default,
    .es-card-semi-wide {
        /* allow utility classes passed in to override these */
        padding-left: 2rem;
        padding-right: 2rem;
    }

    .es-card--wide {
        /* allow utility classes passed in to override these */
        padding-left: 3rem;
        padding-right: 3rem;
    }
}

.bg-blue-300-radial-gradient {
    background:
        radial-gradient(44.92% 45.42% at 5.14% 6.4%, rgba(133, 178, 255, 0) 0%, variables.$blue-300 100%), #fff;

    @include breakpoints.media-breakpoint-up(md) {
        background:
            radial-gradient(95.61% 111.81% at -0.65% 0%, rgba(133, 178, 255, 0) 0%, variables.$blue-300 100%),
            variables.$white;
    }
}
</style>
