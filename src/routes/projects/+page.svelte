<script lang="ts">
	import Card from '../../components/Card.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let projects = [
		{
			id: 'p-001',
			title: 'Community Water Pipeline',
			description: '12km water pipeline for local villages.',
			image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80',
			totalReceived: 1624000,
			progress: 65,
			category: 'Infrastructure',
			village: 'Kisumu West'
		},
		{
			id: 'p-002',
			title: 'School Renovation',
			description: 'Renovation of 8 classrooms and sanitation units.',
			image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80',
			totalReceived: 760000,
			progress: 40,
			category: 'Education',
			village: 'Ngong'
		},
		{
			id: 'p-003',
			title: 'Rural Solar Grid',
			description: 'Solar electrification for 200 households.',
			image: 'https://images.unsplash.com/photo-1584270354949-1a21962a92f0?q=80',
			totalReceived: 1800000,
			progress: 85,
			category: 'Energy',
			village: 'Bondo'
		},
		{
			id: 'p-004',
			title: 'Health Center Expansion',
			description: 'New maternity wing and equipment upgrades.',
			image: 'https://images.unsplash.com/photo-1580281657527-47c521c3a0b9?q=80',
			totalReceived: 980000,
			progress: 55,
			category: 'Health',
			village: 'Eldoret'
		}
	];
	
	let loading = true;

	let searchQuery = '';
	let activeCategory = 'All';
	let activeVillage = 'All';
	let sortType = 'default';

	let categories = ['All', 'Infrastructure', 'Education', 'Energy', 'Health'];
	let villages = ['All', 'Kisumu West', 'Ngong', 'Bondo', 'Eldoret'];

	let page = 1;
	let pageSize = 4;

	onMount(() => {
		setTimeout(() => (loading = false), 1000);
	});

	function processedProjects() {
		let result = [...projects];

		// Search
		result = result.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

		// Category filter
		if (activeCategory !== 'All') {
			result = result.filter((p) => p.category === activeCategory);
		}

		// Village filter
		if (activeVillage !== 'All') {
			result = result.filter((p) => p.village === activeVillage);
		}

		// Sorting
		if (sortType === 'progress-high') {
			result.sort((a, b) => b.progress - a.progress);
		}
		if (sortType === 'progress-low') {
			result.sort((a, b) => a.progress - b.progress);
		}
		if (sortType === 'funding-high') {
			result.sort((a, b) => b.totalReceived - a.totalReceived);
		}
		if (sortType === 'funding-low') {
			result.sort((a, b) => a.totalReceived - b.totalReceived);
		}

		return result;
	}

	function paginated() {
		const start = (page - 1) * pageSize;
		return processedProjects().slice(start, start + pageSize);
	}

	let totalPages = () => Math.ceil(processedProjects().length / pageSize);

	function openProject(id: string) {
		goto(`/projects/${id}`);
	}
</script>

<main class="min-h-screen bg-[#f7f9fc] p-2 md:p-6">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-gray-800">All Projects</h1>
		<p class="text-sm text-gray-500">Browse all public development projects</p>
	</div>

	<div class="mb-8 space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow">
		<input
			type="text"
			placeholder="Search projects..."
			bind:value={searchQuery}
			class="w-full rounded-xl border border-gray-200 p-3 focus:ring focus:ring-blue-200 focus:outline-none"
		/>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div>
				<label class="text-sm text-gray-600">Category</label>
				<select
					bind:value={activeCategory}
					class="mt-1 w-full rounded-xl border border-gray-200 p-3"
				>
					{#each categories as cat}
						<option value={cat}>{cat}</option>
					{/each}
				</select>
			</div>

			<div>
				<label class="text-sm text-gray-600">Village</label>
				<select
					bind:value={activeVillage}
					class="mt-1 w-full rounded-xl border border-gray-200 p-3"
				>
					{#each villages as v}
						<option value={v}>{v}</option>
					{/each}
				</select>
			</div>

			<div>
				<label class="text-sm text-gray-600">Sort By</label>
				<select bind:value={sortType} class="mt-1 w-full rounded-xl border border-gray-200 p-3">
					<option value="default">Default</option>
					<option value="progress-high">Progress (High → Low)</option>
					<option value="progress-low">Progress (Low → High)</option>
					<option value="funding-high">Funding (High → Low)</option>
					<option value="funding-low">Funding (Low → High)</option>
				</select>
			</div>
		</div>
	</div>

	{#if loading}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each Array(4) as _}
				<div class="h-72 animate-pulse rounded-2xl bg-white p-4 shadow">
					<div class="h-40 w-full rounded-xl bg-gray-300"></div>
					<div class="mt-4 h-4 w-3/4 rounded bg-gray-300"></div>
					<div class="mt-2 h-3 w-1/2 rounded bg-gray-300"></div>
					<div class="mt-4 h-2 w-full rounded bg-gray-300"></div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each paginated() as project (project.id)}
				<Card
					image={project.image}
					title={project.title}
					description={project.description}
					totalReceived={project.totalReceived}
					progress={project.progress}
					onView={() => openProject(project.id)}
				/>
			{/each}
		</div>

		{#if paginated().length === 0}
			<p class="mt-10 text-center text-gray-500">No projects found.</p>
		{/if}

		{#if totalPages() > 1}
			<div class="mt-10 flex justify-center gap-2">
				<button
					class="rounded-xl bg-gray-200 px-4 py-2 disabled:opacity-50"
					on:click={() => (page = Math.max(1, page - 1))}
					disabled={page === 1}>Prev</button
				>

				<span class="px-4 py-2">{page} / {totalPages()}</span>

				<button
					class="rounded-xl bg-gray-200 px-4 py-2 disabled:opacity-50"
					on:click={() => (page = Math.min(totalPages(), page + 1))}
					disabled={page === totalPages()}>Next</button
				>
			</div>
		{/if}
	{/if}
</main>
