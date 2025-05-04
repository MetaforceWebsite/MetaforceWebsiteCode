<template>
    <q-dialog v-model="isShow">
        <q-card style="width:100%;">
            <q-toolbar class="bg-primary text-white">
                <q-icon name="contact_support" size="md"></q-icon>
                <q-toolbar-title>Submit A Case</q-toolbar-title>
            </q-toolbar>
            <q-form ref="caseFormCmp" class="q-ma-md">
                <q-input v-model="newCase.subject" label="Subject" class="q-mb-md" :rules="nameRules" lazy-rules="ondemand" outlined hide-bottom-space></q-input>
                <q-editor v-model="newCase.body" placeholder="Type your question or idea..." min-height="5rem" />

                <div class="text-center q-mt-lg">
                    <q-btn @click="submitCase" :loading="isSaving" label="Submit" color="primary" class="bg-primary text-white" no-caps flat>
                        <template v-slot:loading>
                            <q-spinner-bars size="xs"></q-spinner-bars>
                        </template>
                    </q-btn>
                </div>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
import { post } from 'src/common/request';
import { notifyError } from 'src/common/notify';
import { METAFORCE_SERVICE_URL_CASE } from 'src/common/constants';

export default {
    data () {
        return {
            isShow: false,
            newCase: { subject: "", body: "" },
            isSaving: false,

            nameRules: [val => (val && val.length > 0) || 'Required']
        }
    },
    props: {
        customer: { type: Object, required: true },
    },
    methods: {
        show () { this.isShow = true; },
        async submitCase () {
            let isValid = await this.$refs.caseFormCmp.validate();
            if (isValid) {
                this.isSaving = true;
                let result = await post(METAFORCE_SERVICE_URL_CASE, {
                    customerId: this.customer.Id,
                    subject: this.newCase.subject,
                    body: this.newCase.body
                });
                if (result.isSuccess) {
                    this.$emit('onSubmitted');
                } else {
                    notifyError(result.message);
                }
                this.isSaving = false;
            }
        }
    }
}
</script>