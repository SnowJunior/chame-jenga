<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '../components/Sidebar.svelte'; // Import the SvelteKit hook, but NOT the Svelte runes ($effect, $state, etc.)
	import { beforeNavigate } from '$app/navigation'; // $props() is used directly and exposes 'children'
	let { children } = $props(); // $state() is used directly to create reactive state

	let isOpen = $state(false);

	const toggleMenu = () => (isOpen = !isOpen);
	const closeMenu = () => (isOpen = false); // $effect() is used directly to run side effects

	$effect(() => {
		beforeNavigate(() => {
			if (isOpen) {
				isOpen = false;
			}
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex items-center bg-gray-900 p-4 text-white lg:hidden">
	<button onclick={toggleMenu} class="text-2xl">☰</button>
	<h1 class="ml-4 text-xl font-semibold">PublicGov</h1>
</div>

<div class="relative flex min-h-screen">
	{#if isOpen}
		<div
			role="button"
			tabindex="0"
			onclick={closeMenu}
			onkeydown={(e) => e.key === 'Enter' && closeMenu()}
			class="fixed inset-0 z-20 bg-white/10 backdrop-blur-sm lg:hidden"
		></div>
	{/if}

	<Sidebar {isOpen} />
	<main class="w-full bg-gray-100 p-4 transition-all duration-300 lg:ml-60">
		{@render children()}
	</main>
</div>
