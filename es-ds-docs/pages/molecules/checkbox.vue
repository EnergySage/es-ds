<script setup>
import { ref } from 'vue'

// const docCode = ref('');
const apple = ref(false);
const banana = ref(true);
const cherry = ref(false);
const selectAll = ref(false);

const selectAllIsIndeterminate = computed(() => {
    return (apple.value && banana.value && cherry.value) !== (apple.value || banana.value || cherry.value);
});

const handleOptionChange = () => {
    selectAll.value = apple.value && banana.value && cherry.value;
};

const handleSelectAllToggle = () => {
    if (!(apple.value && banana.value && cherry.value)) {
        apple.value = true;
        banana.value = true;
        cherry.value = true;
    } else {
        apple.value = false;
        banana.value = false;
        cherry.value = false;
    }
}
</script>

<template>
    <div>
        <h1>
            Checkbox
        </h1>
        <p class="mb-500">
            Uses
            <ds-link
                to="https://v3.primevue.org/checkbox/"
                target="_blank">
                primevue checkbox
            </ds-link>
        </p>

        <div class="my-500">
            <h2>
                Basic example
            </h2>
            <div>
                <es-form-checkbox v-model="apple" id="idApple">
                    Apple
                </es-form-checkbox>
                <es-form-checkbox v-model="banana" id="idBanana">
                    Banana
                </es-form-checkbox>
                <es-form-checkbox v-model="cherry" id="idCherry">
                    Cherry
                </es-form-checkbox>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Disabled
            </h2>
            <div>
                <es-form-checkbox
                    v-model="apple"
                    id="idApple2"
                    disabled>
                    Apple
                </es-form-checkbox>
                <es-form-checkbox
                    v-model="banana"
                    id="idBanana2"
                    disabled>
                    Banana
                </es-form-checkbox>
                <es-form-checkbox
                    v-model="cherry"
                    id="idCherry2"
                    disabled>
                    Cherry
                </es-form-checkbox>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Indeterminate
            </h2>
            <es-form-checkbox
                id="idSelectAll"
                v-model="selectAll"
                :indeterminate="selectAllIsIndeterminate"
                @change="handleSelectAllToggle">
                Select all
            </es-form-checkbox>
            <div class="ml-100">
                <es-form-checkbox
                    id="idApple3"
                    v-model="apple"
                    @change="handleOptionChange">
                    Apple
                </es-form-checkbox>
                <es-form-checkbox
                    id="idBanana3"
                    v-model="banana"
                    @change="handleOptionChange">
                    Banana
                </es-form-checkbox>
                <es-form-checkbox
                    id="idCherry3"
                    v-model="cherry"
                    @change="handleOptionChange">
                    Cherry
                </es-form-checkbox>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Helper text and required indicators
            </h2>
            <div>
                <es-form-checkbox
                    id="idApple4"
                    v-model="apple"
                    name="fruit">
                    <div>
                        Apple <span class="font-italic text-error-900">*</span>
                    </div>
                    <div class="font-size-sm text-gray-700">
                        Malus domestica
                    </div>
                </es-form-checkbox>
                <es-form-checkbox
                    id="idBanana4"
                    v-model="banana"
                    name="fruit">
                    <div>
                        Banana <span class="font-italic text-error-900">*</span>
                    </div>
                    <div class="font-size-sm text-gray-700">
                        Musa acuminata
                    </div>
                </es-form-checkbox>
                <es-form-checkbox
                    id="idCherry4"
                    v-model="cherry"
                    name="fruit">
                    <div>
                        Cherry <span class="font-italic text-error-900">*</span>
                    </div>
                    <div class="font-size-sm text-gray-700">
                        Prunus avium
                    </div>
                </es-form-checkbox>
            </div>
        </div>

    </div>
</template>
