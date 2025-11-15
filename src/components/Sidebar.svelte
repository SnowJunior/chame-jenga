<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	// Automatically get the current route
	const currentRoute = derived(page, ($page) => $page.url.pathname);

	const navItems = [
		{ name: 'Dashboard', path: '/', icon: '📊' },
		{ name: 'Projects', path: '/projects', icon: '📁' },
		{ name: 'Map View', path: '/map', icon: '🗺️' }
	];
</script>

<nav class="fixed h-screen w-60 bg-gray-900 p-6 text-white">
	<h1 class="mb-8 text-2xl font-semibold">PublicGov</h1>

	<ul class="space-y-4">
		{#each navItems as item (item.name)}
			<li>
				<a
					href={item.path}
					class="flex items-center space-x-3 rounded-lg px-3 py-2 transition duration-200 hover:bg-gray-700"
					class:bg-gray-700={$currentRoute === item.path}
				>
					<span>{item.icon}</span>
					<span>{item.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
