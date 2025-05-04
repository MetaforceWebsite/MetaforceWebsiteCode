<template>
    <q-dialog v-model="isShow">
        <q-card v-if="caseRecord" style="width:100%;">
            <q-toolbar class="bg-primary text-white">
                <q-icon name="contact_support" size="md"></q-icon>
                <q-toolbar-title>Case Details</q-toolbar-title>
            </q-toolbar>
            <q-form class="q-ma-md">
                <q-input dense :model-value="caseRecord.CaseNumber" label="Case Number" class="q-mb-md" disable></q-input>
                <q-input dense :model-value="caseRecord.Status" label="Status" class="q-mb-md" disable></q-input>
                <q-input dense :model-value="caseRecord.Subject" label="Subject" class="q-mb-md" disable></q-input>
                <q-editor dense disable :model-value="caseRecord.easymeta__CaseDetail__c" min-height="5rem" />
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    data () {
        return {
            isShow: false,
            caseRecord: null,
        }
    },
    methods: {
        show (caseRecord) {
            this.isShow = true;
            this.caseRecord = caseRecord;
        },
    }
}
</script>