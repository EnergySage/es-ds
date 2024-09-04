<script setup lang="ts">
import PrimeDialog from 'primevue/dialog';

const props = defineProps({
    hideFooter: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'md',
        validator: (val) => ['sm', 'md', 'lg', 'xl'].includes(val),
    },
});

const modalPt = {
    root: {
        class: 'modal-content',
    },
    header: {
        class: 'modal-header',
    },
    title: {
        class: 'modal-title',
    },
    closeButton: {
        class: 'close',
    },
    content: {
        class: 'modal-body',
    },
    footer: {
        class: 'modal-footer',
    },
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
        leaveToClass: 'es-modal-leave-to',
    },
};

const emit = defineEmits(['hidden']);

const onChange = (visible: boolean) => {
    if (!visible) {
        emit('hidden');
    }
};

const getSizeClass = computed(() => {
    const modalSize = props.size === '' ? 'modal-md' : `modal-${props.size}`;
    return modalSize;
});
</script>

<template>
    <prime-dialog
        modal
        :class="getSizeClass"
        :pt="modalPt"
        dismissable-mask
        @update:visible="onChange">
        <template #header>
            <h5 class="modal-title h2">
                <slot name="modal-title" />
            </h5>
        </template>

        <template #closeicon>
            <icon-x
                class="text-gray-900"
                height="2rem"
                width="2rem" />
        </template>

        <slot />

        <template
            v-if="!hideFooter"
            #footer>
            <slot name="modal-footer" />
        </template>
    </prime-dialog>
</template>
