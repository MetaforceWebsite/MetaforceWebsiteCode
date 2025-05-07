import axios from "axios";

axios.defaults.baseURL = "https://quasar-metaforce-dev-ed.my.salesforce-sites.com/services/apexrest/easymeta";
axios.defaults.timeout = 600000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.domain = "https://quasar-metaforce-dev-ed.my.salesforce-sites.com";

export const request = ((config) => {
    return axios
        .request(config)
        .then((res) => res.data)
        .catch((err) => {
            if (typeof err === 'object') {
                delete err['config'];
                delete err['headers'];
                delete err['request'];
            }
            //available error object example { status:200, statusText: "Success", data: object/error_string }
            return Promise.reject(err);
        });
});

/**
 * get method
 * get records/others
 * @param {String} url [the request target url]
 * @param {Object} params [the request params]
 */
export function get (url, headers = {}, configs = {}) {
    return request({
        method: "get",
        url,
        headers,
        ...configs,
    });
}

/**
 * post method
 * create records
 * @param {String} url [the request target url]
 * @param {Object} params [the request params]
 */
export function post (url, params, headers = {}, configs = {}) {
    return request({
        method: "post",
        url,
        data: params,
        headers,
        ...configs,
    });
}

/**
 * patch method
 * update records
 * @param {String} url [the request target url]
 * @param {Object} params [the request params]
 */
export function patch (url, params, headers = {}) {
    return request({
        method: "patch",
        url,
        data: params,
        headers,
    });
}

/**
 * patch method
 * update records
 * @param {String} url [the request target url]
 * @param {Object} params [the request params]
 */
export function put (url, params, headers = {}) {
    return request({
        method: "put",
        url,
        data: params,
        headers,
    });
}

/**
 * delete method
 * delete records
 * @param {String} url [the request target url]
 * @param {Object} params [the request params]
 */
export function del (url, headers = {}) {
    return request({
        method: "delete",
        url,
        headers,
    });
}