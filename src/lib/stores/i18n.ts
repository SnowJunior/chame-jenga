/* eslint-disable @typescript-eslint/no-explicit-any */
import { browser } from '$app/environment';
import { locale } from "./locale.ts";
import { get } from "svelte/store";
import { clientTranslations } from "./i18n.client.ts";

// Create a reactive translation function that works on both client and server
function gettext(key: string): string {
    if (!browser) {
        // Server-side: return key as fallback
        // Server-side rendering should use server translations via +page.server.ts
        // But we need to return something safe here
        return key;
    }
    
    // Client-side: use reactive locale store
    try {
        const currentLocale = get(locale) || 'es'; // Default to 'es' if not set
        const translations = clientTranslations[currentLocale]?.translations?.[""] || {};
        const translation = translations[key];
        return translation?.msgstr?.[0] || key;
    } catch (error) {
        // Fallback if store is not available
        return key;
    }
}

// Translation manager for use in .svelte files
// Works on both client and server (server returns key, client returns translation)
export const translationManager = {
    gettext
};
