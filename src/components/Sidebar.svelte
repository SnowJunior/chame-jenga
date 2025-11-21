<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store'; // 1. FIX: Destructure prop and avoid $derived() wrapper

	let { isOpen } = $props(); // Current route store

	const currentRoute = derived(page, ($page) => $page.url.pathname);

	const navItems = [
		{ name: 'Dashboard', path: '/', icon: '📊' },
		{ name: 'Projects', path: '/projects', icon: '📁' },
		{ name: 'Map View', path: '/map', icon: '🗺️' }
	]; // Auto-close drawer on mobile

	const handleNavClick = () => {
		if (window.innerWidth < 1024) {
			// 2. FIX: Mutate the prop variable directly (isOpen = false)
			isOpen = false;
		}
	};
</script>

<nav
	class="
fixed
top-0 left-0 z-30 h-screen w-60
-translate-x-60 transform bg-gray-900
p-6 text-white transition-transform
duration-300 lg:translate-x-0 {isOpen ? 'translate-x-0' : ''}
"
>
	<h1 class="mb-8 hidden text-2xl font-semibold lg:block">PublicGov</h1>
	<ul class="space-y-4">
		{#each navItems as item (item.name)}
			<li>
				<a
					href={item.path}
					onclick={handleNavClick}
					class="flex items-center space-x-3 rounded-lg px-3 py-2 transition duration-200 hover:bg-gray-700"
					class:bg-gray-700={$currentRoute === item.path}
				>
					<span>{item.icon}</span> <span>{item.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
