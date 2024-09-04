<script setup>
import { ref } from 'vue';

const apple = ref(false);
const banana = ref(true);
const cherry = ref(false);
const selectAll = ref(false);

const selectAllIsIndeterminate = computed(() => (apple.value && banana.value && cherry.value) !== (apple.value || banana.value || cherry.value));

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
};

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-form-checkbox.vue?raw');
    const docSource = await import('./checkbox.vue?raw');

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<template>
    <div>
        <h1>
            Checkbox
        </h1>

        <div class="my-500">
            <h2>
                Basic example
            </h2>
            <div>
                <es-form-checkbox
                    id="idApple"
                    v-model="apple">
                    Apple
                </es-form-checkbox>
                <es-form-checkbox
                    id="idBanana"
                    v-model="banana">
                    Banana
                </es-form-checkbox>
                <es-form-checkbox
                    id="idCherry"
                    v-model="cherry">
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
                    id="idApple2"
                    v-model="apple"
                    disabled>
                    Apple
                </es-form-checkbox>
                <es-form-checkbox
                    id="idBanana2"
                    v-model="banana"
                    disabled>
                    Banana
                </es-form-checkbox>
                <es-form-checkbox
                    id="idCherry2"
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

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFormMsg.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-form-msg.vue" />

    </div>
</template>
