<script lang="ts">
	export let image: string;
	export let title: string;
	export let description: string;
	export let totalReceived: number = 0;
	export let progress: number = 0;
	export let onView: () => void;
</script>

<div class="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:shadow-lg">
	<img src={image} alt={title} class="h-48 w-full object-cover" />

	<div class="p-4">
		<h3 class="text-lg font-semibold text-gray-800">{title}</h3>
		<p class="mt-2 text-sm text-gray-600">{description}</p>
		<p class="mt-2 text-sm text-gray-600">Funded: <span>${totalReceived}</span></p>

		<div class="mt-4">
			<div class="mb-1 flex justify-between text-sm text-gray-500">
				<span>Progress</span>
				<span>{progress}%</span>
			</div>
			<div class="h-2 w-full rounded-full bg-gray-200">
				<div
					class="h-2 rounded-full bg-green-500 transition-all duration-500"
					style={`width: ${progress}%`}
				></div>
			</div>
		</div>

		<button
			class="mt-5 w-full rounded-xl bg-blue-600 py-2 font-medium text-white transition duration-300 hover:bg-blue-700"
			on:click={onView}
		>
			View
		</button>
	</div>
</div>
