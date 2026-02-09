<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui';

interface Props {
    border?: boolean;
    isProgrammaticUntilUserInput?: boolean;
    triggerClass?: string;
    visible?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    border: true,
    isProgrammaticUntilUserInput: true,
    triggerClass: '',
    visible: false,
});

const emit = defineEmits(['toggled', 'userClick']);
const model = defineModel<boolean>();
const userDeterminedState: Ref<boolean | null> = ref(null);

// directly determines the expanded/collapsed state of the panel
const expanded = computed((oldValue: boolean | undefined) => {
    let newValue = !!oldValue;

    // if we are meant to start ignoring the programmatic incoming state as soon as the
    // user interacts with the collapse, and if the user has interacted with the collapse,
    // use the value from the user's interaction
    if (props.isProgrammaticUntilUserInput && userDeterminedState.value !== null) {
        newValue = userDeterminedState.value;
    } else {
        // otherwise, use the one-way visible prop or the two-way v-model value
        newValue = props.visible || !!model.value;
    }

    // if the truthiness of the value has changed, emit event indicating the state has changed
    if (!!oldValue !== !!newValue) {
        emit('toggled', newValue);
    }

    return newValue;
});

const onClick = (value: boolean) => {
    // save the state toggled by the user
    // convert from "collapsed" semantics internal to the primevue panel
    // to the "expanded" semantics exposed by this component
    userDeterminedState.value = value;

    // inform the v-model (if any) that the state has changed
    model.value = value;

    // emit event indicating the state has changed from a user click
    emit('userClick', value);
};
</script>

<template>
    <collapsible-root
        :class="{
            'border-bottom border-top': border,
        }"
        :open="expanded"
        :unmount-on-hide="false"
        @update:open="onClick">
        <collapsible-trigger
            class="es-collapse-trigger d-flex justify-content-between text-left position-relative py-100 w-100"
            :class="triggerClass">
            <div class="pr-200">
                <slot name="title" />
            </div>
            <div class="es-collapse-icon-container position-absolute">
                <icon-chevron-down class="es-collapse-icon" />
            </div>
        </collapsible-trigger>
        <collapsible-content class="es-collapse-content overflow-hidden">
            <slot />
        </collapsible-content>
    </collapsible-root>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

$animation-duration: 0.3s;
$easing-function: cubic-bezier(0.87, 0, 0.13, 1);

@keyframes slideDown {
    0% {
        height: 0;
    }
    100% {
        height: var(--reka-collapsible-content-height);
    }
}

@keyframes slideUp {
    0% {
        height: var(--reka-collapsible-content-height);
    }
    100% {
        height: 0;
    }
}

.es-collapse-trigger {
    background: none;
    border: 0;
    padding: 0;

    &:focus-visible {
        outline: 2px auto variables.$blue-600;
        outline: 2px auto -webkit-focus-ring-color;
        outline-offset: 4px;
    }

    .es-collapse-icon-container {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    &[data-state='open'] .es-collapse-icon {
        transform: rotate(180deg);
    }

    @media not (prefers-reduced-motion) {
        .es-collapse-icon {
            transition: transform $animation-duration $easing-function;
        }
    }
}

.es-collapse-content {
    @media not (prefers-reduced-motion) {
        &[data-state='closed'] {
            animation: slideUp $animation-duration $easing-function;
        }

        &[data-state='open'] {
            animation: slideDown $animation-duration $easing-function;
        }
    }
}
</style>
