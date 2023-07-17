<template>
    <EsCard
        :href="showForm ? null : url"
        :tag="showForm ? 'div' : 'b-link'"
        :target="cardTarget"
        class="es-cta"
        :class="{ 'bg-gray text-white': dark }"
        :variant="showForm ? 'display' : 'interactive'"
        v-bind="$attrs"
        v-on="$listeners">
        <div class="flex-layout-outer">
            <div
                v-if="headingFirst"
                class="heading-first text-center"
                :class="[headingClass, { 'text-white': dark }]">
                {{ heading }}
            </div>
            <div
                v-if="image"
                class="image-wrapper"
                :style="`width:${imageWidth}; height:${imageHeight};`">
                <img
                    lazy
                    class="image d-block h-100 w-100"
                    :width="imageWidth"
                    :height="imageHeight"
                    :src="image"
                    :alt="imageAltText">
            </div>
            <div class="flex-layout-inner d-flex justify-content-center w-100">
                <div class="content-area d-flex flex-column">
                    <div
                        class="heading-default"
                        :class="[
                            headingClass,
                            subtitle ? 'mb-50' : 'mb-0',
                            { 'text-white': dark, 'd-none': headingFirst },
                        ]">
                        {{ heading }}
                    </div>
                    <div v-if="subtitle">
                        {{ subtitle }}
                    </div>
                </div>
                <div
                    v-if="showForm"
                    class="form-area d-flex flex-column">
                    <b-form
                        ref="ctaForm"
                        class="form-input-area"
                        :class="{ invalid: $v.$dirty && $v.$invalid }"
                        :action="url"
                        method="get"
                        novalidate
                        :target="cardTarget"
                        @submit.prevent.stop="handleSubmit">
                        <es-form-input
                            v-if="showZipEntry"
                            :id="inputId"
                            v-model="zipCode"
                            name="zip_code"
                            class="zip-entry"
                            autocomplete="postal-code"
                            inputmode="numeric"
                            label-sr-only
                            maxlength="5"
                            pattern="\d*"
                            placeholder="ZIP code"
                            required
                            :state="validateState('zipCode')">
                            <template #prefixIcon>
                                <icon-location class="text-gray-800" />
                            </template>
                            <template #label>
                                ZIP code
                            </template>
                            <template #errorMessage>
                                {{ errorDescription }}
                            </template>
                        </es-form-input>
                        <es-button
                            class="cta-button"
                            :class="{ 'mb-50': showPrivacyPolicy & showZipEntry }"
                            type="submit">
                            {{ buttonText }}
                        </es-button>
                    </b-form>
                    <div v-if="showPrivacyPolicy & showZipEntry">
                        <span v-if="privacyPolicyText">
                            {{ privacyPolicyText }}
                        </span>
                        <icon-lock-on
                            v-else
                            class="privacy-lock-icon mr-25 position-relative"
                            height="1.125rem"
                            width="1.125rem" />
                        <a
                            :href="privacyPolicyLink"
                            class="text-nowrap"
                            :class="dark ? 'text-white' : 'text-dark'">{{ privacyPolicyLinkText }}</a>
                    </div>
                </div>
            </div>
        </div>
    </EsCard>
</template>

<script lang="js">
import { formMixins } from '../lib-mixins';
import {
    vuelidateMinLength,
    vuelidateMaxLength,
    vuelidateNumeric,
    vuelidateRequired,
} from '../lib-validators';
import EsButton from './EsButton.vue';
import EsCard from './EsCard.vue';
import EsFormInput from './EsFormInput.vue';
import IconLocation from '../lib-icons/icon-location.vue';
import IconLockOn from '../lib-icons/icon-lock-on.vue';

