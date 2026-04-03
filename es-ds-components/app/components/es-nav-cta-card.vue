<script setup lang="ts">
interface Props {
    heading: string;
    href: string;
    subtitle?: string;
    target?: string;
}
withDefaults(defineProps<Props>(), {
    subtitle: '',
    target: '_self',
});
</script>

<template>
    <es-card
        class="es-nav-cta-card d-flex p-100"
        :class="{
            'align-items-center': !subtitle,
        }"
        :href="href"
        :target="target"
        variant="interactive">
        <div v-if="$slots.icon" class="mr-100">
            <div class="es-nav-cta-card-icon bg-blue-50 p-50 position-relative rounded-xs text-blue-600">
                <slot name="icon" />
            </div>
        </div>
        <div>
            <p class="align-items-center d-flex font-weight-bold mb-0 text-blue-600">
                {{ heading }}
                <icon-arrow-right
                    aria-hidden
                    class="es-nav-cta-card-arrow flex-shrink-0 ml-25" />
            </p>
            <p
                v-if="subtitle"
                class="font-size-75 mb-0">
                {{ subtitle }}
            </p>
        </div>
    </es-card>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

.es-nav-cta-card {
    border-width: 1px;

    /* only apply a hover state if the device supports mouse hover */
    @media (hover) {
        &:hover {
            border-color: variables.$blue-600;

            .es-nav-cta-card-icon {
                color: variables.$white !important;

                &::after {
                    opacity: 1;
                }
            }

            .es-nav-cta-card-arrow {
                margin-left: 0.75rem !important;
            }
        }
    }

    &-icon {
        /* you cannot animate radial gradient backgrounds, so apply it to a pseudo element and fade it in on hover */
        &::after {
            background: radial-gradient(
                156.04% 117.56% at 0% 0%,
                variables.$blue-500 0%,
                #5a4386 53.85%,
                #1c1767 100%
            );
            border-radius: 0.25rem;
            bottom: 0;
            content: '';
            left: 0;
            opacity: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 2;

            @media not (prefers-reduced-motion) {
                transition: variables.$transition-base;
            }
        }

        /* ensure the icon appears above the gradient pseudo element */
        :deep(svg) {
            position: relative;
            z-index: 3;
        }

        @media not (prefers-reduced-motion) {
            transition: variables.$transition-base;
        }
    }

    &-arrow {
        @media not (prefers-reduced-motion) {
            transition: variables.$transition-base;
        }
    }
}
</style>
