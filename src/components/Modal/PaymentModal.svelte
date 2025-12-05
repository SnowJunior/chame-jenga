<script lang="ts">
	let { isOpen = false, onClose, projectName }: {
		isOpen?: boolean;
		onClose: () => void;
		projectName: string;
	} = $props();

	import { state, startProcessing, goBack } from '../../lib/payment/state';
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

	// Prevent body scroll when modal is open
	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40 md:items-center md:px-4"
		on:click={closeModal}
		role="button"
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		}}
		aria-label="Close modal backdrop"
	>
		<div
			class="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl md:h-auto md:max-h-[90vh] md:grid md:grid-cols-2 md:rounded-2xl"
			on:click|stopPropagation
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			on:keydown|stopPropagation
		>
			<!-- CLOSE BUTTON -->
			<button
				type="button"
				class="absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow hover:bg-gray-100 transition-colors"
				on:click={onClose}
				aria-label="Close modal"
			>
				✕
			</button>

			<!-- LEFT SIDE - Desktop only -->
			<div class="hidden flex-col border-r border-gray-200 bg-gray-50 p-6 md:flex md:overflow-y-auto">
				<h2 class="mb-4 text-lg font-semibold">Choose Payment Method</h2>
				<SelectMethodList />

				<div class="mt-auto rounded-xl border bg-white p-4 shadow-sm">
					<h3 class="font-semibold text-gray-700">You're contributing</h3>

					<p class="mt-1 text-2xl font-bold text-blue-600">USD 500</p>

					<p class="mt-2 text-sm text-gray-500">
						{projectName}
					</p>
				</div>
			</div>

			<!-- RIGHT SIDE / MOBILE CONTENT -->
			<div class="flex flex-col overflow-y-auto p-4 md:p-6">
				<!-- Mobile: Back Button (only shown when in enter_details step) -->
				{#if $state.step === 'enter_details'}
					<button
						type="button"
						on:click={goBack}
						class="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 md:hidden"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							></path>
						</svg>
						Back to payment methods
					</button>
				{/if}

				<!-- Mobile: Contribution Summary at top -->
				{#if $state.step === 'choose_method' || $state.step === 'enter_details'}
					<div class="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4 md:hidden">
						<h3 class="text-sm font-semibold text-gray-700">You're contributing</h3>
						<p class="mt-1 text-xl font-bold text-blue-600">USD 500</p>
						<p class="mt-1 text-xs text-gray-500">{projectName}</p>
					</div>
				{/if}

				<!-- Mobile: Payment Method Selection -->
				{#if $state.step === 'choose_method'}
					<div class="mb-6 md:hidden">
						<h2 class="mb-4 text-lg font-semibold text-gray-800">Choose Payment Method</h2>
						<SelectMethodList />
					</div>
				{/if}

				<!-- Desktop: Payment Method Selection (only when choosing) -->
				{#if $state.step === 'choose_method'}
					<div class="hidden md:block">
						<h2 class="mb-4 text-lg font-semibold text-gray-800">Choose Payment Method</h2>
						<p class="mb-4 text-sm text-gray-600">Select your preferred payment method to continue</p>
					</div>
				{/if}

				<!-- Payment Forms and Status Screens -->
				<div class="flex-1">
					{#if $state.step === 'choose_method'}
						<!-- Desktop shows method list in left sidebar, mobile shows it above -->
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
		</div>
	</div>
{/if}
