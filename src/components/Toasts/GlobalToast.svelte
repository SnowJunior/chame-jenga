<script lang="ts">
	import { toasts } from '../../lib/toasts/toast';
</script>

<div class="fixed top-5 right-5 z-[9999] space-y-3">
	{#each $toasts as t (t.id)}
		<div
			class="animate-slide-in rounded-lg px-4 py-3 text-white shadow-lg"
			class:bg-green-600={t.type === 'success'}
			class:bg-red-600={t.type === 'error'}
			class:bg-blue-600={t.type === 'info'}
		>
			{t.message}
		</div>
	{/each}
</div>

<style>
	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	.animate-slide-in {
		animation: slide-in 0.25s ease-out;
	}
</style>
