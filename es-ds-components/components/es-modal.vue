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
    /* TODO implement mask as scoped style? */
    mask: {
        style: "background-color: rgba(0, 0, 0, 0.075);",
    },
    /* TODO implement transition similiar to modal in v2 Design System */
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
