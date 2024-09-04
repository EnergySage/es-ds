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
        compTitle: {
            type: String,
            default: 'Component source',
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
        docTitle: {
            type: String,
            default: 'Documentation source',
            required: false,
        },
    },
};
</script>

<template>
    <div class="mt-500">
        <client-only>
            <es-collapse
                v-if="compCode"
                id="compsource">
                <template #title>
                    <h2 class="mb-0">
                        {{ compTitle }}
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
                        {{ docTitle }}
                    </h2>
                </template>
                <ds-code-block
                    :code="docCode"
                    :source="docSource" />
            </es-collapse>
        </client-only>
    </div>
</template>
