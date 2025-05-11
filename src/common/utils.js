import moment from "moment";
import { LocalStorage } from "quasar"

export const pageStorage = {
    getCustomer () { return LocalStorage.getItem('customer'); },
    setCustomer (customer) { return LocalStorage.set('customer', customer); },

    getLoginToken () { return LocalStorage.getItem('token'); },
    setLoginToken (token) { return LocalStorage.set('token', token); },

    clearLoginCache () {
        LocalStorage.remove('customer');
        LocalStorage.remove('token');
    },
}

export async function suspend (ms = 3000) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

export function formatDatetime (gmtDatetime) {
    return gmtDatetime ? moment(gmtDatetime).format('YYYY-MM-DD, LT') : '';
};