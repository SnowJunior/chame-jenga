/* eslint-disable @typescript-eslint/no-explicit-any */
import { browser } from '$app/environment';
import { locale } from './locale.ts';
import { derived } from 'svelte/store';
import { clientTranslations } from './i18n.client.ts';

/**
 * Reactive translation store that automatically updates when locale changes
 * Use this in components: $t('Translation Key')
 */
export const t = derived(locale, ($locale) => {
	const currentLocale = ($locale || 'es') as 'es' | 'fr';
	const translations = (clientTranslations[currentLocale]?.translations?.[''] || {}) as Record<string, { msgid: string; msgstr: string[] }>;
	
	return (key: string): string => {
		if (!browser) {
			// Server-side: return key as fallback
			return key;
		}
		
		const translation = translations[key];
		return translation?.msgstr?.[0] || key;
	};
});

/**
 * Non-reactive translation function for use outside of Svelte components
 * For use in regular TypeScript/JavaScript files
 */
export function gettext(key: string): string {
	if (!browser) {
		return key;
	}
	
	// This is not reactive - use $t in Svelte components instead
	const currentLocale = 'es'; // fallback
	const translations = (clientTranslations[currentLocale as 'es' | 'fr']?.translations?.[''] || {}) as Record<string, { msgid: string; msgstr: string[] }>;
	const translation = translations[key];
	return translation?.msgstr?.[0] || key;
}

// Legacy export for backwards compatibility
export const translationManager = {
	gettext
};
