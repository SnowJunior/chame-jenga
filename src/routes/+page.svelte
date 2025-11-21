<script lang="ts">
	import Card from '../components/Card.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const totalRevenue = 128000;
	const totalProjects = 24;

	const ongoing = [
		{
			id: '1',
			image: 'https://example.com/images/project1.jpg',
			title: 'Clean Water Initiative',
			description: 'Providing clean water to rural communities.',
			totalReceived: 5400,
			progress: 64
		},
		{
			id: '2',
			image: 'https://example.com/images/project1.jpg',
			title: 'School Renovation',
			description: 'Renovating classrooms and providing desks.',
			totalReceived: 3200,
			progress: 47
		},
		{
			id: '3',
			image: 'https://example.com/images/project1.jpg',
			title: 'Healthcare Access',
			description: 'Mobile clinics for remote villages.',
			totalReceived: 7700,
			progress: 82
		},
		{
			id: '4',
			image: 'https://example.com/images/project1.jpg',
			title: 'Tree Planting Campaign',
			description: 'Planting 200,000 trees by 2026.',
			totalReceived: 2100,
			progress: 29
		}
	];

	async function viewProject(id: string) {
		goto(`/projects/${id}`);
	}

	function navigateToProject() {
		goto(resolve(`/projects`));
	}
</script>

<div class="min-h-screen bg-[#f7f9fc] p-2 md:p-6">
	<!-- HEADER -->
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
			<p class="text-sm text-gray-500">Wednesday, January 5, 2026</p>
		</div>
	</div>

	<!-- TOP STATS -->
	<div class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">
		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow">
			<p class="text-sm text-gray-500">Total Revenue</p>
			<h2 class="mt-2 text-3xl font-bold">${totalRevenue}</h2>
			<p class="mt-1 text-xs text-green-600">▲ +7.15% vs last period</p>
		</div>

		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow">
			<p class="text-sm text-gray-500">Total Projects</p>
			<h2 class="mt-2 text-3xl font-bold">{totalProjects}</h2>
			<p class="mt-1 text-xs text-green-600">▲ +1.2% vs last period</p>
		</div>

		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow">
			<p class="text-sm text-gray-500">Ongoing</p>
			<h2 class="mt-2 text-3xl font-bold">{ongoing.length}</h2>
			<p class="mt-1 text-xs text-red-600">▼ -0.8% vs last period</p>
		</div>

		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow">
			<p class="text-sm text-gray-500">Completion Rate</p>
			<h2 class="mt-2 text-3xl font-bold">78.8%</h2>
			<p class="mt-1 text-xs text-green-600">▲ +3.2% vs last period</p>
		</div>
	</div>

	<!-- ONGOING PROJECTS -->
	<div class="rounded-2xl border border-gray-100 bg-white p-4 md:p-6 shadow">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-xl font-semibold text-gray-800">Ongoing Projects</h2>
			<button on:click={() => navigateToProject()} class="font-medium text-blue-600 cursor-pointer">View all</button>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each ongoing as project (project.id)}
				<Card
					image={project.image}
					title={project.title}
					description={project.description}
					totalReceived={project.totalReceived}
					progress={project.progress}
					onView={() => viewProject(project.id)}
				/>
			{/each}
		</div>
	</div>
</div>
