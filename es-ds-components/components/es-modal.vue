<script setup lang="ts">
import PrimeDialog from "primevue/dialog";

const props = defineProps({
    hideFooter: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: "lg",
    },
});

const modalPt = {
    root: {
        class: "modal-content",
    },
    mask: {
        class: "p-dialog-mask p-component-overlay p-component-overlay-enter",
    },
    header: {
        class: "modal-header",
    },
    title: {
        class: "modal-title",
    },
    closeButton: {
        class: "close",
    },
    content: {
        class: "modal-body",
    },
    footer: {
        class: "modal-footer",
    },
};

const emit = defineEmits(["hidden"]);

const onChange = (visible: boolean) => {
    if (!visible) {
        emit("hidden");
    }
};
</script>

<template>
    <prime-dialog modal :class="`modal-${size}`" :pt="modalPt" @update:visible="onChange" dismissable-mask>
        <template #header>
            <h5 class="modal-title h2">
                <slot name="modal-title" />
            </h5>
        </template>

        <template #closeicon>
            <icon-x class="text-gray-900" height="2rem" width="2rem" />
        </template>

        <slot />

        <template #footer v-if="!hideFooter">
            <slot name="modal-footer" />
        </template>
    </prime-dialog>
</template>

<style lang="scss">
:root {
    --maskbg: rgba(0, 0, 0, 0.07);
}

.modal-content {
    max-height: 90%;
}

.modal-body {
    overflow-y: auto;
}

.p-component-overlay {
    background-color: var(--maskbg);
    transition-duration: 0.2s;
}

.p-dialog-mask.p-component-overlay {
    pointer-events: auto;
}

.p-component-overlay-enter {
    animation: p-component-overlay-enter-animation 150ms forwards;
}

.p-component-overlay-leave {
    animation: p-component-overlay-leave-animation 150ms forwards;
}

@keyframes p-component-overlay-enter-animation {
    from {
        background-color: transparent;
    }
    to {
        background-color: var(--maskbg);
    }
}

@keyframes p-component-overlay-leave-animation {
    from {
        background-color: var(--maskbg);
    }
    to {
        background-color: transparent;
    }
}
</style>
