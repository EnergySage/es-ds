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
const closePanel = () => {
    op.value?.hide();
};
const showPanel = (event: Event) => {
    op.value?.show(event);
};

onMounted(() => {
    const targetElement = document.getElementById(props.target);
    if (targetElement) {
        const triggers = props.triggers.split(' ').map(trigger => trigger === 'hover' ? 'mouseover' : trigger);
        for (const trigger of triggers) {
            targetElement.addEventListener(trigger, showPanel);
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
    }
);
</script>

<template>
    <overlay-panel ref="op" :dismissable="true" appendTo="body" :pt="{
        root: {
             class: `popover b-popover ${props.variant === 'light' ? 'es-popover-light': 'es-popover-dark'}`,
        },
    }">
        <div class="arrow">
        </div>
        <template v-if="hasTitle">
            <!-- Title slot content -->
            <h3 class="popover-header">
                <slot name="title" />
                <button
                    class="es-popover-close p-0 float-right bg-transparent"
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
                    class="es-popover-close p-0 pl-50 mb-auto bg-transparent"
                    @click="closePanel">
                    <icon-x height="20px" width="20px" />
                </button>
            </div>
        </div>
    </overlay-panel>
</template>

