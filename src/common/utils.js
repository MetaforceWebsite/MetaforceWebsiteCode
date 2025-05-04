import { LocalStorage } from "quasar"

export const pageStorage = {
    getCustomer () { return LocalStorage.getItem('customer'); },
    setCustomer (customer) { return LocalStorage.set('customer', customer); },

    clearLoginCache () { localStorage.clear(); },
}