<script lang="ts">
	export let method: string;
</script>

<div class="flex flex-col items-center py-6">
	<div class="loader mb-3"></div>
	<p class="text-gray-700">Processing your {method.replace('_', ' ')} payment…</p>
</div>

<style>
	.loader {
		border: 4px solid #ddd;
		border-top: 4px solid blue;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		animation: spin 0.8s linear infinite;
	}
	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
