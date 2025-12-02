/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'gettext-parser' {
	export interface ParsedTranslations {
		charset?: string;
		headers?: Record<string, string>;
		translations: Record<string, Record<string, any>>;
	}

	export function parse(input: string | Buffer, options?: any): ParsedTranslations;
	export function compile(po: ParsedTranslations, options?: any): Buffer;
}

