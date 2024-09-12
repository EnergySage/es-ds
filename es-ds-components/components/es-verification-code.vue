<script setup lang="ts">
import InputOtp from 'primevue/inputotp';

const model = defineModel<string>();
const verificationCode = ref();

watch(model, (newVal) => {
    verificationCode.value = newVal;
});

const updateCode = (newValue) => {
    model.value = newValue;
};
</script>

<template>
    <div>
        <input-otp
            v-model="verificationCode"
            class="custom-otp"
            :length="5"
            integer-only
            @update:model-value="updateCode">
            <!-- eslint-disable-next-line vue/no-lone-template -->
            <template #default="{ attrs, events, index }">
                <input
                    :id="index.toString()"
                    type="text"
                    class="custom-otp-input"
                    v-bind="attrs"
                    v-on="events" />
            </template>
        </input-otp>
    </div>
</template>

<style lang="scss" scoped>
@use "@energysage/es-ds-styles/scss/variables" as variables;
@use "@energysage/es-ds-styles/scss/mixins/breakpoints" as breakpoints;

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
    height:variables.$verification-code-dimension-lg;
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
.red-input {
    background-color: red;
}
</style>
