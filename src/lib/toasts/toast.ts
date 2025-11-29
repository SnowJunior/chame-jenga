import { writable } from "svelte/store";

export type ToastType = "success" | "error" | "info";

export interface Toast {
	id: number;
	message: string;
	type: ToastType;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	function addToast(message: string, type: ToastType = "info", duration = 3000) {
		const id = Date.now();

		update((toasts) => [...toasts, { id, message, type }]);

		setTimeout(() => {
			update((toasts) => toasts.filter((t) => t.id !== id));
		}, duration);
	}

	return {
		subscribe,
		success: (msg: string) => addToast(msg, "success"),
		error: (msg: string) => addToast(msg, "error"),
		info: (msg: string) => addToast(msg, "info"),
	};
}

export const toasts = createToastStore();
