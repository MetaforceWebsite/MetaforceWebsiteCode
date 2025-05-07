import { LocalStorage } from "quasar"

export const pageStorage = {
    getCustomer () { return LocalStorage.getItem('customer'); },
    setCustomer (customer) { return LocalStorage.set('customer', customer); },

    getLoginToken () { return LocalStorage.getItem('token'); },
    setLoginToken (token) { return LocalStorage.set('token', token); },

    clearLoginCache () { localStorage.clear(); },
}