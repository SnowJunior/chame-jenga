<script lang="ts">
	import Map from "../../../components/Map.svelte";

	const project = {
		id: "p-001",
		title: "Community Water Pipeline Project",
		description:
			"Construction of a 12km clean water distribution pipeline connecting local villages to the main reservoir.",
		image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80",
		location: "Kajiado, Kenya",
		lat: -1.409,
		lng: 36.782,
		totalBudget: 2500000,
		totalReceived: 1624000,
		progress: 65
	};

	const contributions = [
		{ name: "Wendy", amount: 40, date: "2025-01-03" },
		{ name: "John", amount: 200, date: "2025-01-01" },
		{ name: "Grace", amount: 120, date: "2024-12-29" },
		{ name: "Michael", amount: 55, date: "2024-12-27" },
		{ name: "Derrick", amount: 300, date: "2024-12-20" },
		{ name: "Sandra", amount: 80, date: "2024-12-19" },
		{ name: "Moses", amount: 20, date: "2024-12-17" },
		{ name: "Brian", amount: 140, date: "2024-12-15" },
		{ name: "Charles", amount: 100, date: "2024-12-14" },
		{ name: "Elaine", amount: 75, date: "2024-12-12" }
	];

	function contribute() {
		alert("Contribution modal coming soon!");
	}
</script>

<div class="min-h-screen bg-[#f7f9fc] pb-20">

	<!-- HERO -->
	<div class="relative h-72 w-full rounded-b-3xl overflow-hidden shadow-md">
		<img
			src={project.image}
			alt={project.title}
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-black/40"></div>

		<h1 class="absolute bottom-6 left-6 text-3xl font-bold text-white">
			{project.title}
		</h1>
	</div>

	<div class="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-8">

		<div class="md:col-span-2 space-y-8">
			<div class="bg-white p-6 rounded-2xl shadow border border-gray-100">
				<h2 class="text-xl font-semibold text-gray-800 mb-3">Project Overview</h2>
				<p class="text-gray-600 leading-relaxed">{project.description}</p>

				<div class="mt-6 grid grid-cols-2 gap-4">

					<div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
						<p class="text-gray-500 text-sm">Location</p>
						<p class="font-semibold text-gray-800">{project.location}</p>
					</div>

					<div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
						<p class="text-gray-500 text-sm">Total Budget</p>
						<p class="font-semibold text-gray-800">KSh {project.totalBudget.toLocaleString()}</p>
					</div>

					<div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
						<p class="text-gray-500 text-sm">Received</p>
						<p class="font-semibold text-green-700">KSh {project.totalReceived.toLocaleString()}</p>
					</div>

					<div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
						<p class="text-gray-500 text-sm">Completion</p>
						<p class="font-semibold text-blue-700">{project.progress}%</p>
					</div>
				</div>

				<div class="mt-6">
					<div class="flex justify-between text-sm text-gray-500 mb-1">
						<span>Progress</span>
						<span>{project.progress}%</span>
					</div>
					<div class="h-2 w-full bg-gray-200 rounded-full">
						<div
							class="h-2 bg-green-500 rounded-full transition-all"
							style={`width: ${project.progress}%`}
						></div>
					</div>
				</div>
			</div>

			<div class="bg-white p-6 rounded-2xl shadow border border-gray-100">
				<h2 class="text-xl font-semibold text-gray-800 mb-3">Project Location</h2>
				<Map />
			</div>
		</div>

		<div class="space-y-8">

			<div class="bg-white p-6 rounded-2xl shadow border border-gray-100">
				<h3 class="text-lg font-semibold text-gray-800 mb-4">Support This Project</h3>
				<p class="text-gray-600 text-sm mb-4">
					Your contribution helps accelerate project completion.
				</p>

				<button
					class="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
					on:click={contribute}
				>
					Contribute
				</button>
			</div>

			<div class="bg-white p-6 rounded-2xl shadow border border-gray-100">
				<h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Contributions</h3>

				<table class="w-full text-sm">
					<thead>
						<tr class="text-gray-500 text-left border-b">
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
