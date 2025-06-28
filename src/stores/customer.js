import { defineStore, acceptHMRUpdate } from 'pinia'
import { LocalStorage } from 'quasar';
import { globalRouter } from 'src/router';

import { get, post, put, patch } from 'src/common/request';
import {
    METAFORCE_SERVICE_URL_CUSTOMER,
    METAFORCE_SERVICE_URL_CASE,
    METAFORCE_SERVICE_URL_CASE_COMMENT
} from 'src/common/constants';

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        loginToken: null,
        customer: null,
        subscriptions: []
    }),
    getters: {
        isLoggedIn () { return this.loginToken != null; },
        hasActiveSubscription () {
            return this.subscriptions.some(sub => ['active', 'trialing'].includes(sub.easymeta__Status__c));
        }
    },
    actions: {
        initLoginStore () {
            this.loginToken = LocalStorage.getItem('token');
            this.customer = LocalStorage.getItem('customer');
            this.subscriptions = this.customer?.easymeta__PaddleSubscriptions__r?.records || [];
        },
        async updateLoginToken (loginToken) {
            this.loginToken = loginToken;
            LocalStorage.set('token', loginToken);

            return await this.refreshCustomer();
        },
        clearLoginStore () {
            this.customer = this.loginToken = null;
            this.subscriptions = [];
            LocalStorage.removeItem('token');
            LocalStorage.removeItem('customer');

            globalRouter.push('/');
        },

        async refreshCustomer () {
            let customer = await get(`${METAFORCE_SERVICE_URL_CUSTOMER}?token=${this.loginToken}`);
            if (customer.Id) {
                this.customer = customer;
                this.subscriptions = customer?.easymeta__PaddleSubscriptions__r?.records || [];
                LocalStorage.set('customer', customer);

                return true;
            } else {
                this.clearLoginStore();
                return false;
            }
        },

        async getCustomerCases () {
            let result = await get(`${METAFORCE_SERVICE_URL_CASE}?token=${this.loginToken}`);
            if (result.isSuccess) {
                result.cases.forEach(ca => {
                    ca.CaseComments = ca.easymeta__CaseComments__r?.records || [];
                    ca.Unread = ca.CaseComments?.filter(comm => comm.easymeta__Read__c == false)?.length;
                    delete ca?.easymeta__CaseComments__r;
                });
            }
            return result;
        },
        async updateCustomerName ({ firstname, lastname }) {
            return await put(`${METAFORCE_SERVICE_URL_CUSTOMER}?token=${this.loginToken}`, { firstname, lastname });
        },
        async createCase ({ subject, body }) {
            return await post(`${METAFORCE_SERVICE_URL_CASE}`, { customerId: this.customer.Id, subject, body });
        },
        async createCaseComment ({ caseId, comment }) {
            return await post(`${METAFORCE_SERVICE_URL_CASE_COMMENT}`, { caseId, comment });
        },
        async readComments ({ caseId }) {
            return await patch(`${METAFORCE_SERVICE_URL_CASE_COMMENT}`, { caseId });
        },
        async checkUnreadComments () {
            if (this.customer) {
                let result = await get(`${METAFORCE_SERVICE_URL_CASE_COMMENT}?token=${this.loginToken}&cid=${this.customer.Id}`);
                if (result.isSuccess && result.records?.length > 0) {
                    const { notifyOk } = await import('src/common/notify');
                    const { globalRouter } = await import('src/router');

                    notifyOk(`You have ${result.records?.length} unread case comments.`, {
                        color: 'warning',
                        actions: [
                            {
                                icon: 'arrow_forward', noCaps: true, dense: false, size: '12px', square: true, stretch: true, color: 'white', handler: () => {
                                    globalRouter.push('/customer');
                                }
                            }
                        ]
                    })
                }
            } else {
                return [];
            }
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCustomerStore, import.meta.hot))
}

