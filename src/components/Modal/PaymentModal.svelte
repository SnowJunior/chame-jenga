<script lang="ts">
	export let isOpen = false;
	export let onClose: () => void;
	export let projectName: string;

	import { state, startProcessing } from '../../lib/payment/state';
	import { onMount } from 'svelte';

	import SelectMethodList from '../Payment/SelectPaymentMethod.svelte';
	import MobileMoneyForm from '../Payment/MobileMoneyForm.svelte';
	import CardForm from '../Payment/CardForm.svelte';
	import BankDetails from '../Payment/BankDetails.svelte';
	import Processing from '../Status/ProcessingScreen.svelte';
	import ExternalRedirect from '../Payment/ExternalScreen.svelte';
	import Success from '../Status/SuccessScreen.svelte';
	import Failure from '../Status/FailureScreen.svelte';

	function closeModal(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	onMount(() => {
		if (isOpen) {
			state.update((s) => ({
				...s,
				step: 'choose_method',
				method: 'mobile_money' // default selection
			}));
		}
	});
</script>

{#if isOpen}
	<button
		type="button"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 focus:outline-none"
		on:click={closeModal}
	>
		<div
			class="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2"
			on:click|stopPropagation
		>
			<!-- CLOSE BUTTON -->
			<div
				class="absolute top-3 right-3 rounded-full bg-white p-2 shadow hover:bg-gray-100"
				on:click={onClose}
			>
				✕
			</div>

			<!-- LEFT SIDE -->
			<div class="hidden flex-col border-r border-gray-200 bg-gray-50 p-6 md:flex">
				<h2 class="mb-4 text-lg font-semibold">Choose Payment Method</h2>
				<SelectMethodList />

				<div class="mt-3 rounded-xl border bg-white p-4 shadow-sm">
					<h3 class="font-semibold text-gray-700">You're contributing</h3>

					<p class="mt-1 text-2xl font-bold text-blue-600">USD 500</p>

					<p class="mt-2 text-sm text-gray-500">
						{projectName}
					</p>
				</div>
			</div>

			<!-- RIGHT SIDE -->
			<div class="p-6">
				{#if $state.step === 'choose_method'}
					<div class="mb-4 md:hidden">
						<SelectMethodList />
					</div>
				{:else if $state.step === 'enter_details' && $state.method === 'mobile_money'}
					<MobileMoneyForm on:submit={() => startProcessing('mobile_money')} />
				{:else if $state.step === 'enter_details' && $state.method === 'card'}
					<CardForm on:submit={() => startProcessing('card')} />
				{:else if $state.step === 'enter_details' && $state.method === 'bank'}
					<BankDetails />
				{:else if $state.step === 'processing'}
					<Processing method={$state.method as string} />
				{:else if $state.step === 'external_redirect'}
					<ExternalRedirect url={$state.url as string} />
				{:else if $state.step === 'success'}
					<Success reference={$state.reference as string} on:close={onClose} />
				{:else if $state.step === 'failure'}
					<Failure reason={$state.reason as string} on:close={onClose} />
				{/if}
			</div>
		</div>
	</button>
{/if}
Ï
