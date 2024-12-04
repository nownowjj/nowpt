// JSInterface.ts

export const JSInterface = {
    showToast: (message: string , time: string) => {
        if (window.JsInterface && typeof window.JsInterface.showToast === 'function') {
            window.JsInterface.showToast(message , time);
        } else {
            console.log('JsInterface not available');
        }
    },
};