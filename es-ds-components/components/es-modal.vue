<script setup lang="ts">
import PrimeDialog from "primevue/dialog";

const props = defineProps({
    hideFooter: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: "md",
        validator: (val) => ["sm", "md", "lg", "xl"].includes(val),
    },
});

const modalPt = {
    root: {
        class: "modal-content",
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
    /*
        TODO: see if there's a way of getting a transition on the mask.
        the below transition classes are put on the dialog element, which
        is the child of the mask element, so we currently have no way of
        animating away the mask background upon modal close; only animation
        in on modal open is set up
    */
    mask: {
        class: 'es-modal-mask',
    },
    // https://vuejs.org/guide/built-ins/transition
    transition: {
        enterActiveClass: 'es-modal-enter-active',
        enterFromClass: 'es-modal-enter-from',
        enterToClass: 'es-modal-enter-to',
        leaveActiveClass: 'es-modal-leave-active',
        leaveFromClass: 'es-modal-leave-from',
        leaveToClass: 'es-modal-leave-to'
    },
};

const emit = defineEmits(["hidden"]);

const onChange = (visible: boolean) => {
    if (!visible) {
        emit("hidden");
    }
};

const getSizeClass = computed(() => {
    const modalSize = props.size === "" ? "modal-md" : `modal-${props.size}`;
    return modalSize;
});
</script>

<template>
    <prime-dialog modal :class="getSizeClass" :pt="modalPt" @update:visible="onChange" dismissable-mask>
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
