/* eslint-disable @typescript-eslint/no-explicit-any */
import { locale } from "./locale.ts";
import { get } from "svelte/store";

const isServer = typeof window === "undefined";

let backend: any;

if (isServer) {
    backend = await import("./i18n.server.ts");
} else {
    backend = await import("./i18n.client.ts");
}

// Create a reactive translation function for client-side
// This will be used with $locale in components for reactivity
export function gettext(key: string): string {
    const currentLocale = get(locale);
    const translations = backend.clientTranslations[currentLocale]?.translations?.[""] || {};
    const translation = translations[key];
    return translation?.msgstr?.[0] || key;
}

export const translationManager = isServer
    ? backend.serverI18n.gt
    : {
        gettext
    };
