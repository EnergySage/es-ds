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
</script>

<template>
    <div v-if="show" role="alert" aria-live="polite" aria-atomic="true"
         class="alert es-form-msg my-100 alert-dismissible" :class="`alert-${variant}`">
        <button type="button" aria-label="Close" class="close" @click="$emit('hidden')">
            icon-x
        </button>
        <div class="d-flex pr-100">
            <div class="icon-wrapper flex-shrink-0 mr-100">
                <!-- todo put in the actual icons once they're available -->
                <div v-if="variant === 'danger'">icon-circle-alert</div>
                <div v-if="variant === 'success'">icon-circle-check</div>
                <div v-if="variant === 'primary'">icon-info</div>
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
