<script setup>
// const docCode = ref('');
const apple = ref(false);
const banana = ref(true);
const cherry = ref(false);
const selectAll = ref(false);

const selectAllIsIndeterminate = computed(() => {
    return (this.apple && this.banana && this.cherry) !== (this.apple || this.banana || this.cherry);
});

const handleOptionChange = () => {
    selectAll = apple && banana && cherry;
}

const handleSelectAllToggle = () => {
    if (!(apple && banana && cherry)) {
        apple = true;
        banana = true;
        cherry = true;
    } else {
        apple = false;
        banana = false;
        cherry = false;
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
            <a
                href="https://v3.primevue.org/checkbox/"
                target="_blank">
                primevue checkbox
            </a>
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
    </div>
</template>
