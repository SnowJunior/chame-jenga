import Gettext from 'node-gettext';
import gettextParser from 'gettext-parser';
import { readFileSync } from 'fs';
import path from 'path';

const gt = new Gettext();
const loadedLocales = new Set<string>();

function loadPO(locale: string) {
    const file = path.resolve(`static/translations/${locale}.po`);
    const content = readFileSync(file, "utf-8");
    const parsed = gettextParser.po.parse(content);
    gt.addTranslations(locale, 'messages', parsed);
}

/**
 * Ensure locale is loaded (PO → memory)
 */
export function ensureLocale(locale: string) {
    if (!loadedLocales.has(locale)) {
        loadPO(locale);
        loadedLocales.add(locale);
    }
    gt.setLocale(locale);
}

export const serverI18n = {
    gt,
    ensureLocale
};
