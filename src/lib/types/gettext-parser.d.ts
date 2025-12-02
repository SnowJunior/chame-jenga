/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'gettext-parser' {
	export interface ParsedTranslations {
		charset?: string;
		headers?: Record<string, string>;
		translations: Record<string, Record<string, any>>;
	}

	export namespace po {
		function parse(input: string | Buffer, options?: any): ParsedTranslations;
		function compile(po: ParsedTranslations, options?: any): Buffer;
	}

	export namespace mo {
		function parse(input: Buffer, options?: any): ParsedTranslations;
		function compile(mo: ParsedTranslations, options?: any): Buffer;
	}

	const gettextParser: {
		po: typeof po;
		mo: typeof mo;
	};

	export default gettextParser;
}

