<template>
    <div class="d-md-flex flex-nowrap">
        <div class="mr-md-4">
            <es-file-thumbnail
                file-name="bill.jpg"
                file-size="1.3 MB"
                mime-type="image/jpg"
                file-source="https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-front.jpg?sfvrsn=495ad262_4"
                success
                @removeFile="removeFileAlert"
                @showPreview="showPreviewAlert" />
        </div>
        <div class="mt-3 mt-md-0 mr-md-4">
            <es-file-thumbnail
                file-name="bill_front.pdf"
                file-size="2.4 MB"
                mime-type="application/pdf"
                success
                @removeFile="removeFileAlert"
                @showPreview="showPreviewAlert" />
        </div>
        <div class="mt-3 mt-md-0 mr-md-4">
            <es-file-thumbnail
                file-name="bill_back.doc"
                file-size="2.4 MB"
                mime-type="application/doc"
                success
                @removeFile="removeFileAlert"
                @showPreview="showPreviewAlert" />
        </div>
        <div class="mt-3 mt-md-0 mr-md-4">
            <es-file-thumbnail
                file-name="bill.docx"
                file-size="2.4 MB"
                mime-type="application/docx"
                success
                @removeFile="removeFileAlert"
                @showPreview="showPreviewAlert" />
        </div>
        <div class="mt-3 mt-md-0 mr-md-4">
            <es-file-thumbnail
                file-name="bill.png"
                mime-type="image/png"
                :success="false"
                :percent-loaded="35"
                @removeFile="removeFileAlert"
                @showPreview="showPreviewAlert" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'EsFileThumbnailDocs',
    methods: {
        removeFileAlert() {
            // eslint-disable-next-line no-alert
            alert('remove file triggered');
        },
        showPreviewAlert() {
            // eslint-disable-next-line no-alert
            alert('show preview triggered');
        },
    },
};
</script>
