<script lang="ts">
	import { state, selectMethod } from '../../lib/payment/state';

	const methods = [
		{ id: 'mobile_money', label: 'Mobile Money' },
		{ id: 'card', label: 'Card Payment' },
		{ id: 'bank', label: 'Bank Transfer' }
	] as const;
</script>

<div class="space-y-2">
	{#each methods as m}
		<button
			on:click={() => selectMethod(m.id)}
			class="w-full rounded-lg border px-4 py-3 text-left transition
			{$state.method === m.id
				? 'border-blue-600 bg-blue-600 text-white shadow'
				: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'}"
		>
			{m.label}
		</button>
	{/each}
</div>
