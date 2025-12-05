<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '../components/Sidebar.svelte';
	import ToastContainer from '../components/Toasts/GlobalToast.svelte';

	import { beforeNavigate } from '$app/navigation';
	import 'maplibre-gl/dist/maplibre-gl.css';

	let { children } = $props();

	let isOpen = $state(false);

	const toggleMenu = () => {
		isOpen = !isOpen;
	};

	const closeMenu = () => {
		isOpen = false;
	};

	// Close sidebar when navigating
	$effect(() => {
		return beforeNavigate(() => {
			isOpen = false;
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Mobile top bar -->
<div class="flex items-center bg-gray-900 p-4 text-white lg:hidden">
	<button onclick={toggleMenu} class="text-2xl">☰</button>
	<h1 class="ml-4 text-xl font-semibold">PublicGov</h1>
</div>

<div class="relative flex min-h-screen">
	<!-- Overlay when menu is open on mobile -->
	{#if isOpen}
		<div
			role="button"
			tabindex="0"
			class="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
			onclick={closeMenu}
			onkeydown={(e) => e.key === 'Enter' && closeMenu()}
		></div>
	{/if}

	<!-- Sidebar -->
	<Sidebar {isOpen} />

	<!-- Main content -->
	<main class="w-full bg-gray-100 p-4 transition-all duration-300 lg:ml-60">
		<ToastContainer />
		{@render children()}
	</main>
</div>
