<script setup lang="ts">
import Panel from 'primevue/panel';

const emit = defineEmits(['toggled', 'userClick']);

const model = defineModel<boolean>();
const props = defineProps({
    border: {
        type: Boolean,
        default: true,
    },
    isProgrammaticUntilUserInput: {
        type: Boolean,
        default: true,
    },
    visible: {
        type: Boolean,
        default: false,
    },
});

const userDeterminedState: Ref<boolean | null> = ref(null);
const uniqueId = useId();

// directly determines the expanded/collapsed state of the panel
const expanded = computed(() => {
    // if we are meant to start ignoring the programmatic incoming state as soon as the
    // user interacts with the collapse, and if the user has interacted with the collapse,
    // use the value from the user's interaction
    if (props.isProgrammaticUntilUserInput && userDeterminedState.value !== null) {
        return userDeterminedState.value;
    }

    // otherwise, use the one-way visible prop or the two-way v-model value
    return props.visible || model.value;
});

const onClick = ({ value }: { value: boolean }) => {
    // save the state toggled by the user
    // convert from "collapsed" semantics internal to the primevue panel
    // to the "expanded" semantics exposed by this component
    userDeterminedState.value = !value;

    // inform the v-model (if any) that the state has changed
    model.value = !value;

    // emit events indicating the state has changed
    emit('toggled', !value);
    emit('userClick', !value);
};
</script>

<template>
    <panel
        :collapsed="!expanded"
        :toggle-button-props="{ 'aria-labelledby': uniqueId }"
        :pt="{
            header: 'd-flex flex-column justify-content-center position-relative py-100',
            icons: 'h-100 position-absolute w-100',
            root: border ? 'border-bottom border-top' : '',
            toggler: {
                // eslint-disable-next-line max-len
                class: 'es-collapse-toggler align-items-center btn btn-link d-flex h-100 inline justify-content-end rounded-0 p-0 position-absolute text-body w-100',
            },
            // https://vuejs.org/guide/built-ins/transition
            transition: {
                enterActiveClass: 'es-collapse-enter-active',
                enterFromClass: 'es-collapse-enter-from',
                enterToClass: 'es-collapse-enter-to',
                leaveActiveClass: 'es-collapse-leave-active',
                leaveFromClass: 'es-collapse-leave-from',
                leaveToClass: 'es-collapse-leave-to',
            },
        }"
        toggleable
        @toggle="onClick">
        <template #header>
            <div :id="uniqueId">
                <slot name="title" />
            </div>
        </template>
        <template #togglericon>
            <icon-chevron-down />
        </template>
        <slot />
    </panel>
</template>
<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

:deep(.es-collapse-toggler:focus-visible) {
    outline: 2px auto variables.$blue-600;
    outline: 2px auto -webkit-focus-ring-color;
    outline-offset: 2px;
}
</style>
