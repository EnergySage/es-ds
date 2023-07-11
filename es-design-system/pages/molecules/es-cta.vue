<template>
    <div>
        <h1>
            CTA
        </h1>
        <p class="mb-450">
            Description
        </p>
        <div class="mb-450">
            <h2 class="mb-200">
                Variant 1
            </h2>
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
                            class="image d-block h-100 w-100"
                            :width="imageWidth"
                            :height="imageHeight"
                            :src="image"
                            :alt="imageAltText">
                    </div>
                    <div class="flex-layout-inner d-flex w-100">
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
        </div>
        <div class="mb-450">
            <h2>
                EsCta props
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>buttonText</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>''</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Required if <code>showForm</code> is <code>true</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>dark</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>false</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Renders the CTA with white text on a dark background.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>errorDescription</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'Please enter a 5-digit zip code.'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Validation error text for zip entry. Required if <code>showZipEntry</code> is
                            <code>true</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>heading</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            None - <strong>required.</strong>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Heading copy
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>headingFirst</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>false</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Renders the heading (but not the subtitle) above the image. Automatically disabled on wide
                            views with image in left column.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>headingClass</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'h2'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Class override to render heading at a specific size or heading level. Does not affect
                            heading tag type, which is always a <code>div</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>image</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>''</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            URL for an image to include. If included, <code>imageHeight</code> and
                            <code>imageWidth</code> must also be set.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>imageAltText</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>''</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Alt text for image.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>imageHeight</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>''</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Desired display height of image. Required if <code>image</code> is included. Image will
                            scale down (not crop) to fit the height and width specified while maintaining aspect ratio.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>imageWidth</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>''</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Desired display width of image. Required if <code>image</code> is included. Image will
                            scale down (not crop) to fit the height and width specified while maintaining aspect ratio.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>inputId</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>''</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            <code>id</code> attribute for the zip entry. Must be unique on the page. Required if
                            <code>showZipEntry</code> is <code>true</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>showForm</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>false</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Whether to show a button (and zip entry if enabled) on the CTA. By default, the whole CTA
                            card is a clickable link.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>showPrivacyPolicy</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>true</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Whether to show the privacy policy link. If <code>showZipEntry</code> is not
                            <code>true</code>, the privacy policy will always be hidden.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>showZipEntry</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>false</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Whether to show the zip entry field. If enabled, <code>inputId</code> must be set with a
                            unique-per-page ID.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>subtitle</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>''</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Additional copy to display below the heading (or below the image if
                            <code>headingFirst</code> is <code>true</code>).
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>privacyPolicyLink</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'https://www.energysage.com/privacy-policy/'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Link to the privacy policy.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>privacyPolicyLinkText</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'Privacy Policy'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Text for the privacy policy link.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>privacyPolicyText</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'Your information is safe with us.'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Additional text to show before the privacy policy link. If set to a falsy value, a lock
                            icon will be displayed before the link instead.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>url</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            None - <strong>required.</strong>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            URL to go to when the CTA is clicked, or to submit the form to if <code>showForm</code> is
                            <code>true</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsCta.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-cta.vue" />
    </div>
</template>
<script>
import EsButton from '@energysage/es-vue-base/src/lib-components/EsButton.vue';
import EsCard from '@energysage/es-vue-base/src/lib-components/EsCard.vue';
import EsFormInput from '@energysage/es-vue-base/src/lib-components/EsFormInput.vue';
import IconLocation from '@energysage/es-vue-base/src/lib-icons/icon-location.vue';
import IconLockOn from '@energysage/es-vue-base/src/lib-icons/icon-lock-on.vue';
import {
    formMixins,
    vuelidateMinLength,
    vuelidateMaxLength,
    vuelidateNumeric,
    vuelidateRequired,
} from '@energysage/es-vue-base';

export default {
    name: 'EsCtaDocs',
    components: {
        EsButton,
        EsCard,
        EsFormInput,
        IconLocation,
        IconLockOn,
    },
    mixins: [formMixins],
    data() {
        return {
            buttonText: 'Clicky clicky',
            compCode: '',
            docCode: '',
            dark: false,
            errorDescription: 'Please enter a 5-digit zip code.',
            heading: 'This is a heading',
            headingFirst: true,
            headingClass: 'h2',
            image: 'https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-front.jpg?sfvrsn=495ad262_4',
            imageAltText: 'file',
            imageHeight: '200px',
            imageWidth: '200px',
            inputId: 'exampleId',
            subtitle: "For demonstration purposes, I'll add a subtitle that isn't empty",
            showForm: true,
            showZipEntry: true,
            showPrivacyPolicy: true,
            privacyPolicyLink: 'https://www.energysage.com/privacy-policy/',
            privacyPolicyLinkText: 'Privacy Policy',
            privacyPolicyText: 'Your information is safe with us.',
            url: 'https://www.energysage.com/market/start/',
            zipCode: '',
        };
    },
    computed: {
        newTab() {
            return !this.url.includes('www.energysage.com');
        },
        cardTarget() {
            if (!this.showForm) {
                return this.newTab ? '_blank' : '_self';
            }
            return null;
        },
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-cta.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsCta.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
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
    justify-content: center;
    @container outer (min-width: 700px) {
        flex-direction: row;
    }
}

.image-wrapper {
    margin: 0 auto 1rem;
    @container card (min-width: 600px) {
        margin: 0 1rem 0 0;
    }
}

.image {
    object-fit: contain;
}

.content-area {
    align-items: center;
    margin-bottom: 1rem;
    text-align: center;

    @container outer (min-width: 700px) {
        align-items: start;
        margin-block: auto;
        margin-right: 0.5rem;
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
        margin-left: 0.5rem;
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
            margin-right: 0.25rem;
        }

        .cta-button {
            margin-left: 0.25rem;
        }
    }
}

.privacy-lock-icon {
    top: -0.1em;
}
</style>
