import { writable } from "svelte/store";

export type PaymentMethod = "mobile_money" | "card" | "bank";

export type PaymentStep =
	| "choose_method"
	| "enter_details"
	| "processing"
	| "external_redirect"
	| "success"
	| "failure";

interface PaymentState {
	step: PaymentStep;
	method?: PaymentMethod;
	url?: string;
	reference?: string;
	reason?: string;
}

export const state = writable<PaymentState>({
	step: "choose_method"
});

export function selectMethod(method: PaymentMethod) {
	state.set({ step: "enter_details", method });
}

export function startProcessing(method: PaymentMethod) {
	state.set({ step: "processing", method });

	// Dummy delay → simulate payment
	setTimeout(() => {
		// Example: redirect to 2FA provider
		state.set({
			step: "external_redirect",
			url: "https://example.com/2fa"
		});
	}, 1000);
}

export function complete2FA(success: boolean) {
	if (success) {
		state.set({
			step: "success",
			reference: "REF-" + Math.floor(Math.random() * 999999)
		});
	} else {
		state.set({
			step: "failure",
			reason: "2FA authentication failed"
		});
	}
}

export function goBack() {
	state.update((s) => {
		if (s.step === "enter_details") {
			return { step: "choose_method", method: undefined };
		}
		return s;
	});
}

export function onClose() {
	state.set({ step: "choose_method" });
}
