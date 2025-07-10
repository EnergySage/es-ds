<script setup lang="ts">
import PrimeDialog from 'primevue/dialog';

interface Props {
    bodyClass?: string;
    closable?: boolean;
    hideFooter?: boolean;
    id: string;
    showFooterSeparator?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}
const props = withDefaults(defineProps<Props>(), {
    bodyClass: '',
    closable: true,
    hideFooter: false,
    showFooterSeparator: true,
    size: 'md',
});

const slots = useSlots();

const modalPt = {
    root: {
        class: 'modal-dialog modal-dialog-scrollable modal-content',
    },
    header: {
        class: slots['modal-title'] ? 'modal-header' : '',
    },
    title: {
        class: 'modal-title',
    },
    closeButton: {
        class: [
            'close',
            {
                // if closable is true, keep the close button around (for accessibility, and to
                // allow Escape to still close the modal), but hide it visually
                'sr-only': !props.closable
            },
        ],
    },
    content: {
        class: `modal-body ${props.bodyClass}`,
    },
    footer: {
        class: `modal-footer ${props.showFooterSeparator ? 'footer-separator' : ''}`,
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
    const modalSize = `modal-${props.size}`;
    return modalSize;
});
</script>

<template>
    <prime-dialog
        :id="id"
        modal
        :class="getSizeClass"
        :pt="modalPt"
        dismissable-mask
        @update:visible="onChange">
        <template
            v-if="slots['modal-title']"
            #header>
            <h5
                :id="`${id}_header`"
                class="modal-title h2">
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