export default {
    name: 'EsCta',
    components: {
        EsButton,
        EsCard,
        EsFormInput,
        IconLocation,
        IconLockOn,
    },
    mixins: [formMixins],
    props: {
        buttonText: {
            type: String,
            default: '',
        },
        contextDomain: {
            type: String,
            default: '',
        },
        dark: {
            type: Boolean,
            default: false,
        },
        errorDescription: {
            type: String,
            default: 'Please enter a 5-digit zip code.',
        },
        heading: {
            type: String,
            required: true,
        },
        headingFirst: {
            type: Boolean,
            default: false,
        },
        headingClass: {
            type: String,
            default: 'h2',
        },
        image: {
            type: String,
            default: '',
        },
        imageAltText: {
            type: String,
            default: '',
        },
        imageHeight: {
            type: String,
            default: '',
        },
        imageWidth: {
            type: String,
            default: '',
        },
        inputId: {
            type: String,
            default: '',
        },
        showForm: {
            type: Boolean,
            default: false,
        },
        showPrivacyPolicy: {
            type: Boolean,
            default: true,
        },
        showZipEntry: {
            type: Boolean,
            default: false,
        },
        subtitle: {
            type: String,
            default: '',
        },
        privacyPolicyLink: {
            type: String,
            default: 'https://www.energysage.com/privacy-policy/',
        },
        privacyPolicyLinkText: {
            type: String,
            default: 'Privacy Policy',
        },
        privacyPolicyText: {
            type: String,
            default: 'Your information is safe with us.',
        },
        url: {
            type: String,
            required: true,
        },
    },
    data() {
        return {

            zipCode: '',
        };
    },
    computed: {
        newTab() {
            if (window?.location) {
                return !this.url.includes(window?.location?.host);
            }
            // Any string includes '', so this defaults to false
            return !this.url.includes(this.contextDomain);
        },
        cardTarget() {
            return this.newTab ? '_blank' : '_self';
        },
    },
    methods: {
        handleSubmit() {
            if (this.showZipEntry && this?.$v?.$invalid) {
                // if form is invalid, touch to display errors and get out
                this.$v.$touch();
            } else {
                this.$refs.ctaForm.submit();
            }
        },
    },
    validations: {
        zipCode: {
            maxLength: vuelidateMaxLength(5),
            minLength: vuelidateMinLength(5),
            numeric: vuelidateNumeric,
            required: vuelidateRequired,
        },
    },
};
</script>
<style lang="scss" scoped>
@use 'sass:map';
@import '~@energysage/es-bs-base/scss/includes';
@import '~@energysage/es-bs-base/scss/bootstrap';

.es-cta {
    container-name: card;
    container-type: inline-size;
}

.flex-layout-outer {
    container-name: outer;
    container-type: inline-size;
    @container card (min-width: 600px) {
        display: flex;
    }
}

.flex-layout-inner {
    flex-direction: column;
    @container outer (min-width: 700px) {
        flex-direction: row;
    }
}

.image-wrapper {
    margin: 0 auto map.get($spacers, 100);
    @container card (min-width: 600px) {
        margin: 0 map.get($spacers, 100) 0 0;
    }
}

.image {
    object-fit: contain;
}

.content-area {
    align-items: center;
    margin-bottom: map.get($spacers, 100);
    text-align: center;

    @container outer (min-width: 700px) {
        align-items: start;
        margin-block: auto;
        margin-right: map.get($spacers, 50);
        text-align: start;
        width: 50%;
    }
}

@container card (min-width: 600px) {
    .heading-default {
        display: block !important;
    }

    .heading-first {
        display: none;
    }
}

.form-area {
    align-items: center;
    container-name: form;
    container-type: inline-size;
    text-align: center;

    @container outer (min-width: 700px) {
        align-items: end;
        margin-block: auto;
        margin-left: map.get($spacers, 50);
        text-align: end;
        width: 50%;
    }
}

.cta-button {
    @container form (max-width: 389px) {
        width: 100%;
    }
}

.form-input-area {
    @container form (min-width: 390px) {
        align-items: center;
        display: flex;
        justify-content: center;

        &.invalid {
            align-items: start;
        }

        .zip-entry {
            margin-right: map.get($spacers, 25);
        }

        .cta-button {
            margin-left: map.get($spacers, 25);
        }
    }
}

.privacy-lock-icon {
    top: -0.1em;
}
</style>
