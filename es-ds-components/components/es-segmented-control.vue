<script setup lang="ts">
import SelectButton from 'primevue/selectbutton';

/**
 * TODOs:
 *  - resize active bubble on breakpoint change, due to padding
 *  - focus states
 */

interface SegmentedControlItem {
    label: string;
}

interface Props {
    ariaLabel: string;
    disabled?: boolean;
    options: SegmentedControlItem[];
}

interface ButtonDimensionsInterface {
    options: Partial<CSSStyleDeclaration>[];
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false
});
const model = defineModel<number>();
const segmentedControlRef = useTemplateRef('segmentedControl');

// needed to avoid Content Layout Shift (CLS)
// as the inkbar is positioned via left and width attributes which are not set until mount
// meaning the active state would be initially missing and then pop in on mount, causing CLS
const isMounted = ref(false);

const buttonDimensions: ButtonDimensionsInterface = reactive({
    options: props.options?.length ? props.options.map(() => ({})) : [],
});

const inkbarStyle: ComputedRef<Partial<CSSStyleDeclaration>> = computed(() => buttonDimensions.options[model.value || 0]);

// assume the provided aria-label is unique and convert to an id
// by lowercasing and replacing all whitespace with dashes
const labelId = computed(() => {
    return props.ariaLabel ? props.ariaLabel.toLowerCase().replace(/\s/g, '-') : '';
});

const getButtonDimensions = () => {
    if (!segmentedControlRef.value) {
        return [];
    }

    const buttons = segmentedControlRef.value.querySelectorAll('.es-segmented-control-button');
    const result = [];
    let runningLeftTotal = 0;
    for (let i = 0; i < buttons.length; i += 1) {
        result.push({
            left: `${runningLeftTotal}px`,
            width: `${buttons[i].offsetWidth}px`,
        });

        runningLeftTotal += buttons[i].offsetWidth;
    }

    return result;
};

onMounted(() => {
    isMounted.value = true;

    if (segmentedControlRef.value) {
        buttonDimensions.options = getButtonDimensions();
    }
});
</script>

<template>
    <div
        v-if="$props.options?.length"
        ref="segmentedControl"
        :aria-hidden="props.disabled || undefined"
        class="es-segmented-control d-flex position-relative"
        :class="{
            disabled: props.disabled,
            'before-mount': !isMounted,
        }">
        <label
            :id="labelId"
            class="sr-only">
            {{ ariaLabel }}
        </label>
        <span
            class="es-segmented-control-inkbar rounded-lg position-absolute"
            :data-left="buttonDimensions.options[model || 0]?.left || 0"
            :style="inkbarStyle" />
        <select-button
            v-model="model"
            :allow-empty="false"
            :aria-labelledby="labelId"
            data-key="label"
            :disabled="props.disabled"
            :option-label="(option) => option.label"
            :option-value="(option) => props.options.findIndex((innerOption) => option.label === innerOption.label)"
            :options="props.options"
            :pt="{
                root: 'bg-gray-100 d-flex rounded-lg',
                button: 'es-segmented-control-button font-size-sm font-weight-bold position-relative px-200 px-lg-300 rounded-lg',
                label: 'es-segmented-control-label position-relative'
            }"
            :unselectable="false" />
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

/* avoid Content Layout Shift (CLS) */
.es-segmented-control.before-mount {
    .es-segmented-control-inkbar {
        /* prevent inkbar with left and width of zero from showing up between first paint and mount */
        opacity: 0;
    }

    :deep(.es-segmented-control-button) {
        position: relative;

        /* temporarily replicate the inkbar's active state until mount */
        &[data-p-highlight='true'] {
            &::before {
                border-radius: variables.$border-radius-lg;
                content: '';
                left: 0;
                position: absolute;
                width: 100%;
                z-index: 3;
            }
        }
    }
}

/* active state bubble */
.es-segmented-control-inkbar,
.es-segmented-control.before-mount :deep(.es-segmented-control-button[data-p-highlight='true']::before) {
    /* using style for bg instead of bg-white class so it can be overridden for disabled state */
    background-color: variables.$white;
    border: 2px solid variables.$warm-orange;
    bottom: 2px;
    top: 2px;
    /* bring it ~2px away from each side to match the top/bottom */
    transform: scaleX(0.98);

    @media not (prefers-reduced-motion) {
        transition:
            left 250ms cubic-bezier(0.35, 0, 0.25, 1),
            width 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
}

/* each individual option */
:deep(.es-segmented-control-button) {
    color: variables.$gray-700;
    cursor: pointer;
    /*
        need a non-standard padding to cause a specific height that matches
        better with our "lg" 14px border radius to get the rounded pill look
    */
    padding-bottom: 6px;
    padding-top: 6px;
    transition: 250ms ease-in-out;
    /* prevent text from highlighting when you click a bunch of times */
    user-select: none;
    white-space: nowrap;
    z-index: 4;

    &:hover {
        color: variables.$gray-900;
    }

    /*&:focus,
    &:focus-visible {
        box-shadow: 0 0 0 3px variables.$warm-orange inset;
        outline: none;
    }*/
}

/* bring the label above the active state bubble */
:deep(.es-segmented-control-label) {
    z-index: 4;
}

/* disabled state */
.es-segmented-control.disabled,
.es-segmented-control.before-mount.disabled {
    cursor: default;
    pointer-events: none;
    user-select: none;

    /* active bubble */
    .es-segmented-control-inkbar,
    :deep(.es-segmented-control-button[data-p-highlight='true']::before) {
        background-color: variables.$gray-200;
        border-color: variables.$gray-300;
    }

    /* text inside active bubble */
    :deep(.es-segmented-control-button[data-p-highlight='true']) {
        &,
        &:hover {
            color: variables.$gray-500;
        }
    }

    /* all other items */
    :deep(.es-segmented-control-button) {
        color: variables.$gray-500;
    }
}
</style>
