<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let number = '';
	let expiry = '';
	let cvv = '';
	let amount = 0;

	function submit() {
		dispatch('submit', { number, expiry, cvv, amount });
	}
</script>

<h2 class="mb-4 text-xl font-semibold text-gray-800">
	Card Payment
</h2>

<div class="space-y-4">

	<input
		class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
		placeholder="Card number"
		bind:value={number}
	/>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<input
			class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
			placeholder="Expiry MM/YY"
			bind:value={expiry}
		/>

		<input
			class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
			placeholder="CVV"
			bind:value={cvv}
		/>
	</div>

	<input
		type="number"
		class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
		placeholder="Amount"
		bind:value={amount}
	/>

</div>

<button
	class="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white shadow hover:bg-blue-700 active:bg-blue-800 transition"
	on:click={submit}
>
	Pay
</button>
