/* eslint-disable @typescript-eslint/no-explicit-any */
import Gettext from 'node-gettext';
import { parse } from 'gettext-parser';
import tr from '$lib/stores/es.json';

const gt = new Gettext();
const domain = 'messages';

// Default locale - can be changed dynamically
let currentLocale: string = 'es';

// Initialize with existing JSON translations
gt.addTranslations(currentLocale, domain, tr);
gt.setLocale(currentLocale);
gt.textdomain(domain);

/**
 * Parse PO file content (string)
 * @param content - PO file content as string
 * @returns Parsed translation object compatible with node-gettext
 */
export function parsePOContent(content: string): any {
	try {
		const parsed = parse(content);
		return parsed;
	} catch (error) {
		console.error('Failed to parse PO content:', error);
		throw error;
	}
}

/**
 * Parse MO file content (Buffer)
 * @param content - MO file content as Buffer
 * @returns Parsed translation object compatible with node-gettext
 */
export function parseMOContent(content: Buffer): any {
	try {
		const parsed = parse(content);
		return parsed;
	} catch (error) {
		console.error('Failed to parse MO content:', error);
		throw error;
	}
}

/**
 * Load and parse a PO file (server-side only)
 * @param filePath - Path to the .po file
 * @returns Parsed translation object compatible with node-gettext
 */
export async function loadPOFile(filePath: string): Promise<any> {
	try {
		// Dynamic import for Node.js modules (only works server-side)
		const { readFileSync } = await import('fs');
		const content = readFileSync(filePath, 'utf-8');
		return parsePOContent(content);
	} catch (error) {
		console.error(`Failed to load PO file from ${filePath}:`, error);
		throw error;
	}
}

/**
 * Load and parse a MO file (server-side only)
 * @param filePath - Path to the .mo file
 * @returns Parsed translation object compatible with node-gettext
 */
export async function loadMOFile(filePath: string): Promise<any> {
	try {
		// Dynamic import for Node.js modules (only works server-side)
		const { readFileSync } = await import('fs');
		const content = readFileSync(filePath);
		return parseMOContent(content);
	} catch (error) {
		console.error(`Failed to load MO file from ${filePath}:`, error);
		throw error;
	}
}

/**
 * Load translations from a PO or MO file and add them to the gettext instance
 * @param locale - Locale code (e.g., 'es', 'en')
 * @param filePath - Path to the .po or .mo file (server-side only)
 */
export async function loadTranslationsFromFile(locale: string, filePath: string): Promise<void> {
	const isMO = filePath.endsWith('.mo');
	const translations = isMO ? await loadMOFile(filePath) : await loadPOFile(filePath);
	
	gt.addTranslations(locale, domain, translations);
	
	// If this is the current locale, update it
	if (locale === currentLocale) {
		gt.setLocale(locale);
	}
}

/**
 * Load translations from a URL (client-side)
 * @param locale - Locale code (e.g., 'es', 'en')
 * @param url - URL to the .po file
 */
export async function loadTranslationsFromURL(locale: string, url: string): Promise<void> {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch translations from ${url}: ${response.statusText}`);
		}
		const content = await response.text();
		const translations = parsePOContent(content);
		
		gt.addTranslations(locale, domain, translations);
		
		// If this is the current locale, update it
		if (locale === currentLocale) {
			gt.setLocale(locale);
		}
	} catch (error) {
		console.error(`Failed to load translations from ${url}:`, error);
		throw error;
	}
}

/**
 * Set the current locale
 * @param locale - Locale code (e.g., 'es', 'en')
 */
export function setLocale(locale: string): void {
	currentLocale = locale;
	gt.setLocale(locale);
}

/**
 * Get the current locale
 * @returns Current locale code
 */
export function getLocale(): string {
	return currentLocale;
}

/**
 * Detect locale from browser preferences
 * @returns Detected locale or default 'es'
 */
export function detectLocale(): string {
	if (typeof window !== 'undefined' && window.navigator) {
		const browserLang = window.navigator.language || window.navigator.languages?.[0] || 'es';
		// Extract language code (e.g., 'es-ES' -> 'es')
		return browserLang.split('-')[0];
	}
	return 'es';
}

export const translationManager = {
	/**
	 * Translate a string
	 * @param msgid - Message ID (original string)
	 * @returns Translated string or original if translation not found
	 */
	gettext(msgid: string): string {
		return gt.gettext(msgid);
	},

	/**
	 * Translate a string with pluralization
	 * @param msgid - Singular message ID
	 * @param msgidPlural - Plural message ID
	 * @param count - Count to determine singular/plural
	 * @returns Translated string based on count
	 */
	ngettext(msgid: string, msgidPlural: string, count: number): string {
		return gt.ngettext(msgid, msgidPlural, count);
	},

	/**
	 * Get translation from a specific domain
	 * @param domain - Translation domain
	 * @param msgid - Message ID
	 * @returns Translated string
	 */
	dgettext(domain: string, msgid: string): string {
		return gt.dgettext(domain, msgid);
	},

	/**
	 * Set the current locale
	 * @param locale - Locale code
	 */
	setLocale,

	/**
	 * Get the current locale
	 * @returns Current locale code
	 */
	getLocale,

	/**
	 * Detect and set locale from browser
	 */
	detectAndSetLocale(): void {
		const detected = detectLocale();
		setLocale(detected);
	},

	/**
	 * Load translations from a PO or MO file (server-side)
	 * @param locale - Locale code
	 * @param filePath - Path to the translation file
	 */
	loadTranslationsFromFile,

	/**
	 * Load translations from a URL (client-side)
	 * @param locale - Locale code
	 * @param url - URL to the translation file
	 */
	loadTranslationsFromURL
};
