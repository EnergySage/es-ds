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
                Small example
            </h2>
            <es-zip-code-form
                button-text="Get quotes"
                context-domain="www.energysage.com"
                input-id="RSM-1"
                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                privacy-policy-text=""
                stack-until="*"
                url="https://www.energysage.com/market/start/" />
        </div>
        <div class="mb-450">
            <h2 class="mb-200">
                Large dark mode example
            </h2>
            <div class="bg-dark w-100 p-200 rounded">
                <es-zip-code-form
                    align="end"
                    button-text="Search projects"
                    context-domain="www.energysage.com"
                    dark
                    input-id="CSM-1"
                    new-tab
                    privacy-policy-link="https://www.energysage.com/privacy-policy/"
                    url="https://communitysolar.energysage.com/projects" />
            </div>
        </div>
        <div class="mb-450">
            <h2>
                EsZipCodeForm props
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>align</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'center'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Horizontal alignment of form and privacy policy copy. Valid options are 'start', 'center'
                            and 'end'. If <code>stackUntil</code> is non-empty, this will only apply above that
                            breakpoint.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
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
                            N/A - <strong>required.</strong>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Text to display on the submit button.
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
                            Renders the CTA with white text (suitable for display on a dark background.)
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
                            Validation error text for zip entry.
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
                            N/A - <strong>required.</strong>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            <code>id</code> attribute for the zip entry. Must be unique on the page.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>newTab</code>
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
                            Whether to open the URL in the <code>url</code> prop in a new tab.
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
                            N/A - <strong>required.</strong>
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
                            <code>privacyPolicyNewTab</code>
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
                            Whether to open the privacy policy link in a new tab.
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
                            Additional text to show before the privacy policy link.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>showLockIcon</code>
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
                            Whether to show the lock icon next to the privacy policy copy.
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
                            Whether to show the privacy policy link (and copy and icon, if applicable).
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>stackAlign</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'center'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Horizontal alignment for the form and text when the components are stacked. Only takes
                            effect if <code>stackUntil</code> is non-empty.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>stackUntil</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'sm'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Breakpoint up to which form should be stacked. Valid values are '', 'sm', 'md', 'lg', 'xl',
                            and 'xxl'. '' (empty string) will cause the component to never stack. An out-of-range value
                            like '*' will cause the component to always stack.
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
                            N/A - <strong>required.</strong>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            URL to submit the form to.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsZipCodeForm.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-zip-code-form.vue" />
    </div>
</template>
<script>
import EsButton from '@energysage/es-vue-base/src/lib-components/EsButton.vue';
import EsFormInput from '@energysage/es-vue-base/src/lib-components/EsFormInput.vue';
import IconLocation from '@energysage/es-vue-base/src/lib-icons/icon-location.vue';
import IconLockOn from '@energysage/es-vue-base/src/lib-icons/icon-lock-on.vue';
import {
formMixins,


} from '@energysage/es-vue-base';

export default {
    name: 'EsZipCodeFormDocs',
    components: {
        EsButton,
        EsFormInput,
        IconLocation,
        IconLockOn,
    },
    mixins: [formMixins],
    data() {
return {


            compCode: '',
docCode: '',


        };
},


    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-zip-code-form.vue');
            const compSource = await import(
                '!raw-loader!@energysage/es-vue-base/src/lib-components/EsZipCodeForm.vue'
            );
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
},


};
</script>
