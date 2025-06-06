<template>
    <div class="row q-mt-xl">
        <div class="col-2"></div>
        <div class="col" style="min-width:500px">
            <q-card style="width:100%;">
                <q-toolbar class="bg-primary text-white">
                    <q-icon name="contact_support" size="md"></q-icon>
                    <q-toolbar-title>Contact Us</q-toolbar-title>
                </q-toolbar>
                <div v-if="isSubmitted" class="text-center text-h6 text-positive">
                    <div class="q-py-xl">
                        Your request has been received successfully!
                        <div>We will get back to you ASAP.</div>
                    </div>

                    <div class="q-pb-xl">
                        <q-btn @click="reset" outline label="Back"></q-btn>
                    </div>
                </div>
                <q-form v-else ref="caseFormCmp" class="q-ma-md">
                    <q-input v-model="newCase.email" type="email" label="Email" class="q-mb-md" :rules="emailRules" lazy-rules="ondemand" outlined hide-bottom-space></q-input>
                    <q-input v-model="newCase.subject" label="Subject" class="q-mb-md" :rules="nameRules" lazy-rules="ondemand" outlined hide-bottom-space></q-input>
                    <q-editor v-model="newCase.body" placeholder="Type your question or idea..." min-height="5rem" />

                    <div class="text-center q-py-lg">
                        <q-btn @click="submitCase" :loading="isSaving" label="Submit A Case" color="primary" class="bg-primary text-white" no-caps flat>
                            <template v-slot:loading>
                                <q-spinner-bars size="xs"></q-spinner-bars>
                            </template>
                        </q-btn>
                    </div>
                </q-form>
            </q-card>
        </div>
        <div class="col-2"></div>
    </div>
</template>

<script>
import { post } from 'src/common/request';
import { METAFORCE_SERVICE_URL_CASE } from 'src/common/constants';
import { notifyError } from 'src/common/notify';
import { defineComponent } from 'vue'
export default defineComponent({
    data () {
        return {
            newCase: { subject: "", body: "" },
            isSaving: false,
            isSubmitted: false,

            emailRules: [val => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) || 'Invalid Email'],
            nameRules: [val => (val && val.length > 0) || 'Required']
        }
    },
    methods: {
        async submitCase () {
            let isValid = await this.$refs.caseFormCmp.validate();
            if (isValid) {
                this.isSaving = true;
                let result = await post(METAFORCE_SERVICE_URL_CASE, {
                    email: this.newCase.email,
                    subject: this.newCase.subject,
                    body: this.newCase.body
                });
                if (result.isSuccess) {
                    this.isShow = false;
                    this.isSubmitted = true;
                } else {
                    notifyError(result.message);
                }
                this.isSaving = false;
            }
        },
        reset () {
            this.newCase = { subject: "", body: "", email: "" }
            this.isSubmitted = false;
        }
    }
})
</script>
