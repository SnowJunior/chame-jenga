<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let reference: string;

	const dispatch = createEventDispatcher();
</script>

<h2 class="mb-3 text-xl font-bold text-green-600">Payment Successful 🎉</h2>

<p class="text-gray-700">Reference: {reference}</p>

<button class="btn mt-4 w-full" on:click={() => dispatch('close')}> Close </button>
