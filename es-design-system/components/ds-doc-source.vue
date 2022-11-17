<template>
    <div class="mt-5">
        <EsCollapse
            v-if="compCode"
            id="compsource">
            <template #title>
                <h3 class="mb-0">
                    Component Source
                </h3>
            </template>
            <ds-code-block
                :code="compCode"
                :source="compSource" />
        </EsCollapse>
        <EsCollapse
            v-if="docCode"
            id="docsource"
            class="mt-5">
            <template #title>
                <h3 class="mb-0">
                    Documentation Source
                </h3>
            </template>
            <ds-code-block
                :code="docCode"
                :source="docSource" />
        </EsCollapse>
    </div>
</template>
<script>
import { EsCollapse } from '@energysage/es-vue-base';
import DsCodeBlock from '@/components/ds-code-block.vue';

export default {
    name: 'DsDocSource',
    components: {
        DsCodeBlock,
        EsCollapse,
    },
    props: {
        compCode: {
            type: String,
            default: '',
            required: false,
        },
        compSource: {
            type: String,
            default: '',
            required: false,
        },
        docCode: {
            type: String,
            default: '',
            required: false,
        },
        docSource: {
            type: String,
            default: '',
            required: false,
        },
    },
};
</script>
