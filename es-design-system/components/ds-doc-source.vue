<template>
    <div class="mt-450">
        <EsCollapse
            v-if="compCode"
            id="compsource">
            <template #title>
                <h2 class="mb-0">
                    Component source
                </h2>
            </template>
            <ds-code-block
                :code="compCode"
                :source="compSource" />
        </EsCollapse>
        <EsCollapse
            v-if="docCode"
            id="docsource"
            class="mt-450">
            <template #title>
                <h2 class="mb-0">
                    Documentation source
                </h2>
            </template>
            <ds-code-block
                :code="docCode"
                :source="docSource" />
        </EsCollapse>
    </div>
</template>
<script>

export default {
    name: 'DsDocSource',
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
