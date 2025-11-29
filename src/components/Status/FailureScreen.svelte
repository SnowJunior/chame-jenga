<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let reason: string;

	const dispatch = createEventDispatcher();
</script>

<h2 class="mb-3 text-xl font-bold text-red-600">Payment Failed</h2>

<p class="text-gray-700">{reason}</p>

<button class="btn mt-4 w-full" on:click={() => dispatch('close')}> Try Again </button>
