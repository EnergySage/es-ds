<script setup lang="ts">
interface IProps {
    align?: 'left' | 'center' | 'right';
    constrained?: boolean;
    contextMessage?: string;
    dark?: boolean;
    fieldName?: string;
    inputId?: string;
    newTab?: boolean;
    placeholder?: string;
    privacyPolicyLink?: string;
    privacyPolicyNewTab?: boolean;
    replaceFieldNameInUrl?: boolean;
    selectedProduct?: string;
    showPrivacySection?: boolean;
    stackUntil?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
    url: string;
    zipCodeValue?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    align: 'left',
    constrained: false,
    contextMessage: '',
    dark: false,
    fieldName: 'zip_code',
    inputId: useId(),
    newTab: false,
    placeholder: 'ZIP code',
    privacyPolicyLink: '',
    privacyPolicyNewTab: false,
    replaceFieldNameInUrl: false,
    selectedProduct: '',
    showPrivacySection: true,
    stackUntil: '',
    zipCodeValue: '',
});

const state = reactive({
    zipCode: props.zipCodeValue,
});

watch(
    () => props.zipCodeValue,
    (newVal) => {
        state.zipCode = newVal;
    },
);

const stackBreak = computed(() => {
    let { stackUntil } = props;
    if (stackUntil === 'xs') {
        stackUntil = '';
    }
    return stackUntil ? `${stackUntil}-` : '';
});

/* Set up validation using Vuelidate */
const rules = {
    zipCode: {
        [vuelidateKeys.MAX_LENGTH]: vuelidateMaxLength(5),
        [vuelidateKeys.MIN_LENGTH]: vuelidateMinLength(5),
        [vuelidateKeys.INTEGER]: vuelidateInteger,
        [vuelidateKeys.REQUIRED]: vuelidateRequired,
    },
};

const replacementUrl = computed(() => {
    return props.url.replace(`{${props.fieldName}}`, state.zipCode);
});

const { v$, validateState } = useEsForms(rules, state);

const ctaForm = useTemplateRef<HTMLFormElement>('ctaForm');

const handleSubmit = () => {
    if (v$.value.$invalid) {
        v$.value.$touch();
    } else {
        if (props.replaceFieldNameInUrl) {
            navigateTo(replacementUrl.value, {
                external: true,
                open: {
                    target: props.newTab ? '_blank' : '_self',
                },
            });
        } else {
            ctaForm.value?.submit();
        }
    }
};
</script>

<template>
    <div
        class="EsZipCodeForm d-flex"
        :class="{
            'EsZipCodeForm--constrained': constrained,
            'text-white': dark,
        }"
        v-bind="$attrs">
        <div class="d-flex flex-column">
            <p
                v-if="contextMessage"
                class="mb-50 font-size-75 text-left">
                {{ contextMessage }}
            </p>
            <form
                ref="ctaForm"
                class="justify-content-center w-100"
                :class="{
                    [`d-${stackBreak}flex`]: stackUntil,
                    'mb-100': showPrivacySection,
                }"
                :action="replaceFieldNameInUrl ? replacementUrl : url"
                method="get"
                novalidate
                :target="newTab ? '_blank' : '_self'"
                @submit.prevent.stop="handleSubmit">
                <es-form-input
                    :id="inputId"
                    v-model="state.zipCode"
                    :state="validateState('zipCode')"
                    autocomplete="postal-code"
                    class="mb-100"
                    :class="{
                        [`mb-${stackBreak}0 mr-${stackBreak}50`]: stackUntil,
                    }"
                    inputmode="numeric"
                    label-sr-only
                    maxlength="5"
                    :name="fieldName"
                    pattern="\d*"
                    :placeholder="placeholder"
                    required>
                    <template #prefixIcon>
                        <icon-location class="text-gray-800" />
                    </template>
                    <template #label>
                        {{ placeholder }}
                    </template>
                    <template #errorMessage>
                        <span :class="{ 'text-white': dark }">
                            <slot name="errorMessage">Please enter a 5-digit zip code.</slot>
                        </span>
                    </template>
                </es-form-input>
                <input
                    v-if="selectedProduct"
                    type="hidden"
                    name="product"
                    :value="selectedProduct" />
                <es-button
                    class="text-nowrap w-100"
                    :class="{
                        [`ml-${stackBreak}50 w-${stackBreak}auto`]: stackUntil,
                        'px-100': constrained,
                    }"
                    type="submit"
                    :variant="dark ? 'dark-bg' : 'primary'">
                    <slot name="buttonText">Submit</slot>
                </es-button>
            </form>
            <div
                v-if="showPrivacySection"
                class="d-md-flex"
                :class="{
                    'font-size-75': constrained,
                    [`text-${align}`]: true,
                    'd-flex justify-content-start': align === 'left',
                    'justify-content-center': align === 'center',
                    'justify-content-end': align === 'right',
                }">
                <icon-lock-on
                    aria-hidden="true"
                    class="privacy-lock-icon flex-shrink-0 mr-50 position-relative"
                    :class="{
                        'mt-md-25': !constrained,
                        'mt-25': !constrained && align === 'left',
                    }"
                    height="1.125rem"
                    width="1.125rem" />
                <span>
                    <span>
                        <slot name="privacyExplanation">Your information is safe with us.</slot>
                    </span>
                    {{ ' ' }}
                    <nuxt-link
                        v-if="privacyPolicyLink"
                        :href="privacyPolicyLink"
                        class="text-nowrap"
                        :class="dark ? 'text-white' : ''"
                        :target="privacyPolicyNewTab ? '_blank' : '_self'">
                        <slot name="privacyPolicyLinkText">Privacy Policy</slot>
                    </nuxt-link>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.EsZipCodeForm {
    .privacy-lock-icon {
        top: -0.02em;
    }

    &--constrained {
        .privacy-lock-icon {
            top: 0.02em;
        }
    }
}
</style>
