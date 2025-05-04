<template>
    <div class="row q-mt-lg">
        <div class="col-1"></div>
        <div class="col-10 row">
            <div class="col-6 q-pa-sm">
                <q-card>
                    <q-toolbar class="bg-primary text-white">
                        <q-icon name="account_circle" color="white" size="md" />
                        <q-toolbar-title>Account Information</q-toolbar-title>
                        <q-btn @click="updateAccount" :loading="isAccountUpdating" icon="cloud_upload" class="bg-white text-primary" dense no-caps></q-btn>
                    </q-toolbar>
                    <q-card-section>
                        <q-form ref="formCmp">
                            <q-input v-model="customer.easymeta__Email__c" label="Email address" type="email" class="q-mb-md" disable outlined hide-bottom-space>
                                <template v-slot:prepend><q-icon name="email" /></template>
                            </q-input>
                            <q-input v-model="customer.easymeta__FirstName__c" label="First Name" class="q-mb-md" :rules="nameRules" lazy-rules="ondemand" outlined hide-bottom-space>
                                <template v-slot:prepend><q-icon name="person" /></template>
                            </q-input>
                            <q-input v-model="customer.easymeta__LastName__c" label="Last Name" class="q-mb-md" :rules="nameRules" lazy-rules="ondemand" outlined hide-bottom-space>
                                <template v-slot:prepend><q-icon name="person" /></template>
                            </q-input>
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-6  q-pa-sm">
                <q-card>
                    <q-toolbar class="bg-primary text-white">
                        <q-icon name="help_center" color="white" size="md" />
                        <q-toolbar-title>My Cases</q-toolbar-title>
                        <q-btn @click="$refs.newCasePopupCmp.show()" icon="add_circle_outline" class="bg-white text-primary" dense no-caps></q-btn>
                    </q-toolbar>
                    <q-card-section v-if="isRelatedListLoading" class="text-center">
                        <q-spinner-bars size="sm" color="primary"></q-spinner-bars>
                    </q-card-section>
                    <template v-else>
                        <q-markup-table v-if="myCases.length">
                            <thead>
                                <tr>
                                    <th class="text-left">Case #</th>
                                    <th class="text-left">Subject</th>
                                    <th class="text-left">Status</th>
                                    <th class="text-left">CreatedDate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(rec, index) in myCases" :key="index">
                                    <td class="text-left">
                                        <a @click="viewCaseDetail(rec)" class="text-underline">{{rec.CaseNumber}}</a>
                                    </td>
                                    <td class="text-left">{{rec.Subject}}</td>
                                    <td class="text-left">{{rec.Status}}</td>
                                    <td class="text-left">{{rec.CreatedDate}}</td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                        <q-card-section v-else class="text-center q-py-xl">
                            You haven't raised any cases yet!
                        </q-card-section>
                    </template>

                </q-card>
            </div>

            <div class="col-12 q-pt-md">
                <q-card>
                    <q-toolbar class="bg-primary text-white">
                        <q-icon name="redeem" color="white" size="md" />
                        <q-toolbar-title>My Subscriptions</q-toolbar-title>
                        <q-btn icon="shopping_cart" to="/pricing" class="bg-white text-primary" dense no-caps></q-btn>
                    </q-toolbar>

                    <q-card-section v-if="isRelatedListLoading" class="text-center">
                        <q-spinner-bars size="sm" color="primary"></q-spinner-bars>
                    </q-card-section>
                    <template v-else>
                        <q-markup-table v-if="mySubscriptions.length">
                            <thead>
                                <tr>
                                    <th class="">Action</th>
                                    <th class="text-left">Name</th>
                                    <th class="text-left">Status</th>
                                    <th class="text-left">Started At</th>
                                    <th class="text-left">First Billed At</th>
                                    <th class="text-left">Next Billed At</th>
                                    <th class="text-left">Billing Cycle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(rec, index) in mySubscriptions" :key="index">
                                    <td class="">
                                        <q-btn v-if="rec.easymeta__Status__c !='canceled'" label="Unsubscribe" color="negative" @click="showUnsubscribeAlert(rec)" dense no-caps outline></q-btn>
                                    </td>
                                    <td class="text-left">{{rec.Name}}</td>
                                    <td class="text-left">{{rec.easymeta__Status__c}}</td>
                                    <td class="text-left">{{rec.easymeta__Started_At__c}}</td>
                                    <td class="text-left">{{rec.easymeta__First_Billed_At__c}}</td>
                                    <td class="text-left">{{rec.easymeta__Next_Billed_At__c}}</td>
                                    <td class="text-left">{{rec.easymeta__Billing_Cycle__c}}</td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                        <q-card-section v-else class="text-center q-py-xl">
                            <div class="q-mb-md">You haven't subscribed Metaforce yet!</div>
                            <q-btn label="Subscribe Now" icon-right="arrow_circle_right" class="text-primary" to="/pricing" no-caps></q-btn>
                        </q-card-section>
                    </template>
                </q-card>
            </div>
        </div>
        <div class="col-1"></div>
    </div>
    <new-case-popup ref="newCasePopupCmp" :customer="customer" @onSubmitted="loadCustomerRelatedList"></new-case-popup>
    <case-detail-popup ref="caseDetailCmp"></case-detail-popup>

    <q-dialog v-model="unsubscribeAlert">
        <q-card>
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>Unsubscribe Metaforce</q-toolbar-title>
            </q-toolbar>

            <q-card-section>
                <div class="text-subtitle2">We're truly sorry to see you go! </div>
                <div class="q-my-md">
                    We've cherished having you as part of our services and appreciate every moment you've spent with us.
                    If there's anything we could have done better or any feedback you'd like to share, we'd be incredibly grateful to hear it.
                    Your insights can help us improve and offer an even better experience.
                </div>
                <div class="text-subtitle2">
                    Are you sure you want to unsubscribe?
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup no-caps />
                <q-btn :loading="isUnsubscribing" @click="unsubscribe" label="Unsubscribe Now" color="negative" no-caps>
                    <template v-slot:loading>
                        <q-spinner-bars size="xs"></q-spinner-bars>
                    </template>
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { pageStorage } from 'src/common/utils'
import { METAFORCE_PADDLE_URL_SUBSCRIPTION_CANCEL, METAFORCE_SERVICE_URL_CUSTOMER, METAFORCE_SERVICE_URL_CUSTOMER_RELATED_LIST } from 'src/common/constants'
import { put, get, post } from 'src/common/request'
import { notifyError, notifyOk } from 'src/common/notify'
import newCasePopup from 'src/components/newCasePopup.vue'
import CaseDetailPopup from 'src/components/caseDetailPopup.vue'
export default {
    components: { newCasePopup, CaseDetailPopup },
    data () {
        return {
            customer: {},
            myCases: [],
            mySubscriptions: [],

            isAccountUpdating: false,
            isRelatedListLoading: false,

            unsubscribeAlert: false,
            isUnsubscribing: false,
            selectedSubId: null,

            nameRules: [val => (val && val.length > 0) || 'Required'],
        }
    },
    methods: {
        async updateAccount () {
            let isValid = await this.$refs.formCmp.validate();
            if (isValid) {
                this.isAccountUpdating = true;
                let result = await put(METAFORCE_SERVICE_URL_CUSTOMER, {
                    token: this.customer.easymeta__Login_Token__c,
                    firstname: this.customer.easymeta__FirstName__c,
                    lastname: this.customer.easymeta__LastName__c
                });
                if (result.isSuccess) {
                    this.customer = result.customer;
                    pageStorage.setCustomer(result.customer);
                    notifyOk('Updated successfully.');
                } else {
                    notifyError(result.message);
                }
                this.isAccountUpdating = false;
            }
        },
        async loadCustomerRelatedList () {
            this.isRelatedListLoading = true;
            let result = await get(`${METAFORCE_SERVICE_URL_CUSTOMER_RELATED_LIST}?token=${this.customer.easymeta__Login_Token__c}`)
            if (result.isSuccess) {
                this.myCases = result.customer.easymeta__Cases__r?.records || [];
                this.mySubscriptions = result.customer.easymeta__PaddleSubscriptions__r?.records || [];
            } else {
                this.$router.push('/');
            }
            this.isRelatedListLoading = false;
        },

        showUnsubscribeAlert (rec) {
            this.unsubscribeAlert = true;
            this.selectedSubId = rec.easymeta__PaddleId__c;
        },
        async unsubscribe () {
            if (!this.selectedSubId) return;

            this.isUnsubscribing = true;
            let result = await post(METAFORCE_PADDLE_URL_SUBSCRIPTION_CANCEL, { subscriptionId: this.selectedSubId })
            if (result.isSuccess) {
                this.unsubscribeAlert = false;
            } else {
                notifyError(result.message);
            }
            this.isUnsubscribing = false;
        },
        viewCaseDetail (caseRecord) {
            this.$refs.caseDetailCmp.show(caseRecord);
        }
    },
    mounted () {
        this.customer = pageStorage.getCustomer() || {};
        if (this.customer.easymeta__Login_Token__c) {
            this.loadCustomerRelatedList();
        } else {
            this.$router.push('/');
        }
    }
}
</script>
