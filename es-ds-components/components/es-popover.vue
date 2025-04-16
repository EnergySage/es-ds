<script setup lang="ts">
import OverlayPanel from 'primevue/overlaypanel';

const props = defineProps({
    target: {
        type: String,
        required: true,
    },
    triggers: {
        type: String,
        required: false,
        default: 'focus',
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
const triggeredBy = ref('');
const closePanel = () => {
    op.value?.hide();
};
const showPanel = (event: Event) => {
    if (event.type !== 'mouseover') {
        triggeredBy.value = event.type;
    } else {
        const overlayVisible = (op.value as any)?.visible as boolean | undefined;
        if (!overlayVisible) {
            triggeredBy.value = event.type;
        }
    }
    op.value?.show(event);
};
const addHoverListener = () => {
    if (!props.triggers.split(' ').includes('hover')) return;

    const targetElement = document.getElementById(props.target);
    const overlayElement = (op.value as any)?.container as HTMLElement | undefined;
    overlayElement?.addEventListener('mouseleave', () => {
        // Add a 0.25s delay before closing the panel to ensure the user
        // can hover over the target element before the panel closes
        setTimeout(() => {
            if (targetElement && !targetElement.matches(':hover') && triggeredBy.value === 'mouseover') {
                closePanel();
            }
        }, 250);
    });
};
onMounted(() => {
    const targetElement = document.getElementById(props.target);
    if (targetElement) {
        const triggers = props.triggers.split(' ').map((trigger) => (trigger === 'hover' ? 'mouseover' : trigger));

        for (const trigger of triggers) {
            targetElement.addEventListener(trigger, showPanel);

            if (trigger === 'mouseover') {
                targetElement.addEventListener('mouseleave', () => {
                    // Add a 0.25s delay before closing the panel to ensure the user
                    // can hover over the popover body before it closes
                    setTimeout(() => {
                        if (triggeredBy.value === 'mouseover' && !(op.value as any)?.container?.matches(':hover')) {
                            closePanel();
                        }
                    }, 250);
                });
            }
        }
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
    },
);
</script>

<template>
    <overlay-panel
        ref="op"
        :dismissable="true"
        append-to="body"
        :pt="{
            root: {
                class: `popover b-popover ${props.variant === 'light' ? 'es-popover-light' : 'es-popover-dark'}`,
            },
            transition: {
                enterFromClass: 'es-popover-enter-from',
                enterActiveClass: 'es-popover-enter-active',
                leaveActiveClass: 'es-popover-leave-active',
                leaveToClass: 'es-popover-leave-to',
            },
        }"
        @show="addHoverListener">
        <div class="arrow"></div>
        <template v-if="hasTitle">
            <!-- Title slot content -->
            <h3 class="popover-header">
                <slot name="title" />
                <button
                    class="es-popover-close p-0 float-right bg-transparent"
                    @click="closePanel">
                    <icon-x
                        height="20px"
                        width="20px" />
                </button>
            </h3>
        </template>
        <!-- Popover Content -->
        <div class="popover-body">
            <div class="d-flex">
                <slot />
                <button
                    v-if="!hasTitle"
                    class="es-popover-close p-0 pl-50 mb-auto bg-transparent"
                    @click="closePanel">
                    <icon-x
                        height="20px"
                        width="20px" />
                </button>
            </div>
        </div>
    </overlay-panel>
</template>
