<script setup lang="ts">
import TabMenu from 'primevue/tabmenu';

interface SegmentedControlItem {
    label: string;
}

interface Props {
    disabled?: boolean;
    items: SegmentedControlItem[];
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
});

// allow use of v-model on this component
const model = defineModel<number>();

// since the overall component doesn't have a disabled state but
// individual items do, if disabled is true, disable each item
const preparedItems = computed(() => {
    return props.disabled
        ? props.items.map((item) => ({
              ...item,
              disabled: true,
          }))
        : props.items;
});

// needed to avoid Content Layout Shift (CLS)
// as the inkbar is positioned via left and width attributes which are not set until mount
// meaning the active state would be initially missing and then pop in on mount, causing CLS
const beforeMountClass = ref('es-segmented-control-before-mount');
onMounted(() => {
    beforeMountClass.value = '';
});
</script>

<template>
    <!--
        TODO: use the breakpoints library and key to force it to remount upon changing breakpoints
        since we change padding between desktop and mobile, which changes the width, but PrimeVue
        doesn't update the width of the active state bubble on viewport resize
    -->
    <!--
        TODO: TabMenu doesn't read out to screen readers when you've selected an item, or whether an
        item is selected when you get to it. major problem. but it does allow us the nice animation.

        SelectButton acts as radio buttons rather than a menu behind the scenes, so it does read out
        to screen readers when an item is selected or not. but i don't believe there's a way of doing
        the smooth animation with that component.
    -->
    <tab-menu
        v-model:active-index="model"
        :class="`${beforeMountClass} d-flex`"
        :model="preparedItems"
        :pt="{
            menu: () => ({
                class: [
                    'es-segmented-control-menu bg-gray-100 d-flex list-unstyled mb-0 position-relative rounded-lg',
                    {
                        disabled: props.disabled,
                    },
                ],
            }),
            menuitem: 'es-segmented-control-menuitem d-flex',
            action: 'es-segmented-control-action font-size-sm font-weight-bold position-relative px-200 px-lg-300',
            inkbar: 'es-segmented-control-inkbar rounded-lg position-absolute',
        }" />
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

/* TODO: focus states */

/* avoid Content Layout Shift (CLS) */
.es-segmented-control-before-mount {
    :deep(.es-segmented-control-inkbar) {
        /* prevent inkbar with left and width of zero from showing up between first paint and mount */
        opacity: 0;
    }

    :deep(.es-segmented-control-menuitem) {
        position: relative;

        /* temporarily replicate the inkbar's active state until mount */
        &[data-p-highlight='true'] {
            &::before {
                border-radius: variables.$border-radius-lg;
                content: '';
                left: 0;
                position: absolute;
                width: 100%;
            }
        }
    }
}

:deep(.es-segmented-control-menuitem) {
    &[data-p-highlight='true'] {
        .es-segmented-control-action {
            &,
            &:hover {
                color: variables.$gray-900;
            }
        }
    }
}

:deep(.es-segmented-control-action) {
    color: variables.$gray-700;
    cursor: pointer;
    /* need a non-standard padding to cause a specific height that matches better with */
    /* our "lg" 14px border radius to get the rounded pill look */
    padding-bottom: 6px;
    padding-top: 6px;
    text-decoration: none;
    transition: 250ms ease-in-out;
    /* prevent text from highlighting when you click a bunch of times */
    user-select: none;
    white-space: nowrap;
    z-index: 4;

    &:hover {
        color: variables.$gray-900;
    }
}

/* active state bubble */
:deep(.es-segmented-control-inkbar),
.es-segmented-control-before-mount :deep(.es-segmented-control-menuitem[data-p-highlight='true']::before) {
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
}

/* disabled state */
:deep(.es-segmented-control-menu.disabled),
.es-segmented-control-before-mount :deep(.es-segmented-control-menu.disabled) {
    /* active bubble */
    .es-segmented-control-inkbar,
    .es-segmented-control-menuitem[data-p-highlight='true']::before {
        background-color: variables.$gray-200;
        border-color: variables.$gray-300;
    }

    /* text inside active bubble */
    .es-segmented-control-menuitem[data-p-highlight='true'] .es-segmented-control-action {
        &,
        &:hover {
            color: variables.$gray-500;
        }
    }

    /* all other items */
    .es-segmented-control-action {
        color: variables.$gray-500;
        cursor: default;
    }
}
</style>
