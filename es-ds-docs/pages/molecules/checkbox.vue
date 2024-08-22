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
    console.log("handleOptionChange fired");
    selectAll.value = apple.value && banana.value && cherry.value;
};

const handleSelectAllToggle = () => {
    // debugger;
    console.log("handleSelectAllToggle fired");
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
                <es-form-checkbox v-model="apple">
                    Apple
                </es-form-checkbox>
                <es-form-checkbox v-model="banana">
                    Banana
                </es-form-checkbox>
                <es-form-checkbox v-model="cherry">
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
                    disabled>
                    Apple
                </es-form-checkbox>
                <es-form-checkbox
                    v-model="banana"
                    disabled>
                    Banana
                </es-form-checkbox>
                <es-form-checkbox
                    v-model="cherry"
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
                v-model="selectAll"
                :indeterminate="selectAllIsIndeterminate"
                @change="handleSelectAllToggle">
                Select all
            </es-form-checkbox>
            <div class="ml-100">
                <es-form-checkbox
                    v-model="apple"
                    @change="handleOptionChange">
                    Apple
                </es-form-checkbox>
                <es-form-checkbox
                    v-model="banana"
                    @change="handleOptionChange">
                    Banana
                </es-form-checkbox>
                <es-form-checkbox
                    v-model="cherry"
                    @change="handleOptionChange">
                    Cherry
                </es-form-checkbox>
            </div>
        </div>

    </div>
</template>
