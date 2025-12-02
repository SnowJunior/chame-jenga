/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "node-gettext" {
  export default class GetText {
    addTranslations(domain: string, locale: string, translations: any): void;
    textdomain(domain: string): void;
    gettext(msgid: string): string;
    dgettext(domain: string, msgid: string): string;
    ngettext(msgid: string, msgidPlural: string, count: number): string;
    setLocale(locale: string): void;
  }
}
