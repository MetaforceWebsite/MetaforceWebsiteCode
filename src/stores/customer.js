import { defineStore, acceptHMRUpdate } from 'pinia'
import { LocalStorage } from 'quasar';

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        loginToken: null,
        customer: null,
        subscriptions: []
    }),
    getters: {
        isLoggedIn () { return this.loginToken; },
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
        updateLoginToken (loginToken) {
            this.loginToken = loginToken;
            LocalStorage.set('token', loginToken)
        },
        updateCustomer (customer) {
            this.customer = customer;
            this.subscriptions = customer?.easymeta__PaddleSubscriptions__r?.records || [];
            LocalStorage.set('customer', customer);
        },
        clearLoginStore () {
            this.customer = this.loginToken = null;
            this.subscriptions = [];
            LocalStorage.removeItem('token');
            LocalStorage.removeItem('customer');

            location.reload();
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCustomerStore, import.meta.hot))
}

