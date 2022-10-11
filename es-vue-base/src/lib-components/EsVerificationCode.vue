<template>
    <b-input-group class="code-holder">
        <b-form-input
            v-for="(n, index) in code"
            :id="`codeInput_${index}`"
            :ref="`codeInput_${index}`"
            :key="index"
            v-model="code[index]"
            :name="'codeInput_' + index"
            :type="type"
            class="code-input text-center"
            maxlength="1"
            autocomplete="off"
            aria-autocomplete="none"
            :aria-label="`digit ${index} of ${code.length}`"
            v-bind="$attrs"
            v-on="$listeners"
            @input.native="handleInput"
            @keypress="handleKeys"
            @keydown.delete="handleDelete"
            @keyup.enter="checkCodeValidity(code)"
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
         * Allowed characters
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
    },
    data() {
        return {
            dataFromPaste: '',
            code: Array(this.charCount),
        };
    },
    methods: {
        // Hacky could likely be replaced with $refs
        getElementIndex(element) {
            return parseInt(element?.id?.split('_')?.[1], 10);
        },
        // Triggers on keypress outside of [left, right, delete, enter]
        handleKeys(event) {
            const { value } = event.target;
            const keyPressed = event.key;

            // Do not allow for non numeric keys or more than one character per input
            if (!this.allowedChars.includes(keyPressed) || value.length >= 1) {
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
            this.checkCodeValidity(this.code);
        },
        handleInput(event) {
            const { inputType } = event;
            let currentActiveElement = event.target;

            // Triggered on a normal input that passes handleKeys bubble
            if (!inputType || inputType === 'insertText') {
                this.checkCodeValidity(this.code);

                // Move to next input if possible
                currentActiveElement.nextElementSibling?.focus();
            }

            // If this is a paste and we stored the data parse it
            if (inputType === 'insertFromPaste' && this.dataFromPaste) {
                // Loop over each character in our paste
                this.dataFromPaste.forEach((char) => {
                    // Getting the current index handles case where user pastes into an input other than input[0]
                    const curIndex = this.getElementIndex(currentActiveElement);
                    this.code[curIndex] = char;

                    // If the paste is less than this.charCount; move the focus to the first empty input
                    // If the paste is equal or larger than this.charCount we move focus to the last input
                    if (currentActiveElement.nextElementSibling) {
                        currentActiveElement = currentActiveElement.nextElementSibling;
                        currentActiveElement?.focus();
                    }
                });
            }
        },
        // Test pasting content
        handlePaste(event) {
            const currentActiveElement = event.target;
            const prevIndex = this.getElementIndex(currentActiveElement);

            // TODO: Clearing this is not ideal but pasting over existing data doesn't work
            this.code = Array(this.charCount);

            // Get the paste from clipboard; truncate it if its too long
            this.dataFromPaste = event.clipboardData?.getData('text')
                .trim().split('').splice(0, this.charCount - prevIndex);

            // Check the data only contains accepted characters
            const checkPasteValidity = this.checkCodeValidity(this.dataFromPaste);

            // If the data doesn't pass validation don't update
            if (!checkPasteValidity) {
                event.preventDefault();
            }
        },
        checkCodeValidity(code) {
            const cleanCode = code.join('').trim();
            const codeArray = cleanCode.split('');

            // Test all characters in the code one final time
            // If a single bad character is found this will short circuit
            const allValidChars = codeArray.every((num) => {
                if (!this.allowedChars.includes(num)) {
                    return false;
                }
                return true;
            });

            if (allValidChars) {
                // Always emit valid code changes
                this.$emit('update-code', cleanCode);

                if (cleanCode.length === this.charCount) {
                    // If the length is correct emit a valid code event
                    // This normally triggers a form submit on our parent
                    this.$emit('valid-code', cleanCode);
                }
            }

            return allValidChars;
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
        font-size: 3.5rem;
        height: 6rem;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            appearance: none;
        }
    }
}
</style>
