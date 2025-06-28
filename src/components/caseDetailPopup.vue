<template>
    <q-dialog v-model="isShow" @hide="readComments">
        <q-card v-if="caseRecord" style="max-width:none;width:90%;max-height:80vh;">
            <q-toolbar class="bg-primary sticky-header text-white q-pr-none">
                <q-icon name="contact_support" size="md"></q-icon>
                <q-toolbar-title>Case Details</q-toolbar-title>
                <q-btn flat stretch icon="close" @click="isShow=false"></q-btn>
            </q-toolbar>
            <q-form class="q-ma-md ">
                <div class="row justify-between q-mb-md">
                    <q-input dense :model-value="caseRecord.CaseNumber" label="Case Number" class=" col" disable></q-input>
                    <div style="width:10px;"></div>
                    <q-input dense :model-value="caseRecord.Status" label="Status" class="col" disable></q-input>
                </div>

                <q-input dense :model-value="caseRecord.Subject" label="Subject" class="q-mb-md" disable></q-input>
                <q-item class="q-px-none">
                    <q-item-section>
                        <q-item-label caption>Case Detail</q-item-label>
                        <q-item-label>
                            <div v-html="caseRecord.easymeta__CaseDetail__c"></div>
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator></q-separator>

                <div class="q-my-md">
                    <q-editor dense v-model="newComment" placeholder="Add a comment (at least 10 characters)" min-height="8rem" />
                    <div class="q-mt-sm">
                        <q-btn @click="addComment" :loading="isSaving" label="Add Comment" icon="add" color="positive" dense no-caps></q-btn>
                    </div>
                </div>
            </q-form>

            <q-expansion-item default-opened v-if="caseRecord.CaseComments?.length" header-class="bg-filled" label="Case Comments" switch-toggle-side>
                <div class="q-mx-md">
                    <q-timeline color="secondary">
                        <template v-for="(comment, index) in caseRecord.CaseComments" :key="index">
                            <q-timeline-entry :subtitle="timelineTitle(comment)">
                                <div v-html="comment.easymeta__Body__c"></div>
                            </q-timeline-entry>
                        </template>
                    </q-timeline>
                </div>
            </q-expansion-item>
        </q-card>
    </q-dialog>
</template>

<script>
import { formatDatetime } from 'src/common/utils';
import { notifyError, notifyOk } from 'src/common/notify';
export default {
    data () {
        return {
            isShow: false,
            isSaving: false,
            caseRecord: null,
            newComment: "",
        }
    },
    methods: {
        timelineTitle (comment) {
            return `${comment.easymeta__CreatedBy__c}, ${formatDatetime(comment.LastModifiedDate)}`;
        },
        show (caseRecord) {
            this.isShow = true;
            this.newComment = "";
            this.caseRecord = caseRecord;
        },
        async addComment () {
            if (this.newComment.trim().length < 10) {
                notifyError('The comment must inlcude at least 10 characters.');
                return;
            }

            this.isSaving = true;
            const { useCustomerStore } = await import('src/stores/customer');
            let result = await useCustomerStore().createCaseComment({
                caseId: this.caseRecord.Id,
                comment: this.newComment
            });
            if (result.isSuccess) {
                notifyOk('We have received your comments and will get back to you ASAP.')
                this.$emit('onSubmitted');
                this.isShow = false;
            } else {
                notifyError(result.message);
            }
            this.isSaving = false;
        },
        async readComments () {
            if (this.caseRecord.Unread > 0) {
                const { useCustomerStore } = await import('src/stores/customer');
                let result = await useCustomerStore().readComments({
                    caseId: this.caseRecord.Id
                });
                if (result.isSuccess) {
                    this.$emit('onRead');
                }
            }
        }
    }
}
</script>