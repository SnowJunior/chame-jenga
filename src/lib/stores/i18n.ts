/* eslint-disable @typescript-eslint/no-explicit-any */
import { browser } from '$app/environment';
import { locale } from "./locale.ts";
import { get } from "svelte/store";
import { clientTranslations } from "./i18n.client.ts";

// Create a reactive translation function for client-side
function gettext(key: string): string {
    if (!browser) {
        // Server-side: return key as fallback (server should use i18n.server-only.ts directly)
        return key;
    }
    const currentLocale = get(locale);
    const translations = clientTranslations[currentLocale]?.translations?.[""] || {};
    const translation = translations[key];
    return translation?.msgstr?.[0] || key;
}

// Client-side translation manager (for use in .svelte files)
export const translationManager = {
    gettext
};
