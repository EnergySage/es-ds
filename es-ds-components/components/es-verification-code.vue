<script setup lang="ts">
import InputOtp from 'primevue/inputotp';

const model = defineModel<Array<string>>();
const verificationCode = ref<string>();

const props = defineProps({
    charCount: {
        type: Number,
        default: 5,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const count = ref(props.charCount);
watch(model, (newVal) => {
    verificationCode.value = newVal ? newVal.join('') : '';
});

// Note: @update:model-value is erroneously requiring a boolean function argument,
// workaround for error is to specify any

const updateCode = (newValue: any) => {
    model.value = newValue.split('');
};
</script>

<template>
    <div>
        <input-otp
            v-model="verificationCode"
            class="custom-otp"
            v-bind="$attrs"
            :length="count"
            integer-only
            @update:model-value="updateCode">
            <template #default="{ attrs, events, index }">
                <input
                    :id="index.toString()"
                    type="text"
                    class="custom-otp-input form-control"
                    :disabled="props.disabled"
                    v-bind="attrs"
                    v-on="events" />
            </template>
        </input-otp>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

.custom-otp {
    display: flex;
    gap: 10px;
}
.custom-otp-input {
    font-weight: 600 !important;
    font-size: 1.875rem !important;
    line-height: 2.25rem !important;
    text-align: center;
    height: 5rem;
    width: 5rem;
    appearance: textfield;
    border: variables.$verification-code-border;
    border-radius: variables.$verification-code-border-radius !important;
    box-shadow: variables.$verification-code-shadow;
    height: variables.$verification-code-dimension-lg;
    width: variables.$verification-code-dimension-lg;
    flex: 0 0 auto;

    &:focus {
        border-color: variables.$verification-code-focus-border-color;
    }

    @include breakpoints.media-breakpoint-down(md) {
        height: variables.$verification-code-dimension-xs;
        width: variables.$verification-code-dimension-xs;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        appearance: none;
    }

    &:last-child {
        margin-right: 0 !important;
    }
}
</style>
