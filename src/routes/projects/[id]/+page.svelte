<script lang="ts">
	import PaymentModal from '../../../components/Modal/PaymentModal.svelte';
	import Map from '../../../components/Map.svelte';

	const project = {
		id: 'p-001',
		title: 'Community Water Pipeline Project',
		description:
			'Construction of a 12km clean water distribution pipeline connecting local villages to the main reservoir.',
		image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80',
		location: 'Kajiado, Kenya',
		lat: -1.409,
		lng: 36.782,
		totalBudget: 2500000,
		totalReceived: 1624000,
		progress: 65
	};

	const contributions = [
		{ name: 'Wendy', amount: 40, date: '2025-01-03' },
		{ name: 'John', amount: 200, date: '2025-01-01' },
		{ name: 'Grace', amount: 120, date: '2024-12-29' },
		{ name: 'Michael', amount: 55, date: '2024-12-27' },
		{ name: 'Derrick', amount: 300, date: '2024-12-20' },
		{ name: 'Sandra', amount: 80, date: '2024-12-19' },
		{ name: 'Moses', amount: 20, date: '2024-12-17' },
		{ name: 'Brian', amount: 140, date: '2024-12-15' },
		{ name: 'Charles', amount: 100, date: '2024-12-14' },
		{ name: 'Elaine', amount: 75, date: '2024-12-12' }
	];

	let modalOpen = false;

	function contribute() {
		modalOpen = true;
	}
</script>

<div class="min-h-screen bg-[#f7f9fc] pb-20">
	<!-- HERO -->
	<div class="relative h-72 w-full overflow-hidden rounded-b-3xl shadow-md">
		<img src={project.image} alt={project.title} class="h-full w-full object-cover" />
		<div class="absolute inset-0 bg-black/40"></div>

		<h1 class="absolute bottom-6 left-6 text-3xl font-bold text-white">
			{project.title}
		</h1>
	</div>

	<div class="mx-auto mt-10 grid max-w-6xl gap-8 px-6 md:grid-cols-3">
		<div class="space-y-8 md:col-span-2">
			<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow">
				<h2 class="mb-3 text-xl font-semibold text-gray-800">Project Overview</h2>
				<p class="leading-relaxed text-gray-600">{project.description}</p>

				<div class="mt-6 grid grid-cols-2 gap-4">
					<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
						<p class="text-sm text-gray-500">Location</p>
						<p class="font-semibold text-gray-800">{project.location}</p>
					</div>

					<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
						<p class="text-sm text-gray-500">Total Budget</p>
						<p class="font-semibold text-gray-800">KSh {project.totalBudget.toLocaleString()}</p>
					</div>

					<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
						<p class="text-sm text-gray-500">Received</p>
						<p class="font-semibold text-green-700">KSh {project.totalReceived.toLocaleString()}</p>
					</div>

					<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
						<p class="text-sm text-gray-500">Completion</p>
						<p class="font-semibold text-blue-700">{project.progress}%</p>
					</div>
				</div>

				<div class="mt-6">
					<div class="mb-1 flex justify-between text-sm text-gray-500">
						<span>Progress</span>
						<span>{project.progress}%</span>
					</div>
					<div class="h-2 w-full rounded-full bg-gray-200">
						<div
							class="h-2 rounded-full bg-green-500 transition-all"
							style={`width: ${project.progress}%`}
						></div>
					</div>
				</div>
			</div>

			<div class="flex flex-col h-[500px] rounded-2xl border border-gray-100 bg-white p-6 shadow">
				<h2 class="mb-3 text-xl font-semibold text-gray-800">Project Location</h2>
				<div class="flex-1 rounded-xl overflow-hidden">
					<Map lat={project.lat} lng={project.lng} zoom={12} markers={[]} />
				</div>
			</div>
		</div>

		<div class="space-y-8">
			<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow">
				<h3 class="mb-4 text-lg font-semibold text-gray-800">Support This Project</h3>
				<p class="mb-4 text-sm text-gray-600">
					Your contribution helps accelerate project completion.
				</p>

				<button
					class="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 cursor-pointer"
					on:click={contribute}
				>
					Contribute
				</button>
			</div>

			<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow">
				<h3 class="mb-4 text-lg font-semibold text-gray-800">Recent Contributions</h3>

				<table class="w-full text-sm">
					<thead>
						<tr class="border-b text-left text-gray-500">
							<th class="py-2">Name</th>
							<th class="py-2">Amount</th>
							<th class="py-2">Date</th>
						</tr>
					</thead>
					<tbody>
						{#each contributions as c (c.name)}
							<tr class="border-b last:border-0">
								<td class="py-2">{c.name}</td>
								<td class="py-2 font-medium text-green-700">KSh {c.amount}</td>
								<td class="py-2">{c.date}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<PaymentModal isOpen={modalOpen} onClose={() => (modalOpen = false)} projectName={project.title} />
