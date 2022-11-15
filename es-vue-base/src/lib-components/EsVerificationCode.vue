<template>
    <b-input-group class="code-holder">
        <b-form-input
            v-for="(n, index) in code"
            :id="`codeInput_${index}`"
            :ref="`codeInput_${index}`"
            :key="index"
            :value="code[index]"
            :name="'codeInput_' + index"
            :type="type"
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
         * Code Value
         */
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            dataFromPaste: '',
            code: Array(this.charCount).fill(''),
        };
    },
    watch: {
        // Watch for parent component changes to value
        value: {
            deep: true,
            handler(newVal, oldVal) {
                // On value update from parent make sure it is not the result of emit('input')
                // noramlize arrays/strings and check for differences
                if (this.stringToArray(newVal).toString() !== this.stringToArray(oldVal).toString()) {
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
            return parseInt(element?.id?.split('_')?.[1], 10);
        },
        // Triggers on keypress outside of [left, right, delete, enter]
        handleKeys(event) {
            const { value } = event.target;
            const keyPressed = event.key;

            // Do not allow for keys not in allowed except ctrl + cmd
            if (!event.ctrlKey && !event.metaKey && (!this.allowedChars.includes(keyPressed) || value.length >= 1)) {
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
                this.code[prevIndex] = '';
                previousInput?.focus();
            // If not clear the current input
            } else {
                this.code[currentIndex] = '';
            }

            this.emitCodeUpdate();
        },
        handleInput(event) {
            const { inputType } = event;
            const currentActiveElement = event.target;
            // Getting the current index handles case where user pastes into an input other than input[0]
            const curIndex = this.getElementIndex(currentActiveElement);

            // Triggered on a normal input that passes handleKeys bubble
            if (!inputType || inputType === 'insertText') {
                this.code[curIndex] = event.target.value;
                // Move to next input if possible
                currentActiveElement.nextElementSibling?.focus();
            }

            this.emitCodeUpdate();
        },
        handlePaste(event) {
            // Get the paste from clipboard; truncate it if its too long
            this.dataFromPaste = event.clipboardData?.getData('text')
                .trim().split('').splice(0, this.charCount);

            // Reset the code to allow new paste
            this.code = Array(this.charCount).fill('');
            this.dataFromPaste.forEach((char, index) => {
                this.code[index] = char;
            });

            let focusIndex = this.dataFromPaste.length;
            if (focusIndex > this.code.length - 1) {
                focusIndex = this.code.length - 1;
            }

            // Move focus to the next empty spot or last input
            this.$refs[`codeInput_${focusIndex}`]?.[0]?.focus();

            this.emitCodeUpdate();
        },
        // Normalize strings into a valid array
        stringToArray(value) {
            let arrayedValue = value;

            if (arrayedValue === '') {
                arrayedValue = Array(this.charCount).fill('');
            } else if (typeof value === 'string') {
                arrayedValue = value.split('');
            }

            return arrayedValue;
        },
        // Normalizes array into a valid string
        arrayToString(value) {
            // TODO: Does not represent '' indices. Probably ok?
            return value.join('');
        },
        // If parent value changes normalize it and trigger updates
        valuePropChange(value) {
            // eslint-disable-next-line no-return-assign
            this.stringToArray(value).forEach((char, index) => this.code[index] = char);
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
                this.$emit('input', this.arrayToString(this.code));
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
