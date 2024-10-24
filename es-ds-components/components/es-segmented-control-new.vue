<script setup lang="ts">
import SelectButton from 'primevue/selectbutton';

interface SegmentedControlItem {
    label: string;
}

interface Props {
    options: SegmentedControlItem[];
}

interface ButtonDimensionsInterface {
    left: number;
    width: number;
}

const props = withDefaults(defineProps<Props>(), {});
const model = defineModel<number>();
const segmentedControlRef = useTemplateRef('segmentedControl');

const buttonDimensions: Ref<ButtonDimensionsInterface[]> = ref(
    props.options.map(() => ({
        left: 0,
        width: 0,
    })),
);

const getButtonDimensions = () => {
    if (!segmentedControlRef.value) {
        return [];
    }

    const buttons = segmentedControlRef.value.querySelectorAll('.es-segmented-control-button');
    const result = [];
    let runningLeftTotal = 0;

    for (let i = 0; i < buttons.length; i++) {
        console.log('button width', buttons[i].offsetWidth);
        result.push({
            left: runningLeftTotal,
            width: buttons[i].offsetWidth,
        });

        runningLeftTotal += buttons[i].offsetWidth;
    }

    return result;
};

onMounted(() => {
    if (segmentedControlRef.value) {
        buttonDimensions.value = getButtonDimensions();
    }
});
</script>

<template>
    <div
        ref="segmentedControl"
        class="d-flex position-relative">
        <span
            class="es-segmented-control-inkbar rounded-lg position-absolute"
            :style="{
                left: typeof model !== undefined ? buttonDimensions[model]?.left || 0 : 0,
                width: buttonDimensions[model.value]?.width || 0,
            }" />
        <select-button
            v-model="model"
            :allow-empty="false"
            :option-label="(option) => option.label"
            :option-value="(option) => props.options.findIndex((innerOption) => option.label === innerOption.label)"
            :options="props.options"
            :pt="{
                root: 'bg-gray-100 d-flex rounded-lg',
                button: 'es-segmented-control-button font-size-sm font-weight-bold position-relative px-200 px-lg-300',
            }"
            :unselectable="false" />
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-segmented-control-inkbar {
    /* using style for bg instead of bg-white class so it can be overridden for disabled state */
    background-color: variables.$white;
    border: 2px solid variables.$warm-orange;
    bottom: 2px;
    top: 2px;
    /* bring it ~2px away from each side to match the top/bottom */
    transform: scaleX(0.97);
    /* TODO: only animate when reduced motion isn't set */
    transition:
        left 250ms cubic-bezier(0.35, 0, 0.25, 1),
        width 250ms cubic-bezier(0.35, 0, 0.25, 1);

    left: 0;
    width: 100px;
}

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
}
</style>
