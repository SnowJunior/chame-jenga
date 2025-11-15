<script>
	let active = 'home';
</script>

<nav class="flex items-center justify-between bg-gray-900 px-6 py-4 text-white shadow">
	<h1 class="text-xl font-semibold">Chama Jenga</h1>

	<ul class="flex gap-6">
		{#each ['home', 'map', 'settings'] as tab, i (tab + i)}
			<button on:click={() => (active = tab)}>
				<li
					class="cursor-pointer capitalize transition hover:text-blue-400"
					class:selected={active === tab}
				>
					{tab}
				</li>
			</button>
		{/each}
	</ul>
</nav>

<style>
	.selected {
		color: #60a5fa;
	}
</style>
