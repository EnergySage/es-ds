<template>
    <div class="h-100">
        <es-button @click="visible=true">
            Show preview modal
        </es-button>
        <es-file-preview-modal
            file-source="https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-back.jpg?sfvrsn=e75bd262_4"
            file-name="bill.png"
            :visible="visible">
            <template #desktop-header>
                Preview your image uploads.
                <div class="font-size-base font-weight-normal pt-3">
                    Make sure that your images are clear and readable.
                </div>
            </template>
        </es-file-preview-modal>
    </div>
</template>

<script>

export default {
    name: 'EsFilePreviewModalDocs',
    data() {
        return {
            visible: false,
        };
    },
};
</script>
