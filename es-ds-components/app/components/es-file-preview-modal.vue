<script setup lang="ts">
defineProps({
    visible: {
        type: Boolean,
        default: false,
        required: false,
    },
    fileName: {
        type: String,
        default: 'test.png',
        required: false,
    },
    fileSource: {
        type: String,
        default: '',
        required: false,
    },
});

defineEmits(['hidden']);
</script>

<template>
    <es-modal
        :id="`preview-modal-${fileName}`"
        hide-footer
        :visible="visible"
        size="xl"
        body-class="border-top p-0"
        @hidden="$emit('hidden')">
        <template #modal-title>
            {{ fileName }}
        </template>
        <div class="d-md-none d-block file-preview text-center">
            <nuxt-img
                loading="lazy"
                class="img-fluid file-preview"
                :src="fileSource"
                :alt="fileName" />
        </div>
        <div class="d-none d-md-block">
            <div class="px-500 py-200 bg-gray-200">
                <div class="card bg-white file-preview">
                    <nuxt-img
                        loading="lazy"
                        class="img-fluid file-preview rounded-img"
                        :src="fileSource"
                        :alt="fileName" />
                </div>
            </div>
        </div>
    </es-modal>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.rounded-img {
    border-radius: variables.$card-inner-border-radius !important;
}
</style>
