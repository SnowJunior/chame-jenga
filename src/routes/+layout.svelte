<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '../components/Sidebar.svelte';
	import ToastContainer from '../components/Toasts/GlobalToast.svelte';
	import LocaleSelector from '../components/LocaleSelector.svelte';
	import { locale } from '$lib/stores/locale';
	import { beforeNavigate } from '$app/navigation';
	import 'maplibre-gl/dist/maplibre-gl.css';

	let { children, data }: {
		children: any;
		data?: { locale?: string };
	} = $props();

	let isOpen = $state(false);

	// Initialize locale from server data on first load only
	// Use a flag to ensure we only initialize once
	let localeInitialized = $state(false);
	
	$effect(() => {
		if (data?.locale && !localeInitialized) {
			// Only initialize once on first load
			locale.set(data.locale as 'es' | 'fr');
			localeInitialized = true;
		}
	});

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
<div class="flex items-center justify-between bg-gray-900 p-4 text-white lg:hidden">
	<div class="flex items-center">
		<button onclick={toggleMenu} class="text-2xl">☰</button>
		<h1 class="ml-4 text-xl font-semibold">PublicGov</h1>
	</div>
	<div class="lg:hidden">
		<LocaleSelector />
	</div>
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
