<script lang="ts">
	import { toasts } from '$lib/toasts/toast';
	function copy(value: string) {
		toasts.success('Copied to clipboard');
		navigator.clipboard.writeText(value);
	}
</script>

<h2 class="mb-4 text-xl font-semibold text-gray-800">Bank Transfer</h2>

<p class="mb-4 text-sm text-gray-600">Send money to the following bank account:</p>

<div class="space-y-4">
	<!-- Bank -->
	<div
		class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm"
	>
		<div>
			<p class="text-xs text-gray-500">Bank</p>
			<p class="font-medium text-gray-800">Equity Bank</p>
		</div>
		<button class="cursor-pointer text-sm text-black" on:click={() => copy('Equity Bank')}>
			Copy
		</button>
	</div>

	<!-- Account Name -->
	<div
		class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm"
	>
		<div>
			<p class="text-xs text-gray-500">Account Name</p>
			<p class="font-medium text-gray-800">Water Project</p>
		</div>
		<button class="cursor-pointer text-sm text-black" on:click={() => copy('Water Project')}>
			Copy
		</button>
	</div>

	<!-- Account Number -->
	<div
		class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm"
	>
		<div>
			<p class="text-xs text-gray-500">Account Number</p>
			<p class="font-medium text-gray-800">123 456 789</p>
		</div>
		<button class="cursor-pointer text-sm text-black" on:click={() => copy('123 456 789')}>
			Copy
		</button>
	</div>

	<!-- Branch -->
	<div
		class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm"
	>
		<div>
			<p class="text-xs text-gray-500">Branch</p>
			<p class="font-medium text-gray-800">Nairobi</p>
		</div>
		<button class="cursor-pointer text-sm text-black" on:click={() => copy('Nairobi')}>
			Copy
		</button>
	</div>
</div>
