import { serverI18n } from "$lib/stores/i18n.server";

export async function load({ cookies }) {
    const locale = cookies.get("locale") || "es";

    try {
        serverI18n.ensureLocale(locale);
    } catch (err) {
        console.error("[i18n:server] Failed loading locale", err);
        serverI18n.ensureLocale("es");
    }

    return {
        locale
    };
}
