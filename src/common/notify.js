import { copyToClipboard, Notify, QSpinnerBars } from "quasar";

let ntf;
export function notifyError (message, extraOptions = {}) {
    clearNotify();
    ntf = Notify.create({
        group: false,
        message: `<div class="text-wrap">${message}</div>`,
        classes: 'q-electron-drag--exception',
        html: true,
        multiLine: false,
        icon: 'error',
        position: 'top',
        color: 'red-6',
        actions: [
            {
                icon: "content_copy", id: 'error_copy_btn', dense: true, size: '12px', square: true, stretch: true, color: 'white', handler: async () => {
                    let tmp = document.createElement("DIV");
                    tmp.innerHTML = message;
                    await copyToClipboard(tmp.textContent || tmp.innerText || "");
                    document.querySelector('#error_copy_btn .q-btn__content i.q-icon').textContent = 'done';
                }
            },
            { icon: "close", dense: true, size: '12px', square: true, stretch: true, color: extraOptions.closeColor || 'white', handler: () => ntf() }
        ],
        ...extraOptions
    })
    return ntf;
}

export function notifyOk (message, extraOptions = {}) {
    clearNotify();
    ntf = Notify.create({
        group: false,
        message: message,
        classes: 'q-electron-drag--exception',
        html: true,
        icon: 'notifications',
        position: 'top',
        color: 'positive',
        actions: [{ icon: "close", dense: true, square: true, stretch: true, color: extraOptions.closeColor || 'white', handler: () => ntf() }],
        ...extraOptions
    })
    return ntf;
}

export function notifyLoading (message, extraOptions = {}) {
    clearNotify();
    ntf = Notify.create({
        group: false,
        spinner: QSpinnerBars,
        classes: 'q-electron-drag--exception',
        spinnerSize: 'sm',
        message: message,
        html: true,
        position: 'top',
        color: 'grey-8',
        timeout: 0,
        ...extraOptions
    })
    return ntf;
}

export function clearNotify () {
    if (ntf) {
        ntf();
        ntf = null;
    }
}