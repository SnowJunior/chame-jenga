<script lang="ts">
	import { locale } from '$lib/stores/locale';
	import { page } from '$app/stores';

	const locales = [
		{ code: 'es', name: 'Español', flag: '🇪🇸' },
		{ code: 'fr', name: 'Français', flag: '🇫🇷' }
	];

	async function changeLocale(newLocale: 'es' | 'fr') {
		if (newLocale === $locale) return;

		const previousLocale = $locale;

		try {
			// Update local store immediately for instant UI update
			locale.set(newLocale);
			console.log('Locale changed to:', newLocale, 'Current $locale:', $locale);

			// Update cookie via API
			const response = await fetch('/api/locale', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ locale: newLocale })
			});

			if (!response.ok) {
				// Revert on error
				locale.set(previousLocale);
				console.error('Failed to change locale');
			} else {
				console.log('Locale cookie updated successfully');
			}
			// No page reload needed - reactivity handles the updates
		} catch (error) {
			console.error('Error changing locale:', error);
			// Revert on error
			locale.set(previousLocale);
		}
	}
</script>

<div class="locale-selector">
	<select
		value={$locale}
		onchange={(e) => changeLocale((e.target as HTMLSelectElement).value as 'es' | 'fr')}
		class="rounded-lg border border-gray-300 bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
	>
		{#each locales as loc}
			<option value={loc.code} class="bg-gray-800 text-white">
				{loc.flag} {loc.name}
			</option>
		{/each}
	</select>
</div>

<style>
	.locale-selector select {
		cursor: pointer;
	}

	.locale-selector select option {
		background-color: #1f2937;
		color: white;
	}
</style>

