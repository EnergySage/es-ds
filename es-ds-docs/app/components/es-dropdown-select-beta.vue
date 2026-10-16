<script setup lang="ts">
interface Props {
    disabled?: boolean;
    label?: string;
    modelValue?: any;
    noOptionsText?: string;
    options?: string[] | { label: string; value: string }[];
    placeholder?: string;
    required?: boolean;
    state?: boolean | null;
}
withDefaults(defineProps<Props>(), {
    disabled: false,
    modelValue: undefined,
    noOptionsText: 'No available options',
    options: () => [],
    placeholder: '',
    label: '',
    required: false,
    state: null,
});

const model = defineModel<string>();

const id = useId();
const labelId = useId();
</script>

<template>
    <div
        class="EsDropdown input-wrapper justify-content-end"
        :class="$attrs.class">
        <label
            :id="labelId"
            :for="id"
            :class="{ 'sr-only': !label }">
            {{ label || 'Select an option' }}
            <span
                v-if="required && label !== ''"
                class="text-danger">
                *
            </span>
        </label>
        <select
            :id="id"
            v-model="model"
            class="EsDropdown-select p-100 rounded-xs"
            :disabled="disabled">
            <button>
                <selectedcontent></selectedcontent>
            </button>
            <option
                v-if="placeholder"
                disabled
                hidden
                value="">
                {{ placeholder }}
            </option>
            <option
                v-for="option in options"
                :key="typeof option === 'string' ? option : option.value"
                :value="typeof option === 'string' ? option : option.value">
                {{ typeof option === 'string' ? option : option.label }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.EsDropdown {
    display: flex;
    flex-flow: column;

    &-select {
        /**
         * as of Sep 14, 2026, only Chrome and Edge support this,
         * but Firefox and Safari are coming soon
         * https://caniuse.com/mdn-css_properties_appearance_base-select
         */
        @supports (appearance: base-select) {
            /* use custom style for bg color rather than utility class so it can be overridden in disabled state */
            background-color: variables.$white;
            appearance: base-select;
            cursor: pointer;
            height: 3.5rem;
            transition: border-color 0.15s ease-in-out;

            &,
            &::picker(select) {
                appearance: base-select;
            }

            &:hover:not(:disabled),
            &:active:not(:disabled) {
                border-color: variables.$blue-300;
            }

            /* the arrow icon on the select button */
            &::picker-icon {
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="%23222633" aria-hidden="true" viewBox="0 0 256 256"><path d="m213.66 101.66-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32"/></svg>');
                background-size: cover;
                content: ' ';
                flex-shrink: 0;
                height: 1.5rem;
                width: 1.5rem;
                vertical-align: middle;
            }

            /* disabled state */
            &:disabled {
                background-color: variables.$gray-50;
                border-color: variables.$gray-500;
                cursor: not-allowed;

                &::picker-icon {
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="%23878999" aria-hidden="true" viewBox="0 0 256 256"><path d="m213.66 101.66-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32"/></svg>');
                }
            }

            /* the text of the selected value, displayed in the select button */
            selectedcontent {
                overflow: hidden;
                text-overflow: ellipsis;
                text-wrap: nowrap;
            }

            /* the popup picker menu */
            &::picker(select) {
                border-radius: 0.25rem;
                border: variables.$border-width solid variables.$gray-500;
                box-shadow: variables.$popover-box-shadow;
                /*container-type: anchored;*/
                margin-bottom: variables.$spacer * 0.5;
                max-width: 100%;
                opacity: 0;
                position-try: flip-block;
                /* putting this here enables animating it closed */
                /*transform: scaleY(0.8);*/
                transition:
                    opacity 0.12s cubic-bezier(0, 0, 0.2, 1),
                    display 0.12s allow-discrete,
                    overlay 0.12s allow-discrete,
                    transform 0.12s allow-discrete;

                @supports (min-height: calc-size(min-content, min(size, 17.5rem))) {
                    max-height: calc-size(stretch, min(size, 25rem));
                    min-height: calc-size(min-content, min(size, 17.5rem));
                }
            }
            &:open::picker(select) {
                opacity: 1;
                transform: scaleY(1);
                transform-origin: 0% 0%;

                /*@container anchored(fallback: flip-block) {
                    background-color: blue;
                    transform-origin: 100% 100%;
                }*/

                @starting-style {
                    opacity: 0;
                    transform: scaleY(0.8);
                }
            }

            /* individual items in the popup picker menu */
            option {
                flex-direction: row-reverse;
                justify-content: space-between;
                padding: 1rem;
                text-wrap: wrap;
                transition: background-color 0.15s ease-in-out;

                &:hover {
                    background-color: variables.$blue-50;
                    cursor: pointer;
                }
            }

            /* the checkmark next to the selected item in the popup picker menu */
            & ::checkmark {
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="%23222633"><g><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></g></svg>');
                content: '';
                height: 1.5rem;
                width: 1.5rem;
            }
        }

        /**
         * as of Sep 14, 2026, this is fallback styling for Firefox and Safari,
         * until they support appearance base-select
         * https://caniuse.com/?search=appearance-none
         */
        @supports (appearance: none) and (not (appearance: base-select)) {
            appearance: none;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="%23222633" aria-hidden="true" viewBox="0 0 256 256"><path d="m213.66 101.66-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32"/></svg>');
            background-position: right variables.$spacer center;
            background-repeat: no-repeat;
            cursor: pointer;
            height: 3.5rem;
            overflow: hidden;
            padding-right: variables.$spacer * 3 !important;
            transition: border-color 0.15s ease-in-out;
            text-overflow: ellipsis;
            text-wrap: nowrap;

            &:hover,
            &:active {
                border-color: variables.$blue-300;
            }
        }
    }
}
</style>
