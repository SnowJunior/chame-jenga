/* eslint-disable @typescript-eslint/no-explicit-any */
import { locale } from "./locale.ts";

const isServer = typeof window === "undefined";

let backend: any;

if (isServer) {
    backend = await import("./i18n.server.ts");
} else {
    backend = await import("./i18n.client.ts");
}

export const translationManager = isServer
    ? backend.serverI18n.gt
    : {
        gettext(key: string) {
            let currentLocale: any;
            locale.subscribe((v) => (currentLocale = v))();
            return backend.clientTranslations[currentLocale]?.[key] ?? key;
        }
    };
