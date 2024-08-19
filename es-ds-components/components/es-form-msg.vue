<script setup lang="ts">
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    timeout: {
        type: Number,
        default: 20,
        required: false,
    },
    variant: {
        type: String,
        default: 'danger',
        required: false,
        validator: (val: string) => ['danger', 'success', 'primary'].includes(val),
    },
});

const emit = defineEmits(['hidden']);

const hide = () => {
    emit('hidden');
}

watch(() => props.show, (newValue, oldValue) => {
    if (newValue === true && oldValue === false) {
        setTimeout(() => {
            hide();
        }, props.timeout * 1000)
    }
});
</script>

<template>
    <div v-if="show" role="alert" aria-live="polite" aria-atomic="true"
         class="alert es-form-msg my-100 alert-dismissible" :class="`alert-${variant}`">
        <button type="button" aria-label="Close" class="close" @click="hide">
            <icon-x />
        </button>
        <div class="d-flex pr-100">
            <div class="icon-wrapper flex-shrink-0 mr-100">
                <icon-circle-alert v-if="variant === 'danger'" />
                <icon-circle-check v-if="variant === 'success'" />
                <icon-info v-if="variant === 'primary'" />
            </div>
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form-msg {
    flex: 0 0 100%;
    padding-right: 2.5rem;
}
</style>
