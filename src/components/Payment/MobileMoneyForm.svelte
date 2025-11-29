<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let phone = '';
	let amount = 0;

	function submit() {
		dispatch('submit', { phone, amount });
	}
</script>

<h2 class="mb-4 text-xl font-semibold text-gray-800">Mobile Money</h2>

<div class="space-y-4">
	<input
		class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
		placeholder="Phone number"
		bind:value={phone}
	/>

	<input
		type="number"
		class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
		placeholder="Amount"
		bind:value={amount}
	/>
</div>

<button
	class="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white shadow transition hover:bg-blue-700 active:bg-blue-800"
	on:click={submit}
>
	Pay
</button>
