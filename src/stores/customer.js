import { defineStore, acceptHMRUpdate } from 'pinia'
import { LocalStorage } from 'quasar';
import { globalRouter } from 'src/router';

import { get, put } from 'src/common/request';
import { METAFORCE_SERVICE_URL_CASE, METAFORCE_SERVICE_URL_CUSTOMER } from 'src/common/constants';

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
            return await get(`${METAFORCE_SERVICE_URL_CASE}?token=${this.loginToken}`);
        },
        async updateCustomerName ({ firstname, lastname }) {
            return await put(`${METAFORCE_SERVICE_URL_CUSTOMER}?token=${this.loginToken}`, { firstname, lastname });
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCustomerStore, import.meta.hot))
}

