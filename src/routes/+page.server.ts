import { serverI18n } from "$lib/stores/i18n.server";

export async function load({ cookies }) {
    const currentLocale = cookies.get("locale") || "es";

    try {
        serverI18n.ensureLocale(currentLocale);
    } catch (err) {
        console.error("[i18n:server] Failed loading locale", err);
        // Try to fallback to default locale
        try {
            if (currentLocale !== "es") {
                serverI18n.ensureLocale("es");
            }
        } catch (fallbackErr) {
            console.error("[i18n:server] Failed loading fallback locale", fallbackErr);
            // Continue anyway - translations will just return keys
        }
    }

    return {
        locale: currentLocale
    };
}
