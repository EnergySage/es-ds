<script setup lang="ts">
import Dialog from "primevue/dialog";

import { watch } from "vue";

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

const visible = defineModel<boolean>("visible");
</script>

<template>
    <Dialog v-model:visible="visible" modal :class="`modal-${size}`" :pt="modalPt">
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
    </Dialog>
</template>
