import Gettext from 'node-gettext';
import gettextParser from 'gettext-parser';
import { readFileSync } from 'fs';
import path from 'path';

const gt = new Gettext();
const loadedLocales = new Set<string>();

function loadPO(locale: string) {
    try {
        // Use process.cwd() which should work in most deployment scenarios
        // In SvelteKit, static files are copied to the build output
        const basePath = process.cwd();
        const filePath = path.join(basePath, 'static', 'translations', `${locale}.po`);
        
        let fileContent: string;
        try {
            fileContent = readFileSync(filePath, "utf-8");
        } catch (fileError) {
            // If file doesn't exist, log warning but don't throw
            // This allows the app to continue with untranslated keys
            console.warn(`[i18n:server] Translation file not found: ${filePath}`);
            console.warn(`[i18n:server] Current working directory: ${basePath}`);
            return; // Gracefully fail - translations will return keys
        }

        const parsed = gettextParser.po.parse(fileContent);
        gt.addTranslations(locale, 'messages', parsed);
    } catch (error) {
        // Log error but don't throw - allow app to continue
        console.error(`[i18n:server] Error loading PO file for locale ${locale}:`, error);
        // Don't throw - let the app continue with untranslated keys
    }
}

/**
 * Ensure locale is loaded (PO → memory)
 * This function is safe to call even if PO files don't exist - it will gracefully fail
 */
export function ensureLocale(locale: string) {
    try {
        if (!loadedLocales.has(locale)) {
            loadPO(locale);
            loadedLocales.add(locale);
        }
        gt.setLocale(locale);
    } catch (error) {
        // Log error but don't throw - allow app to continue
        console.error(`[i18n:server] Error ensuring locale ${locale}:`, error);
        // Set locale anyway - translations will just return keys
        try {
            gt.setLocale(locale);
        } catch (setError) {
            // If even setting locale fails, try default
            try {
                gt.setLocale('es');
            } catch {
                // Last resort - just continue
            }
        }
    }
}

// Safe wrapper for gettext that never throws
const safeGettext = (key: string): string => {
    try {
        return gt.gettext(key) || key;
    } catch (error) {
        console.error(`[i18n:server] Error in gettext for key "${key}":`, error);
        return key; // Always return the key as fallback
    }
};

export const serverI18n = {
    gt: {
        ...gt,
        gettext: safeGettext
    },
    ensureLocale
};
