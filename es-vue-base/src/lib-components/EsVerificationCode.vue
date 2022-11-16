<template>
    <b-input-group class="code-holder">
        <b-form-input
            v-for="(n, index) in code"
            :id="`codeInput_${index}`"
            :ref="`codeInput_${index}`"
            :key="index"
            novalidate
            :value="code[index]"
            :name="'codeInput_' + index"
            :type="type"
            :pattern="pattern"
            class="code-input text-center"
            maxlength="1"
            autocomplete="off"
            aria-autocomplete="none"
            :aria-label="`digit ${index} of ${code.length}`"
            v-bind="$attrs"
            @input.native="handleInput"
            @keypress="handleKeys"
            @keyup.enter="emitCodeUpdate"
            @keydown.delete="handleDelete"
            @keydown.left="handleLeft"
            @keydown.right="handleRight"
            @paste="handlePaste" />
    </b-input-group>
</template>

<script lang="js">
import { BInputGroup, BFormInput } from 'bootstrap-vue';

export default {
    name: 'EsVerificationCode',
    components: {
        BInputGroup,
        BFormInput,
    },
    props: {
        /**
         * Character Count
         */
        charCount: {
            type: Number,
            default: 5,
        },
        /**
         * Allowed characters to type
         * Defaults to 0-9
         */
        allowedChars: {
            type: Array,
            default: () => Array(10).fill(0).map((e, i) => `${i}`),
        },
        /**
         * Input Type
         */
        type: {
            type: String,
            // tel causes mobile to show numeric keyboard
            default: 'tel',
        },
        /**
         * Input Pattern
         */
        pattern: {
            type: String,
            default: '[0-9]*',
        },
        /**
         * Code Value From Parent
         */
        value: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            dataFromPaste: '',
            emptyArray: Array(this.charCount).fill(''),
            code: Array(this.charCount).fill(''),
        };
    },
    watch: {
        // Watch for parent component changes to value
        value: {
            deep: true,
            handler(newVal, oldVal) {
                // On value update from parent make sure it is not the result of emit('input')
                if (newVal.toString() !== oldVal.toString()) {
                    this.valuePropChange(newVal);
                }
            },
        },
    },
    created() {
        if (this.value) {
            // On first create if a value is set update this.code
            this.valuePropChange(this.value);
        }
    },
    methods: {
        // Returns the correct this.code index based on DOM element
        getElementIndex(element) {
            return parseInt(element?.id?.split('_')?.[1] || -1, 10);
        },
        // Triggers on keypress outside of [left, right, delete, enter]
        handleKeys(event) {
            // Do not allow for keys not in allowed except ctrl + cmd
            if (!event.ctrlKey && !event.metaKey && !this.allowedChars.includes(event.key)) {
                event.preventDefault();
            }
        },
        // On left arrow move to previous input
        handleLeft(event) {
            const currentInput = event.target;
            const previousInput = currentInput.previousElementSibling;
            const cursorPosition = currentInput.selectionStart;

            if (previousInput && cursorPosition === 0) {
                event.preventDefault();
                previousInput?.focus();
                previousInput.setSelectionRange(-1, -1);
            }
        },
        // On right arrow move to next input
        handleRight(event) {
            const currentInput = event.target;
            const currentValue = currentInput.value;
            const nextInput = currentInput.nextElementSibling;
            const cursorPosition = currentInput.selectionStart;

            if (nextInput && (cursorPosition === 1 || currentValue.length === 0)) {
                event.preventDefault();
                nextInput?.focus();
            }
        },
        // On delete in an empty input remove previous input value if possible
        handleDelete(event) {
            const { value } = event.target;
            const currentInput = event.target;
            const previousInput = currentInput.previousElementSibling;
            const currentIndex = this.getElementIndex(currentInput);
            const prevIndex = this.getElementIndex(previousInput);

            // If delete is pressed on an empty input
            if (!value) {
                // Delete the previous inputs value if possible
                if (prevIndex >= 0) {
                    // We use $set because replacing by index can remove reactivity
                    this.$set(this.code, prevIndex, '');
                    previousInput?.focus();
                }
            // If not clear the current input
            } else {
                this.$set(this.code, currentIndex, '');
            }

            this.emitCodeUpdate();
        },
        handleInput(event) {
            const { inputType } = event;
            const currentActiveElement = event.target;
            // Getting the current index handles case where user pastes into an input other than input[0]
            const curIndex = this.getElementIndex(currentActiveElement);

            // Triggers when a character is added only
            if (inputType === 'insertText') {
                // We use $set because replacing by index can remove reactivity
                this.$set(this.code, curIndex, event.target.value);
                // Move to next input if possible
                currentActiveElement.nextElementSibling?.focus();
            }

            // Always emit input events; even if nothing changes
            this.emitCodeUpdate();
        },
        handlePaste(event) {
            // Get the paste from clipboard; truncate it if its too long
            this.dataFromPaste = event.clipboardData?.getData('text')
                ?.trim()?.split('')?.splice(0, this.charCount);

            // If no data is found or clipboard api is not supported stop
            if (!this.dataFromPaste) {
                return;
            }

            // Empty existing code and fill it with pasted data
            this.code = [...this.emptyArray].map((cur, index) => this.dataFromPaste[index] || '');

            // Move focus to the next empty spot or last input
            let focusIndex = this.dataFromPaste.length;
            if (focusIndex > this.code.length - 1) {
                focusIndex = this.code.length - 1;
            }
            this.$refs[`codeInput_${focusIndex}`]?.[0]?.focus();

            event.preventDefault();
            this.emitCodeUpdate();
        },
        // If parent value changes normalize it and trigger updates
        valuePropChange(value) {
            this.code = [...this.emptyArray].map((cur, index) => value[index] || '');

            this.emitCodeUpdate(false);
        },
        // Emit this.code changes to keep this.value in sync
        emitCodeUpdate(emitInput = true) {
            const codeIsValid = this.code.every((num) => {
                if (!this.allowedChars.includes(num)) {
                    return false;
                }
                return true;
            }) && this.code.length === this.charCount;

            if (emitInput) {
                this.$emit('input', this.code);
            }
            this.$emit('valid-code', codeIsValid);
        },
    },
};
</script>

<style lang="scss">
@import '~@energysage/es-bs-base/scss/includes';

.code-holder {
    margin: 0 auto;
    max-width: 500px;

    .code-input {
        appearance: textfield;
        font-size: 3rem;
        height: 6rem;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            appearance: none;
        }
    }
}
</style>
