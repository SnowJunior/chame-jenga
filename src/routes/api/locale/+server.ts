import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { locale } = await request.json();

		if (!locale || (locale !== 'es' && locale !== 'fr')) {
			return json({ error: 'Invalid locale' }, { status: 400 });
		}

		// Set cookie with max age of 1 year
		cookies.set('locale', locale, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			sameSite: 'lax'
		});

		return json({ success: true, locale });
	} catch (error) {
		console.error('Locale change error:', error);
		return json({ error: 'Failed to change locale' }, { status: 500 });
	}
};

