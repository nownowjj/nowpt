declare global {
    interface Window {
        JsInterface: {
            showToast: (message: string , time : string) => void;
        };
    }
}

export {};