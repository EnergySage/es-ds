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
        class: "modal show",
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
    <prime-dialog modal :class="`modal-${size}`" :pt="modalPt" @update:visible="onChange">
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
