<template>
    <div class="mt-500">
        <client-only>
            <es-collapse
                v-if="compSource"
                id="compsource">
                <template #title>
                    <h2 class="mb-0">
                        Component source
                    </h2>
                </template>
                <ds-code-block
                    :code="compCode"
                    :source="compSource" />
            </es-collapse>
            <es-collapse
                v-if="docCode"
                id="docsource"
                class="mt-500">
                <template #title>
                    <h2 class="mb-0">
                        Documentation source
                    </h2>
                </template>
                <ds-code-block
                    :code="docCode"
                    :source="docSource" />
            </es-collapse>
        </client-only>
    </div>
</template>
<script setup>

const props = defineProps({
    compSource: {
        type: String,
        default: '',
        required: false,
    },
    docSource: {
        type: String,
        default: '',
        required: false,
    },
});

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
import { loadFile } from './utils'; // Import your utility function


// Watch for changes in the fileName prop to reload the code
watch(() => props.compSource, async (newFileName) => {
    const module = await loadFile(newFileName);
    console.log("module", module.default);
    compCode.value = await module.default;
}, { immediate: true });

// const loadFile = async () => {
//   // Import the Prism language definition dynamically
//   console.log("1")
//   const compSource2 = await import(`${props.compSource}.vue?raw`);
//           // const compSource2 = await import('@energysage/es-ds-components/components/es-radio-button.vue?raw');
//   console.log("2");
//   compCode.value = $prism.normalizeCode(compSource2.default);

// };


// onMounted(async () => {
//   // Example: Dynamically load JavaScript language definition
//   await loadFile();
// });

if ($prism) {
    if (props.compSource) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        // const compSource2 = defineAsyncComponent(() => import(props.compSource));
        // const compSource2 = await import('@energysage/es-ds-components/components/es-radio-button.vue?raw');

        // compCode.value = $prism.normalizeCode(compSource2.default);
    }

    // if (props.docSource) {
    //     /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */
    //     const docSource2 = await import(props.docSource);
    //     docCode.value = $prism.normalizeCode(docSource2.default);
    // }

    // $prism.highlight();
}
</script>
