import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Parse JSON payload from payment provider
		const data = await request.json();

		console.log('Received payment callback:', data);

		// Return success response
		return new Response(JSON.stringify({ message: 'Payment processed' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Payment callback error:', error);

		return new Response(JSON.stringify({ error: 'Invalid data' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
