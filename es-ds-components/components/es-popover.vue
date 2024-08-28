<script setup lang="ts">
import OverlayPanel from 'primevue/overlaypanel';

const props = defineProps({
    target: {
        type: String,
        required: true,
    },
    triggers: {
        type: [String, Object],
        required: false,
        default: 'focus',
    },
    placement: {
        type: String,
        required: false,
        default: 'auto',
        validator: (val: string) => ['auto', 'top', 'bottom', 'right', 'left', 'topleft', 'topright', 'bottomleft', 'bottomright', 'lefttop', 'leftbottom', 'righttop', 'rightbottom'].includes(val),
    },
    show: {
        type: Boolean,
        required: false,
        default: false,
    },
    variant: {
        type: String,
        required: false,
        default: 'dark',
        validator: (val: string) => ['light', 'dark'].includes(val as string),
    },
});

const op = ref<InstanceType<typeof OverlayPanel> | null>(null);
const slots = useSlots();
const hasTitle = computed(() => !!slots.title);
const closePanel = () => {
    op.value?.hide();
};
const showPanel = (event: Event) => {
    if (op.value) {
        op.value.toggle(event);
    }
};


onMounted(() => {
    const targetElement = document.getElementById(props.target);
    if (targetElement) {
        targetElement.addEventListener(props.triggers as string, showPanel);
    }
});

watch(
    () => props.show,
    (newVal) => {
        if (newVal) {
            const targetElement = document.getElementById(props.target);
            if (targetElement) {
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                });
                targetElement.dispatchEvent(event);
            }
        } else {
            closePanel();
        }
    }
);

const overlayPanelStyle = computed(() => {
    switch (props.placement) {
        case 'topright':
            return {
                transform: 'translateX(7%) translateY(-100%)',
            };
        case 'bottomright':
            return {
                transform: 'translateX(3%) translateY(0)',
            };
        case 'leftbottom':
            return {
                transform: 'translateX(-100%) translateY(0)',
            };
        case 'rightbottom':
            return {
                transform: 'translateX(7%) translateY(-50%)',
            }
        default:
            return {};
    }
});

const popoverPt = {
    root: {
         class: `popover ${props.variant === 'light' ? 'es-popover-light':'es-popover-dark'}`,
    },
};
</script>

<template>
    <overlay-panel ref="op" :dismissable="true" appendTo="body" :pt="popoverPt" :style="overlayPanelStyle">
        <template v-if="hasTitle">
            <!-- Title slot content -->
            <h3 class="popover-header">
                <slot name="title" />
                <button
                    class="es-popover-close p-0 float-right custom-x-icon"
                    @click="closePanel">
                    <icon-x height="20px" width="20px" />
                </button>
            </h3>
        </template>
        <!-- Popover Content -->
        <div class="popover-body">
            <div class="d-flex">
                <slot />
                <button
                    v-if="!hasTitle"
                    class="es-popover-close p-0 pl-50 mb-auto custom-x-icon"
                    @click="closePanel">
                    <icon-x class="custom-x-ixon" height="20px" width="20px" />
                </button>
            </div>
        </div>
    </overlay-panel>
</template>

<style lang="scss">
@use "@energysage/es-ds-styles/scss/variables" as variables;
/* Styles copied from the old implementation to maintain consistency */
.es-popover-light {
    &.popover {
        background-color: variables.$white;
        border: 1px solid variables.$white;
    }

    .popover-header {
        background-color: variables.$white;
    }

    .popover-header, .popover-body, .es-popover-close {
        color: variables.$gray-900;
    }
}
.es-popover-dark {
    .es-popover-close, a {
        color: variables.$white;
    }
}

.custom-x-icon {
    background-color: transparent;
}

.es-popover-close {
    border: none;
}
</style>

